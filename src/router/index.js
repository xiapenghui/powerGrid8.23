import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path(.*)',
    component: () => import('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/auth-redirect',
  component: () => import('@/views/login/auth-redirect'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/error-page/404'),
  hidden: true
},

{
  path: '/401',
  component: () => import('@/views/error-page/401'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    name: 'Dashboard',
    meta: {
      title: 'dashboard',
      icon: 'dashboard',
      affix: true
    }
  }]
},

// 业务订单管理
{
  path: '/BusinessData',
  component: Layout,
  redirect: '/BusinessData/CommonPar',
  name: 'Table',
  alwaysShow: true,
  meta: {
    title: 'BusinessData',
    icon: 'tab',
    roles: ['ROLE_ADMIN', 'ROLE_USER']
  },
  children: [
    {
      path: 'CommonPar',
      component: () => import('@/views/BusinessData/CommonPar'),
      name: 'CommonPar',
      meta: {
        title: 'CommonPar'
      }
    },

    {
      path: 'PurchaseIinformation',
      component: () => import('@/views/BusinessData/PurchaseIinformation'),
      name: 'PurchaseIinformation',
      meta: {
        title: 'PurchaseIinformation'
      }
    },
    {
      path: 'SalesIinformation',
      component: () => import('@/views/BusinessData/SalesIinformation'),
      name: 'SalesIinformation',
      meta: {
        title: 'SalesIinformation'
      }
    },
    {
      path: 'ProductionList',
      component: () => import('@/views/BusinessData/ProductionList'),
      name: 'ProductionList',
      meta: {
        title: 'ProductionList'
      }
    },

    {
      path: 'KeyInformation',
      component: () => import('@/views/BusinessData/KeyInformation'),
      name: 'KeyInformation',
      meta: {
        title: 'KeyInformation'
      }
    },
    {
      path: 'IdInformation',
      component: () => import('@/views/BusinessData/IdInformation'),
      name: 'IdInformation',
      meta: {
        title: 'IdInformation'
      }
    },
    {
      path: 'SpareInventory',
      component: () => import('@/views/BusinessData/SpareInventory'),
      name: 'SpareInventory',
      meta: {
        title: 'SpareInventory'
      }
    },
    {
      path: 'FinishedInformation',
      component: () => import('@/views/BusinessData/FinishedInformation'),
      name: 'FinishedInformation',
      meta: {
        title: 'FinishedInformation'
      }
    },
    {
      path: 'SupplyList',
      component: () => import('@/views/BusinessData/SupplyList'),
      name: 'SupplyList',
      meta: {
        title: 'SupplyList'
      }
    }
  ]
},

// 检验检测数据
{
  path: '/InspectionData',
  component: Layout,
  redirect: '/InspectionData/CommonPar',
  name: 'Table',
  meta: {
    title: 'InspectionData',
    icon: 'tab',
    roles: ['ROLE_ADMIN', 'ROLE_USER']
  },
  children: [

    {
      path: 'CommonPar',
      component: () => import('@/views/InspectionData/CommonPar'),
      name: 'CommonPar',
      meta: {
        title: 'CommonPar'
      }
    },

    {
      path: 'CircuitTrolley',
      component: () => import('@/views/InspectionData/CircuitTrolley'),
      name: 'CircuitTrolley',
      meta: {
        title: 'CircuitTrolley'
      }
    },
    {
      path: 'BusInformation',
      component: () => import('@/views/InspectionData/BusInformation'),
      name: 'BusInformation',
      meta: {
        title: 'BusInformation'
      }
    },
    {
      path: 'CabinetMaterial',
      component: () => import('@/views/InspectionData/CabinetMaterial'),
      name: 'CabinetMaterial',
      meta: {
        title: 'CabinetMaterial'
      }
    },
    {
      path: 'ResistanceCircuit',
      component: () => import('@/views/InspectionData/ResistanceCircuit'),
      name: 'ResistanceCircuit',
      meta: {
        title: 'ResistanceCircuit'
      }
    },
    {
      path: 'MechanicalOperation',
      component: () => import('@/views/InspectionData/MechanicalOperation'),
      name: 'MechanicalOperation',
      meta: {
        title: 'MechanicalOperation'
      }
    },
    {
      path: 'MechanicalTest',
      component: () => import('@/views/InspectionData/MechanicalTest'),
      name: 'MechanicalTest',
      meta: {
        title: 'MechanicalTest'
      }
    },
    {
      path: 'WithstandTest',
      component: () => import('@/views/InspectionData/WithstandTest'),
      name: 'WithstandTest',
      meta: {
        title: 'WithstandTest'
      }
    },
    {
      path: 'InsulationTest',
      component: () => import('@/views/InspectionData/InsulationTest'),
      name: 'InsulationTest',
      meta: {
        title: 'InsulationTest'
      }
    },

    {
      path: 'StaticContact',
      component: () => import('@/views/InspectionData/StaticContact'),
      name: 'StaticContact',
      meta: {
        title: 'StaticContact'
      }
    },

    {
      path: 'ContactBox',
      component: () => import('@/views/InspectionData/ContactBox'),
      name: 'ContactBox',
      meta: {
        title: 'ContactBox'
      }
    },

    {
      path: 'ElectricalInterlock',
      component: () => import('@/views/InspectionData/ElectricalInterlock'),
      name: 'ElectricalInterlock',
      meta: {
        title: 'ElectricalInterlock'
      }
    },
    {
      path: 'HeadBox',
      component: () => import('@/views/InspectionData/HeadBox'),
      name: 'HeadBox',
      meta: {
        title: 'HeadBox'
      }
    },
    {
      path: 'CabinetBush',
      component: () => import('@/views/InspectionData/CabinetBush'),
      name: 'CabinetBush',
      meta: {
        title: 'CabinetBush'
      }
    },
    {
      path: 'ColumnInsulation',
      component: () => import('@/views/InspectionData/ColumnInsulation'),
      name: 'ColumnInsulation',
      meta: {
        title: 'ColumnInsulation'
      }
    },
    {
      path: 'CurrentTransformer',
      component: () => import('@/views/InspectionData/CurrentTransformer'),
      name: 'CurrentTransformer',
      meta: {
        title: 'CurrentTransformer'
      }
    },

    {
      path: 'VoltageTransformer',
      component: () => import('@/views/InspectionData/VoltageTransformer'),
      name: 'VoltageTransformer',
      meta: {
        title: 'VoltageTransformer'
      }
    },
    {
      path: 'LightnArreste',
      component: () => import('@/views/InspectionData/LightnArreste'),
      name: 'LightnArreste',
      meta: {
        title: 'LightnArreste'
      }
    },
    {
      path: 'DotDisplay',
      component: () => import('@/views/InspectionData/DotDisplay'),
      name: 'DotDisplay',
      meta: {
        title: 'DotDisplay'
      }
    },
    {
      path: 'FuseBox',
      component: () => import('@/views/InspectionData/FuseBox'),
      name: 'FuseBox',
      meta: {
        title: 'FuseBox'
      }
    },
    {
      path: 'LightImpulse',
      component: () => import('@/views/InspectionData/LightImpulse'),
      name: 'LightImpulse',
      meta: {
        title: 'LightImpulse'
      }
    },
    {
      path: 'DischargeTest',
      component: () => import('@/views/InspectionData/DischargeTest'),
      name: 'DischargeTest',
      meta: {
        title: 'DischargeTest'
      }
    }

  ]
},

// 电容器
{
  path: '/CapacitorData',
  component: Layout,
  redirect: '/CapacitorData/CommonPar',
  name: 'Table',
  alwaysShow: true,
  meta: {
    title: 'CapacitorData',
    icon: 'tab',
    roles: ['ROLE_ADMIN', 'ROLE_USER']
  },
  children: [

    {
      path: 'CommonPar',
      component: () => import('@/views/CapacitorData/CommonPar'),
      name: 'CommonPar',
      meta: {
        title: 'CommonPar'
      }
    },

    {
      path: 'Polypropylene',
      component: () => import('@/views/CapacitorData/Polypropylene'),
      name: 'Polypropylene',
      meta: {
        title: 'Polypropylene'
      }
    },

    {
      path: 'Stain',
      component: () => import('@/views/CapacitorData/Stain'),
      name: 'Stain',
      meta: {
        title: 'Stain'
      }
    },

    {
      path: 'Material',
      component: () => import('@/views/CapacitorData/Material'),
      name: 'Material',
      meta: {
        title: 'Material'
      }
    },

    {
      path: 'CarTem',
      component: () => import('@/views/CapacitorData/CarTem'),
      name: 'CarTem',
      meta: {
        title: 'CarTem'
      }
    },

    {
      path: 'CarHum',
      component: () => import('@/views/CapacitorData/CarHum'),
      name: 'CarHum',
      meta: {
        title: 'CarHum'
      }
    },

    {
      path: 'CarClean',
      component: () => import('@/views/CapacitorData/CarClean'),
      name: 'CarClean',
      meta: {
        title: 'CarClean'
      }
    },

    {
      path: 'Vacuum',
      component: () => import('@/views/CapacitorData/Vacuum'),
      name: 'Vacuum',
      meta: {
        title: 'Vacuum'
      }
    },

    {
      path: 'Interpolar',
      component: () => import('@/views/CapacitorData/Interpolar'),
      name: 'Interpolar',
      meta: {
        title: 'Interpolar'
      }
    },
    {
      path: 'PolePair',
      component: () => import('@/views/CapacitorData/PolePair'),
      name: 'PolePair',
      meta: {
        title: 'PolePair'
      }
    },

    {
      path: 'Discharge',
      component: () => import('@/views/CapacitorData/Discharge'),
      name: 'Discharge',
      meta: {
        title: 'Discharge'
      }
    },

    {
      path: 'Capacitance',
      component: () => import('@/views/CapacitorData/Capacitance'),
      name: 'Capacitance',
      meta: {
        title: 'Capacitance'
      }
    },

    {
      path: 'Loss',
      component: () => import('@/views/CapacitorData/Loss'),
      name: 'Loss',
      meta: {
        title: 'Loss'
      }
    },

    {
      path: 'InneFuse',
      component: () => import('@/views/CapacitorData/InneFuse'),
      name: 'InneFuse',
      meta: {
        title: 'InneFuse'
      }
    },

    {
      path: 'Device',
      component: () => import('@/views/CapacitorData/Device'),
      name: 'Device',
      meta: {
        title: 'Device'
      }
    }

  ]
},

/**
   * asyncRoutes
   * the routes that need to be dynamically loaded based on user roles
   */
// 系统管理
{
  path: '/SystemManagement',
  component: Layout,
  redirect: '/SystemManagement/userMangement',
  alwaysShow: true, // will always show the root menu
  name: 'Permission',
  meta: {
    title: 'SystemManagement',
    icon: 'lock',
    roles: ['ROLE_ADMIN'] // you can set roles in root nav
  },
  children: [{
    path: 'userMangement',
    component: () => import('@/views/SystemManagement/userMangement'),
    name: 'userMangement',
    meta: {
      title: 'userMangement',
      roles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'supplierMangemen',
    component: () => import('@/views/SystemManagement/supplierMangemen'),
    name: 'supplierMangemen',
    meta: {
      title: 'supplierMangemen',
      roles: ['ROLE_ADMIN']
    }
  }
  ]
},

/** when your routing map is too long, you can split it into small modules **/

{
  path: '/error',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ErrorPages',
  hidden: true,
  meta: {
    title: 'errorPages',
    icon: '404'
  },
  children: [{
    path: '401',
    component: () => import('@/views/error-page/401'),
    name: 'Page401',
    meta: {
      title: 'page401',
      noCache: true
    }
  },
  {
    path: '404',
    component: () => import('@/views/error-page/404'),
    name: 'Page404',
    meta: {
      title: 'page404',
      noCache: true
    }
  }
  ]
},
{
  path: '*',
  redirect: '/404',
  hidden: true
}
  // // 404 page must be placed at the end !!!
  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true
  // }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
// 系统管理
export const asyncRoutes = [{
  path: '/SystemManagement',
  component: Layout,
  redirect: '/SystemManagement/userMangement',
  alwaysShow: true, // will always show the root menu
  name: 'SystemManagement',
  meta: {
    title: 'SystemManagement',
    icon: 'lock'
  },
  children: [{
    path: 'userMangement',
    component: () => import('@/views/SystemManagement/userMangement'),
    name: 'userMangement',
    meta: {
      title: 'userMangement'
    }
  },
  {
    path: 'supplierMangemen',
    component: () => import('@/views/SystemManagement/supplierMangemen'),
    name: 'supplierMangemen',
    meta: {
      title: 'supplierMangemen'
    }
  }
  ]
}

]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
