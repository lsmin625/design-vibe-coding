import { createRouter, createWebHistory } from "vue-router"

import Signup from "./pages/Signup.vue";
import ProductList from "./pages/ProductList.vue";

const routes = [
    { path: "/", component: Signup },
    { path: "/signup", component: Signup },
    { path: "/products", component: ProductList },
    { path: "/:pathMatch(.*)*", redirect: "/" },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
