import {createStore} from "vuex";
import {UserInfo} from "./account.model";

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
        getUserInfo (state): UserInfo | undefined {
            return state.userInfo;
        },
        getPageSize (state) {
            return state.pageSize;
        },
        isInPermission(state, permissionName: string): 
            (permission: string) => boolean | undefined {
            return permissionName => state.userInfo?.permissions.some(p => p === permissionName);
        }
    }
});
