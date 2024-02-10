import * as Constants from '../utils/Constants';
import moment from 'moment';

export default {
    install: (app) => {
        function Constant(key) {
            return Constants[key];
        }
        function API_DOMAIN(END_POINT) {
            return `http://data.boulevard.solutions/api/v1/${END_POINT}`;
        }
        function STORES_ROUTE(id) {
            return Constants.STORES_ROUTE(id);
        }
        function USERS_ROUTE(id) {
            return Constants.USERS_ROUTE(id);
        }

        function GROUPS_ROUTE(id) {
            return Constants.GROUPS_ROUTE(id);
        }

        app.config.globalProperties.$Constant = Constant;
        app.provide('Constant', Constant);

        app.config.globalProperties.$TIMESTAMP_FORMAT = Constants.TIMESTAMP_FORMAT;
        app.provide('TIMESTAMP_FORMAT', Constants.TIMESTAMP_FORMAT);

        app.config.globalProperties.$moment = moment;
        app.provide('moment', moment);

        app.config.globalProperties.$USERS_ROUTE = STORES_ROUTE;
        app.provide('STORES_ROUTE', STORES_ROUTE);

        app.config.globalProperties.$USERS_ROUTE = USERS_ROUTE;
        app.provide('USERS_ROUTE', USERS_ROUTE);

        app.config.globalProperties.$API_DOMAIN = API_DOMAIN;
        app.provide('API_DOMAIN', API_DOMAIN);

        app.config.globalProperties.$GROUPS_ROUTE = GROUPS_ROUTE;
        app.provide('GROUPS_ROUTE', GROUPS_ROUTE);
    }
};
