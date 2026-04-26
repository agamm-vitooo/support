// src/router/index.js
import { createRouter, createWebHistory } from "vue-router"
import Dashboard from "../views/Dashboard.vue"
import AddIssue from "../views/Issue.vue"

const routes = [
  { path: "/", component: Dashboard },
  { path: "/add", component: AddIssue },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})