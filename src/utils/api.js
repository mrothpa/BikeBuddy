// src/utils/api.js
import { logoutUser } from '@/utils/auth'
import router from '@/router' // Sicherstellen, dass der Router importiert ist

async function handleResponse(response) {
  if (!response.ok) {
    if (response.status === 401) {
      let errorDetail = null
      try {
        errorDetail = await response.json()
        if (errorDetail && errorDetail.error === 'Invalid token') {
          console.error('Ungültiges Token - Benutzer wird ausgeloggt.')
          logoutUser(router)
          throw new Error('Deine Sitzung ist abgelaufen. Bitte melde dich erneut an.')
        }
      } catch (jsonError) {
        try {
          const textError = await response.text()
          if (textError === 'Missing token') {
            console.error('Fehlendes Token - Benutzer wird ausgeloggt.')
            logoutUser(router)
            throw new Error('Deine Sitzung ist abgelaufen. Bitte melde dich erneut an.')
          }
        } catch (textErrorError) {
          console.warn('Fehler beim Lesen des Response-Bodys als Text:', textErrorError)
          // Wenn wir den Body nicht lesen können, gehen wir trotzdem vom abgelaufenen Token aus (vorsichtige Annahme)
          console.error(
            'Vermutlich abgelaufenes Token (Body konnte nicht gelesen werden) - Benutzer wird ausgeloggt.',
          )
          logoutUser(router)
          throw new Error('Deine Sitzung ist abgelaufen. Bitte melde dich erneut an.')
        }
      }
      // Wenn es ein 401 war, aber keine der erwarteten Meldungen, werfen wir einen generischen Fehler
      throw new Error(`API-Fehler: ${response.status} - Nicht autorisiert.`)
    } else {
      // Andere nicht-2xx Fehler
      let errorMessage = `API-Fehler: ${response.status}`
      try {
        const errorData = await response.json()
        errorMessage += ` - ${errorData.message || 'Keine detaillierte Fehlermeldung vom Server.'}`
      } catch (jsonError) {
        try {
          const textError = await response.text()
          errorMessage += ` - ${textError}`
        } catch (textErrorError) {
          errorMessage += ' - Konnte Fehlerdetails nicht lesen.'
        }
      }
      throw new Error(errorMessage)
    }
  }
  try {
    return await response.json()
  } catch (error) {
    return null
  }
}

export async function apiFetch(url, options = {}) {
  return fetch(url, options).then(handleResponse)
}
