import { createRouter, createWebHistory } from 'vue-router'
import Standings from '../views/Standings.vue'

const routes = [{
        path: '/',
        name: 'Standings',
        component: Standings
    },
    {
        path: '/games',
        name: 'Games',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Games.vue')
    },
    {
        path: '/add',
        name: 'Add',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/Add.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router