import Vue from "vue";
import Vuex from "vuex";
import driver from "./driver";
import auth from "./auth";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        driver,
        auth,
    },
});