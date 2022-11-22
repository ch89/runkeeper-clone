import { createRouter, createWebHistory } from "vue-router"
import Me from "../views/Me.vue"

export default createRouter({
	history: createWebHistory(),
	routes: [
		{ path: "/", name: "me", component: Me },
		{ path: "/training", name: "training", component: () => import("../views/Training.vue") },
		{ path: "/start", name: "start", component: () => import("../views/Start.vue") },
		{ path: "/feed", name: "feed", component: () => import("../views/Feed.vue") },
		{ path: "/explore", name: "explore", component: () => import("../views/Explore.vue") },
	]
})