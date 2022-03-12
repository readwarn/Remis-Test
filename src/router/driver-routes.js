const driver_routes = [{
        path: "/drivers/all",
        name: "AllDrivers",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "@/views/driver/AllDrivers"),
    },
    {
        path: "/drivers/:id",
        name: "DriveProfile",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "@/views/driver/DriverDetails"),
    },
];

export default driver_routes;