const auth_routes = [{
    path: "/auth/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import ( /* webpackChunkName: "about" */ "@/views/auth/Login"),
}, ];

export default auth_routes;