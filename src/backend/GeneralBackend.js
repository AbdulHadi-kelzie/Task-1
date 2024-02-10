import { SAVE_SUCCESS, SAVE_FAIL, UPDATE_SUCCESS, UPDATE_FAIL, DELETE_SUCCESS, DELETE_FAIL, RESET_PWD_SUCCESS, RESET_PWD_FAIL, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGOUT_USER, LOAD_PROFILE } from '../mutations';
import { JWT_TOKEN, API_DOMAIN, PAGE_SIZE, LOGIN_ROUTE } from '../utils/Constants';
import * as Storage from '../utils/Storage';
import router from '../router/index';
import I18n from '../config/i18n/index';

export const resetPwd = (commit, userId, password) => {
    fetch(API_DOMAIN(`users/reset/${userId}`), {
        method: 'POST',
        headers: getTokenHeader(),
        body: password
    })
        .then((response) => {
            if (response.status === 200) {
                commit(RESET_PWD_SUCCESS);
                commit('sendSuccessMessage', 'Password reset success', { root: true });
            } else {
                response.json().then((data) => {
                    commit(RESET_PWD_FAIL);
                    commit('sendErrorMessage', 'Password reset fail: ' + data, { root: true });
                });
            }
        })
        .catch((error) => {
            console.log('error', error);
            commit(RESET_PWD_FAIL, { message: 'Connection error..' });
            commit('sendErrorMessage', 'Connection error...', { root: true });
        });
};

export const login = (commit, email, password, endpoint) => {
    Storage.saveEntry(JWT_TOKEN, '');
    fetch(API_DOMAIN(endpoint), {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ email: email, password: password })
    })
        .then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    Storage.saveEntry(JWT_TOKEN, data.token);
                    //commit(LOGIN_USER_SUCCESS);
                    //router.push({ path: '/' });
                    loadProfile(commit);
                });
            } else {
                commit(LOGIN_USER_FAIL, { message: 'Incorrect credentials!' });
                commit('sendErrorMessage', 'Incorrect credentials!', { root: true });
            }
        })
        .catch((error) => {
            console.log('error', error);
            commit(LOGIN_USER_FAIL, { message: 'Connection error..' });
            commit('sendErrorMessage', 'Connection error...', { root: true });
        });
};

export const loadProfile = (commit) => {
    if (!Storage.getEntry(JWT_TOKEN) || Storage.getEntry(JWT_TOKEN) === null) {
        unauthorizedError(commit);
    } else {
        fetch(API_DOMAIN('users/profile'), {
            method: 'GET',
            headers: getTokenHeader()
        })
            .then((response) => {
                if (response.status === 200) {
                    response.json().then((data) => {
                        console.log('user local: ', data.language);
                        Storage.setLocale(data.language);
                        I18n.global.locale.value = data.language;
                        commit(LOAD_PROFILE, {
                            fullName: data.fullName,
                            email: data.email,
                            language: data.language,
                            userRole: data.userRole,
                            userName: data.userName
                        });
                        commit(LOGIN_USER_SUCCESS);
                        router.push({ path: '/' });
                    });
                } else if (response.status === 401 || response.status === 404) {
                    commit(LOGIN_USER_FAIL, { message: 'Incorrect credentials!' });
                    commit('sendErrorMessage', 'Incorrect credentials!', { root: true });
                }
            })
            .catch((error) => {
                console.log('error', error);
                commit(LOGIN_USER_FAIL, { message: 'Connection error..' });
                commit('sendErrorMessage', 'Connection error...', { root: true });
            });
    }
};

//Find one for EDIT/NEW
export const findOne = (commit, endpoint, viewState) => {
    fetch(API_DOMAIN(`${endpoint}`), {
        method: 'GET',
        headers: getTokenHeader()
    })
        .then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    //console.log("findONE: ", data)
                    commit(viewState, data);
                });
            } else if (response.status === 401 || response.status === 403) {
                unauthorizedError(commit);
            } else {
                commit('new');
            }
        })
        .catch((error) => {
            console.log('error' + error);
            commit('new');
        });
};

export const find = (commit, { endpoint, page, pageSize, sortText, searchText, params }) => {
    fetch(API_DOMAIN(`${endpoint}?${searchText ? `searchText=${searchText}&` : ''}${sortText ? `sort=${sortText}&` : 'sort=id,DESC&'}${page ? `page=${page}&` : ''}${pageSize ? `size=${pageSize}` : ''}${params ? `&${params}` : ''}`), {
        method: 'GET',
        headers: getTokenHeader()
    })
        .then((response) => {
            if (response.status === 200) {
                response.json().then((data) => {
                    commit(UPDATE_SUCCESS, data);
                });
            } else if (response.status === 401 || response.status === 403) {
                console.log('', response);
                unauthorizedError(commit);
            } else {
                response.json().then((data) => {
                    commit(UPDATE_FAIL, data);
                    commit('sendErrorMessage', 'Find items fail!', { root: true });
                });
            }
        })
        .catch((error) => {
            console.log('error', error);
            commit(UPDATE_FAIL);
            commit('sendErrorMessage', 'Connection error...', { root: true });
        });
};

export const del = (commit, dispatch, endpoint) => {
    fetch(API_DOMAIN(`${endpoint}`), {
        method: 'DELETE',
        headers: getTokenHeader()
    })
        .then((response) => {
            if (response.status === 200) {
                commit(DELETE_SUCCESS);
                dispatch('findItems', { page: 0, pageSize: PAGE_SIZE });
                commit('sendSuccessMessage', 'Delete item success', { root: true });
            } else if (response.status === 401 || response.status === 403) {
                unauthorizedError(commit);
            } else {
                response.json().then((data) => {
                    commit(DELETE_FAIL);
                    commit('sendErrorMessage', 'Delete item fail: ' + data.message, { root: true });
                });
            }
        })
        .catch((error) => {
            console.log('errorDel', error);
            commit(DELETE_FAIL);
            commit('sendErrorMessage', 'Connection error...', { root: true });
        });
};

export const save = (commit, dispatch, endpoint, pageName, item) => {
    fetch(API_DOMAIN(`${endpoint}`), {
        method: 'POST',
        headers: getTokenHeader(),
        body: JSON.stringify(item)
    })
        .then((response) => {
            if (response.status === 200 || response.status === 201) {
                // 201 CREATED
                commit(SAVE_SUCCESS);
                dispatch('findItems', { page: 0, pageSize: PAGE_SIZE });
                commit('sendSuccessMessage', 'Create item success', { root: true });
                if (pageName !== undefined) {
                    router.push({ path: pageName });
                }
            } else if (response.status === 401 || response.status === 403) {
                unauthorizedError(commit);
            } else {
                response.json().then((data) => {
                    console.log('error: ', JSON.parse(JSON.stringify(data)));
                    commit(SAVE_FAIL);
                    commit('sendErrorMessage', 'Create item fail: ' + data.errors, { root: true });
                });
            }
        })
        .catch((error) => {
            console.log('error', error);
            commit(SAVE_FAIL, { message: 'Connection error..' });
            commit('sendErrorMessage', 'Connection error...', { root: true });
        });
};

export const update = (commit, dispatch, endpoint, pageName, item) => {
    fetch(API_DOMAIN(endpoint), {
        method: 'PUT',
        headers: getTokenHeader(),
        body: JSON.stringify(item)
    })
        .then((response) => {
            if (response.status === 200 || response.status === 201) {
                commit(SAVE_SUCCESS);
                dispatch('findItems', { page: 0, pageSize: PAGE_SIZE });
                commit('sendSuccessMessage', 'Update item success', { root: true });
                if (pageName !== undefined) {
                    router.push({ path: pageName });
                }
            } else if (response.status === 401 || response.status === 403) {
                unauthorizedError(commit);
            } else {
                response.json().then((data) => {
                    commit(SAVE_FAIL);
                    commit('sendErrorMessage', 'Update item fail: ' + data.message, { root: true });
                });
            }
        })
        .catch((error) => {
            console.log('error::', error);
            commit(SAVE_FAIL);
            commit('sendErrorMessage', 'Connection error...', { root: true });
        });
};

export const saveMultipart = (commit, dispatch, endpoint, pageName, item, assets) => {
    let data = new FormData();
    if (assets && assets !== null) {
        for (let i = 0; i < assets.length; i++) {
            data.append('assets', assets[i]);
        }
    }

    Object.keys(item).forEach((key) => {
        data.append(key, item[key]);
    });

    fetch(API_DOMAIN(`${endpoint}`), {
        method: 'POST',
        headers: getMultipartTokenHeader(),
        body: data
    })
        .then((response) => {
            if (response.status === 200 || response.status === 201) {
                commit(SAVE_SUCCESS);
                dispatch('findItems', { page: 0, pageSize: PAGE_SIZE });
                commit('sendSuccessMessage', 'Create item success', { root: true });
                router.push({ path: pageName });
            } else if (response.status === 401 || response.status === 403) {
                unauthorizedError(commit);
            } else {
                response.json().then((data) => {
                    console.log('error: ', JSON.parse(JSON.stringify(data)));
                    commit(SAVE_FAIL);
                    commit('sendErrorMessage', 'Create item fail!: ' + data, { root: true });
                });
            }
        })
        .catch((error) => {
            console.log('error', error);
            commit(SAVE_FAIL);
            commit('sendErrorMessage', 'Connection error...', { root: true });
        });
};

export const updateMultipart = (commit, dispatch, endpoint, pageName, item, assets) => {
    let data = new FormData();
    console.log('assets: ', assets);
    if (assets && assets !== null) {
        for (let i = 0; i < assets.length; i++) {
            data.append('assets', assets[i]);
        }
    }

    Object.keys(item).forEach((key) => {
        console.log(key);
        data.append(key, item[key]);
    });

    fetch(API_DOMAIN(endpoint), {
        method: 'PUT',
        headers: getMultipartTokenHeader(),
        body: data
    })
        .then((response) => {
            if (response.status === 200) {
                commit(SAVE_SUCCESS);
                dispatch('findItems', { page: 0, pageSize: PAGE_SIZE });
                commit('sendSuccessMessage', 'Update item success', { root: true });
                if (pageName !== undefined) {
                    router.push({ path: pageName });
                }
            } else if (response.status === 401 || response.status === 403) {
                unauthorizedError(commit);
            } else {
                response.json().then((data) => {
                    console.log('error: ', JSON.parse(JSON.stringify(data)));
                    commit(SAVE_FAIL);
                    commit('sendErrorMessage', 'Update item fail: ' + data.message, { root: true });
                });
            }
        })
        .catch((error) => {
            console.log('error', error);
            commit(SAVE_FAIL, { message: 'Connection error..' });
            commit('sendErrorMessage', 'Connection error...', { root: true });
        });
};

/*export const downloadFile = (commit, dispatch, endpoint, fileName) => {
  
    fetch(API_CLIENT_DOMAIN(`${endpoint}`), {
      method: 'GET',
      headers: getGuestHeader(),
    }).then((response) => {
      if (response.status === 200) {
        response
          .blob()
          .then((data) => {
            FileSaver.saveAs(data, fileName);
          })
      } else if (response.status === 401 || response.status === 403) {
        unauthorizedError(commit);
      } else {
        response
          .json()
          .then((data) => {
            sendErrorMessage(data.message);
          })
      }
    }).catch((error) => {
      console.log('error', error);
      sendErrorMessage('No Connection..');
    });
  };*/

const getTokenHeader = () => {
    var token = Storage.getEntry(JWT_TOKEN);
    if (token) {
        return {
            Authorization: 'Bearer ' + token, //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJqdGkiOiI1ZTM5NTQwMy05MTZkLTRlY2MtYWFiMC01NjNkZGViYTc1ZGMiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsIlBob25lTnVtYmVyIjoiIiwiaWQiOiI4ODYxNWFhNy0zOWI0LTQ5OWUtOGFjMy00NDk5MmM3Y2E1OWEiLCJQaG90b1VSTCI6IiIsIlRhcmdldCI6IiIsIkZ1bGxOYW1lIjoiYWRtaW5AYWRtaW4uY29tIiwiSXNBY3RpdmUiOiJUcnVlIiwiVXNlclJvbGUiOiIwIiwiTGFuZ3VhZ2UiOiJlbiIsIm5hbWUiOiI4ODYxNWFhNy0zOWI0LTQ5OWUtOGFjMy00NDk5MmM3Y2E1OWEiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3MDUxNDM1NDgsImV4cCI6MTcwNzczNTU0OCwiaWF0IjoxNzA1MTQzNTQ4fQ.PgVx12BSQXD3Dg6b33lnJQPDSeynTBYSHEWlrGxlnX0',
            'Content-Type': 'application/json'
        };
    } else {
        return {};
    }
};

const getMultipartTokenHeader = () => {
    var token = Storage.getEntry(JWT_TOKEN);
    if (token) {
        return {
            Authorization: 'Bearer ' + token //'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBhZG1pbi5jb20iLCJqdGkiOiI1ZTM5NTQwMy05MTZkLTRlY2MtYWFiMC01NjNkZGViYTc1ZGMiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsIlBob25lTnVtYmVyIjoiIiwiaWQiOiI4ODYxNWFhNy0zOWI0LTQ5OWUtOGFjMy00NDk5MmM3Y2E1OWEiLCJQaG90b1VSTCI6IiIsIlRhcmdldCI6IiIsIkZ1bGxOYW1lIjoiYWRtaW5AYWRtaW4uY29tIiwiSXNBY3RpdmUiOiJUcnVlIiwiVXNlclJvbGUiOiIwIiwiTGFuZ3VhZ2UiOiJlbiIsIm5hbWUiOiI4ODYxNWFhNy0zOWI0LTQ5OWUtOGFjMy00NDk5MmM3Y2E1OWEiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3MDUxNDM1NDgsImV4cCI6MTcwNzczNTU0OCwiaWF0IjoxNzA1MTQzNTQ4fQ.PgVx12BSQXD3Dg6b33lnJQPDSeynTBYSHEWlrGxlnX0'
            //'content-type': 'multipart/form-data'
        };
    } else {
        return {};
    }
};

// eslint-disable-next-line no-unused-vars
const getGuestHeader = () => {
    return {
        'Content-Type': 'application/json'
    };
};

const unauthorizedError = (commit) => {
    commit(`authModule/${LOGOUT_USER}`, null, { root: true });
    Storage.saveEntry(JWT_TOKEN, null);
    router.push({ path: LOGIN_ROUTE });
};
