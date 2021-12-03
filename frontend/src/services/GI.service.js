import http from "../common/http";
import store from "../store";
class GIService {
    constructor() {
        http.interceptors.request.use(config => {
            const user = store.getters.loggedInUser;
            if (user && user.accessToken) {
                config.headers.authorization = `Bearer ${user.accessToken}`;
            }
            return config;
        });
    }
    getAll() { return http.get("/GI"); }
    get(id) { return http.get(`/GI/${id}`); }
    create(data) { return http.post("/GI", data); }
    update(id, data) { return http.put(`/GI/${id}`, data); }
    delete(id) { return http.delete(`/GI/${id}`); }
    deleteAll() { return http.delete("/GI"); }
    findByName(name) { return http.get(`/GI?name=${name}`); }
}
export default new GIService();