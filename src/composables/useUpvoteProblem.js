// src/composables/useUpvoteProblem.js
import { ref } from 'vue'
import { useAppConfigStore } from '@/stores/appConfig'
import { storeToRefs } from 'pinia'

export default function useUpvoteProblem() {
  const appConfigStore = useAppConfigStore()
  const { pasetoToken } = storeToRefs(appConfigStore)

  const loadingUpvote = ref(false)
  const errorUpvote = ref(null)
  const successUpvote = ref(false)

  const upvoteProblem = async (problemId) => {
    if (!problemId) {
      console.warn('Problem-ID fehlt für das Upvote.')
      return false
    }

    loadingUpvote.value = true
    errorUpvote.value = null
    successUpvote.value = false

    try {
      const response = await fetch(`${appConfigStore.getBackendUrl}problems/${problemId}/upvote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${pasetoToken.value}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Fehler beim Upvoten des Problems: ${response.status}`)
      }

      successUpvote.value = true
      return true
    } catch (err) {
      errorUpvote.value = err.message
      console.error('Fehler beim Upvoten des Problems:', err)
      return false
    } finally {
      loadingUpvote.value = false
    }
  }

  const downvoteProblem = async (problemId) => {
    if (!problemId) {
      console.warn('Problem-ID fehlt für das Downvote/Remove Upvote.')
      return false
    }

    loadingUpvote.value = true // Verwenden denselben Loading-Ref, da es eine ähnliche Aktion ist
    errorUpvote.value = null
    successUpvote.value = false

    try {
      const response = await fetch(
        `${appConfigStore.getBackendUrl}problems/${problemId}/downvote`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${pasetoToken.value}`,
          },
        },
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.message || `Fehler beim Entfernen des Upvotes: ${response.status}`,
        )
      }

      successUpvote.value = true
      return true
    } catch (err) {
      errorUpvote.value = err.message
      console.error('Fehler beim Entfernen des Upvotes:', err)
      return false
    } finally {
      loadingUpvote.value = false
    }
  }

  return {
    loadingUpvote,
    errorUpvote,
    successUpvote,
    upvoteProblem,
    downvoteProblem,
  }
}
