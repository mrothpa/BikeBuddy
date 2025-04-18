import { ref, reactive } from 'vue'
import { useAppConfigStore } from '@/stores/appConfig'
import { useRouter } from 'vue-router'

export default function useLogin() {
  const appConfigStore = useAppConfigStore()
  const router = useRouter()

  const loginData = reactive({
    email: '',
    password: '',
  })

  const error = ref(null)
  const loading = ref(false)

  const login = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(appConfigStore.getBackendUrl + 'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })

      console.log(response)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Anmeldefehler: ${response.status}`)
      }

      const data = await response.json()
      appConfigStore.setPasetoToken(data.token)
      await router.push('/') // Weiterleitung zur Homepage
    } catch (e) {
      error.value = e.message || 'Ein unbekannter Fehler ist aufgetreten.'
      console.error('Fehler beim Login:', e)
    } finally {
      loading.value = false
    }
  }

  return { loginData, error, loading, login }
}
