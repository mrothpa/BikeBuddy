import { useAppConfigStore } from '@/stores/appConfig'

export const logoutUser = (router) => {
  const appConfigStore = useAppConfigStore()

  appConfigStore.clearPasetoToken()

  router.push({ path: '/login', query: { sessionExpired: true } })
}
