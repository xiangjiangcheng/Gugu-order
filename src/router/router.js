
export default [
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "index" */ '@/views/index.vue')
  },
  {
    path: '*',
    name: 'notFound',
    component: () => import(/* webpackChunkName: "notFound" */ '@/views/notFound.vue')
  }
]

