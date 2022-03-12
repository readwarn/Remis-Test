import axios from "axios";

const routes = {
    get_all_drivers: "/drivers/all?count=true&companyId=96f583d7-7395-412d-bb7c-5f6747ab479b",
    get_driver_details: "/driver/details/",
    add_driver: "/driver/add/",
    update_driver: "/driver/edit/",
    delete_driver: "/driver/delete/",
};

let remis_token = localStorage.getItem("remisToken");

const actions = {
    getAllDrivers: async({ commit }) => {
        try {
            let { status, data } = await axios.get(routes.get_all_drivers, {
                headers: {
                    Authorization: `Bearer ${remis_token}`,
                },
            });
            if (status === 200) {
                commit("UPDATE_ALL_DRIVERS", data);

                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    },

    getADriver: async(_, driver_id) => {
        try {
            let { status, data } = await axios.get(
                routes.get_driver_details + driver_id, {
                    headers: {
                        Authorization: `Bearer ${remis_token}`,
                    },
                }
            );
            return status === 200 ? data : false;
        } catch (err) {
            return false;
        }
    },

    updateDriver: async(_, { updatePayload, driverId, companyId }) => {
        try {
            let { status, data } = await axios.put(
                `${routes.update_driver}${companyId}/${driverId}`,
                updatePayload, {
                    headers: {
                        Authorization: `Bearer ${remis_token}`,
                    },
                }
            );
            return status === 200 ? data : false;
        } catch (err) {
            return false;
        }
    },

    deleteDriver: async(_, { driverId, companyId }) => {
        try {
            let { status, data } = await axios.delete(
                `${routes.delete_driver}${companyId}/${driverId}`, {
                    headers: {
                        Authorization: `Bearer ${remis_token}`,
                    },
                }
            );
            return status === 200 ? data : false;
        } catch (err) {
            return false;
        }
    },
};

export default actions;