import { createWebHistory, createRouter } from "vue-router";
import store from "../store";

const routes = [{
        path: "/char",
        alias: "/char",
        name: "CharGI",
        component: () =>
            import ("../views/CharGI.vue"),
    },
    {
        path: "/char-add",
        name: "CharAdd",
        component: () =>
            import ("../views/CharAdd.vue"),
    },
    {
        path: "/char-edit/:id",
        name: "CharEdit",
        component: () =>
            import ("../views/CharEdit.vue"),
    },
    {
        path: "/weapon",
        alias: "/weapon",
        name: "WeaponGI",
        component: () =>
            import ("../views/WeaponGI.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import ("../views/UserLogin.vue"),
    }, {
        path: "/register",
        name: "Register",
        component: () =>
            import ("../views/UserRegister.vue"),
    }, {
        path: "/profile",
        name: "Profile",
        component: () =>
            import ("../views/UserProfile.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ["/login", "/register", "/char", "/weapon", "/"];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = store.getters.userLoggedIn;
    if (authRequired && !loggedIn) {
        next("/login");
    } else {
        next();
    }
});
export default router;