import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
**/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
//不需要动态判断权限的路由，如登录页、404、等通用页面
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true},
  {path: '/404', component: () => import('@/views/errorPage/404'), hidden: true},
  {path: '/401', component: () => import('@/views/errorPage/401'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: {title: 'dashboard', icon: 'dashboard', noCache: true}
    }],
    // hidden: true
  }
];

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

//需求动态判断权限并通过 addRouters 动态添加的页面
export const asyncRouterMap = [
  {
    path: '/data_preview',
    component: Layout,
    redirect: '/data_preview/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'data_preview',
      icon: 'dashboard',
    },
    children: [{
      path: 'app',
      component: () => import('@/views/data_preview/index'),
      name: 'app_base',
      meta: {
        title: 'app_base',
        icon: 'chart',
      }
    }, {
      path: 'website',
      component: () => import('@/views/data_preview/index'),
      name: 'website_base',
      meta: {
        title: 'website_base',
        icon: 'chart'
      }
    }, {
      path: 'boss',
      component: () => import('@/views/data_preview/index'),
      name: 'boss_view',
      meta: {
        title: 'boss_view',
        icon: 'chart'
      }
    }, {
      path: 'operate',
      component: () => import('@/views/data_preview/index'),
      name: 'operate',
      meta: {
        title: 'operate',
        icon: 'chart'
      }
    }]
  },
  {
    path: '/action_analyse',
    component: Layout,
    redirect: '/action_analyse/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'action_analyse',
      icon: 'user',
    },
    children: [{
      path: 'event',
      component: () => import('@/views/action_analyse/event/index'),
      name: 'event',
      meta: {
        title: 'event',
        icon: 'component',
      }
    }, {
      path: 'funnel',
      component: () => import('@/views/action_analyse/funnel/index'),
      name: 'funnel',
      meta: {
        title: 'funnel',
        icon: 'component'
      }
    }, {
      path: 'retain',
      component: () => import('@/views/action_analyse/retain/index'),
      name: 'retain',
      meta: {
        title: 'retain',
        icon: 'component'
      }
    }, {
      path: 'distribution',
      component: () => import('@/views/action_analyse/distribution/index'),
      name: 'distribution',
      meta: {
        title: 'distribution',
        icon: 'component'
      }
    },  {
      path: 'user_path',
      component: () => import('@/views/action_analyse/user_path/index'),
      name: 'user_path',
      meta: {
        title: 'user_path',
        icon: 'component'
      }
    },  {
      path: 'duration',
      component: () => import('@/views/action_analyse/duration/index'),
      name: 'duration',
      meta: {
        title: 'duration',
        icon: 'component'
      }
    } ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
