import Vue from 'vue';
import Router from 'vue-router';
import IndexPage from '@/pages/IndexPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'indexRedirect',
      redirect: '/bitcoin',
      component: IndexPage,
    },
    {
      path: '/:coin',
      name: 'index',
      component: IndexPage,
    },
  ],
});
