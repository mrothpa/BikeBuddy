import { useAppConfigStore } from '@/stores/appConfig'

export const logoutUser = (router) => {
  const appConfigStore = useAppConfigStore()

  appConfigStore.clearPasetoToken()
  console.log("I'm here!")

  router.push({ path: '/login', query: { sessionExpired: true } })
}
