import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import AdminLogin from '@/components/AdminLogin';

import Branch from '@/components/Branch';
import AddBranch from '@/components/AddBranch';
import EditBranch from '@/components/EditBranch';

import Item from '@/components/Item';
import AddItem from '@/components/AddItem';
import EditItem from '@/components/EditItem';

import Order from '@/components/Order';
import AddOrder from '@/components/AddOrder';
import EditOrder from '@/components/EditOrder';

import ManageItem from '@/components/ManageItem';
import AddManageItem from '@/components/AddManageItem';
import AddBranchItem from '@/components/AddBranchItem';
import EditBranchItem from '@/components/EditBranchItem';

import Staff from '@/components/Staff';
import AddStaff from '@/components/AddStaff';
import EditStaff from '@/components/EditStaff';

import OrderHistory from '@/components/OrderHistory';

import Dashboard from '@/components/Dashboard';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Order',
      component: Order,
    },
    {
      path: '/orders/add',
      name: 'AddOrder',
      component: AddOrder,
    },
    {
      path: '/orders/:id',
      name: 'EditOrder',
      component: EditOrder,
    },
    {
      path: '/branchs/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/admin/branchs',
      name: 'Branch',
      component: Branch,
    },
    {
      path: '/admin/login',
      name: 'AdminLogin',
      component: AdminLogin,
    },
    {
      path: '/branchs/register',
      name: 'AddBranch',
      component: AddBranch,
    },
    {
      path: '/admin/branchs/:id',
      name: 'EditBranch',
      component: EditBranch,
    },
    {
      path: '/admin/items',
      name: 'Item',
      component: Item,
    },
    {
      path: '/admin/items/add',
      name: 'AddItem',
      component: AddItem,
    },
    {
      path: '/admin/items/:id',
      name: 'EditItem',
      component: EditItem,
    },
    {
      path: '/manageitems',
      name: 'ManageItem',
      component: ManageItem,
    },
    {
      path: '/manageitems/add',
      name: 'AddManageItem',
      component: AddManageItem,
    },
    {
      path: '/manageitems/add/:id',
      name: 'AddBranchItem',
      component: AddBranchItem,
    },
    {
      path: '/manageitems/edit/:id',
      name: 'EditBranchItem',
      component: EditBranchItem,
    },
    {
      path: '/staff',
      name: 'Staff',
      component: Staff,
    },
    {
      path: '/staff/add',
      name: 'AddStaff',
      component: AddStaff,
    },
    {
      path: '/staff/edit/:id',
      name: 'EditStaff',
      component: EditStaff,
    },
    {
      path: '/orderhistory',
      name: 'OrderHistory',
      component: OrderHistory,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
  ],
});

