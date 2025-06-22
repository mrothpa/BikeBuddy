import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import ForgotPassword from '@/views/ForgotPasswordView.vue'
import UserManagementView from '@/views/UserManagementView.vue'
import { useAppConfigStore } from '@/stores/appConfig'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword,
    },
    {
      path: '/users',
      name: 'users-management',
      component: UserManagementView,
      meta: { requiresAdmin: true }, // Nur für Admins zugänglich
    },
  ],
})

// ## 2. Navigations-Guard (im selben router/index.js File)
// ---

router.beforeEach((to, from, next) => {
  const appConfigStore = useAppConfigStore() // Store instanziieren
  const userRole = appConfigStore.user_role // Direkt auf den Wert zugreifen

  // Prüfen, ob die aufgerufene Route Admin-Berechtigung erfordert
  if (to.meta.requiresAdmin) {
    if (userRole === 'admin') {
      // Benutzer ist Admin, Zugriff erlauben
      next()
    } else {
      // Benutzer ist KEIN Admin, auf Startseite umleiten
      console.warn(`Zugriff auf ${to.path} verweigert. Rolle: ${userRole}. Umleitung nach /`)
      next('/')
    }
  } else {
    // Route erfordert keine Admin-Berechtigung, Zugriff erlauben
    next()
  }
})

export default router
