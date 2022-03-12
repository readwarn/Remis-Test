import axios from "axios";

const routes = {
    login: "/login",
};

const actions = {
    login: async({ commit }, authPayload) => {
        try {
            let { data, status } = await axios.post(routes.login, authPayload);
            if (status === 200) {
                commit("SET_AUTH_USER", data);
                return data;
            }
            return false;
        } catch (err) {
            return false;
        }
    },
};

export default actions;