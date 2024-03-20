import {createStore} from "vuex";
import {UserInfo} from "./userInfo";

export const store = createStore({
    state: {
        userInfo: undefined as UserInfo | undefined
    },
    mutations: {
        setUserInfo (state, userInfo: UserInfo | undefined) {
            state.userInfo = userInfo;
        }
    },
    getters: {
        getUserInfo (state) {
            return state.userInfo;
        }
    }
});
