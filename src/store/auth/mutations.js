export default {
    SET_AUTH_USER: (state, user) => {
        state.remisToken = user.token;
        localStorage.setItem("remisToken", user.token);
        let authUser = JSON.stringify(user);
        state.authUser = authUser;
        localStorage.setItem("authUser", authUser);
    },
};