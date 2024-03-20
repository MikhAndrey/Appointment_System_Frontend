import {createStore} from "vuex";
import {UserInfo} from "./userInfo";

export const store = createStore({
    state: {
        userInfo: undefined as UserInfo | undefined,
        pageSize: 10
    },
    mutations: {
        setUserInfo (state, userInfo: UserInfo | undefined) {
            state.userInfo = userInfo;
        },
        setPageSize (state, pageSize: number) {
            state.pageSize = pageSize;
        }
    },
    getters: {
        getUserInfo (state) {
            return state.userInfo;
        },
        getPageSize (state) {
            return state.pageSize;
        }
    }
});
