import {createStore} from "vuex";
import {UserInfo} from "./account.model";

interface storeState {
    userInfo: UserInfo | undefined,
    pageSize: number
}

export const store = createStore({
    state: {
        userInfo: undefined as UserInfo | undefined,
        pageSize: 10
    },
    mutations: {
        setUserInfo (state: storeState, userInfo: UserInfo | undefined) {
            state.userInfo = userInfo;
        },
        setPageSize (state: storeState, pageSize: number) {
            state.pageSize = pageSize;
        }
    },
    getters: {
        getUserInfo (state: storeState): UserInfo | undefined {
            return state.userInfo;
        },
        getPageSize (state: storeState) {
            return state.pageSize;
        },
        isInPermission(state: storeState, permissionName: string): 
            (permission: string) => boolean | undefined {
            return permissionName => state.userInfo?.permissions.some(p => p === permissionName);
        }
    }
});
