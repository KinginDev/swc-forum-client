import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _d8384ba4 = () => import('../pages/user/index.vue' /* webpackChunkName: "pages/user/index" */).then(m => m.default || m)
const _0a3557ad = () => import('../pages/thread/index.vue' /* webpackChunkName: "pages/thread/index" */).then(m => m.default || m)
const _1208180e = () => import('../pages/auth/signin.vue' /* webpackChunkName: "pages/auth/signin" */).then(m => m.default || m)
const _0b924a6f = () => import('../pages/auth/signup.vue' /* webpackChunkName: "pages/auth/signup" */).then(m => m.default || m)
const _19f0e47e = () => import('../pages/thread/new/index.vue' /* webpackChunkName: "pages/thread/new/index" */).then(m => m.default || m)
const _3210d418 = () => import('../pages/thread/_id/index.vue' /* webpackChunkName: "pages/thread/_id/index" */).then(m => m.default || m)
const _c0acd73c = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/user",
			component: _d8384ba4,
			name: "user"
		},
		{
			path: "/thread",
			component: _0a3557ad,
			name: "thread"
		},
		{
			path: "/auth/signin",
			component: _1208180e,
			name: "auth-signin"
		},
		{
			path: "/auth/signup",
			component: _0b924a6f,
			name: "auth-signup"
		},
		{
			path: "/thread/new",
			component: _19f0e47e,
			name: "thread-new"
		},
		{
			path: "/thread/:id",
			component: _3210d418,
			name: "thread-id"
		},
		{
			path: "/",
			component: _c0acd73c,
			name: "index"
		}
    ],
    
    
    fallback: false
  })
}
