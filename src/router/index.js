import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import Registraion from '@/components/Registration';
import UserPage from '@/components/UserPage';
import Manager from '@/components/Manager';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/registration',
      name: 'Registration',
      component: Registraion,
    },
    {
      path: '/user',
      name: 'User',
      component: UserPage,
    },
    {
      path: '/manager',
      name: 'Manager',
      component: Manager,
    },
  ],
});
