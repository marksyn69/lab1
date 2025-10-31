import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ItemsListPage from '../pages/ItemsListPage.vue'
import ItemDetailsPage from '../pages/ItemDetailsPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/items', component: ItemsListPage },
  { path: '/items/:id', component: ItemDetailsPage, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
