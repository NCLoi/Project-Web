import http from "../common/http";
import store from "../store";
class WPService {
    constructor() {
        http.interceptors.request.use(config => {
            const user = store.getters.loggedInUser;
            if (user && user.accessToken) {
                config.headers.authorization = `Bearer ${user.accessToken}`;
            }
            return config;
        });
    }
    getAll() { return http.get("/Weapon"); }
    get(id) { return http.get(`/Weapon/${id}`); }
    create(data) { return http.post("/Weapon", data); }
    update(id, data) { return http.put(`/Weapon/${id}`, data); }
    delete(id) { return http.delete(`/Weapon/${id}`); }
    deleteAll() { return http.delete("/Weapon"); }
    findByName(name) { return http.get(`/Weapon?namewp=${name}`); }
}
export default new WPService();