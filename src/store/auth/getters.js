export default {
    getAuthUser: (state) => JSON.parse(state.authUser),
    getRemisToken: (state) => state.remisToken,
};