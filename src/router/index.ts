import { createRouter, createWebHistory } from "vue-router";
import TenderListView from "../views/TenderListView.vue";
import TenderDetailView from "../views/TenderDetailView.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { name: 'TenderList',path: '/', component: TenderListView },
    { name: 'TenderDetail', path: '/tender/:id', component: TenderDetailView },
  ],
});