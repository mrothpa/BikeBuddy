<template>
  <div class="m-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-2xl font-bold mb-4 text-regal-blue-900">Benutzerverwaltung</h2>
      <button
        @click="toggleUserFilter"
        class="bg-regal-blue-900 text-white rounded-full px-4 py-2 shadow-md hover:bg-regal-blue-700 focus:outline-none focus:ring-2 focus:ring-regal-blue-500 cursor-pointer mr-4"
      >
        {{ showActiveUsersOnly ? 'Alle Benutzer anzeigen' : 'Nur aktive Benutzer anzeigen' }}
      </button>
    </div>

    <div v-if="loadingUsers" class="mb-4">Lade Benutzerdaten...</div>
    <div v-if="usersError" class="text-red-500 mb-4">
      Fehler beim Laden der Benutzer: {{ usersError }}
    </div>

    <div v-if="filteredUsers.length > 0" class="overflow-x-auto">
      <table class="min-w-full leading-normal shadow-md rounded-lg">
        <thead class="bg-gray-100">
          <tr>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              E-Mail
              <span class="text-sm text-gray-500 ml-2"
                >({{ showActiveUsersOnly ? 'aktive ' : '' }}{{ filteredUsers.length }} Nutzer)</span
              >
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Aktion
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {{ user.email }}
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
              <button
                @click="deleteUser(user.id, user.role)"
                :disabled="user.role === 'admin'"
                :class="{
                  'bg-red-500 hover:bg-red-700 text-white': user.role !== 'admin',
                  'bg-gray-400 text-gray-700 cursor-not-allowed': user.role === 'admin',
                }"
                class="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Löschen
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="!loadingUsers && !usersError">Keine Benutzer vorhanden.</div>
    <div v-if="isDeleting" class="text-blue-500 mt-2">Lösche Benutzer...</div>
    <div v-if="deleteError" class="text-red-500 mt-2">Fehler beim Löschen: {{ deleteError }}</div>
    <div v-if="deleteSuccess" class="text-green-500 mt-2">Benutzer erfolgreich gelöscht!</div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import useFetchUsers from '@/composables/useFetchUsers'
import useDeleteUser from '@/composables/useDeleteUser' // NEU: Importiere das Löschen-Composable

const { users, loadingUsers, usersError, fetchUsers } = useFetchUsers()
const { isDeleting, deleteError, deleteSuccess, deleteUserById } = useDeleteUser() // NEU: Instanziiere das Löschen-Composable

const showActiveUsersOnly = ref(false)

onMounted(async () => {
  await fetchUsers()
})

const toggleUserFilter = () => {
  showActiveUsersOnly.value = !showActiveUsersOnly.value
}

const filteredUsers = computed(() => {
  return showActiveUsersOnly.value
    ? users.value.filter((user) => !user.email.includes('+'))
    : users.value
})

const deleteUser = async (userId, userRole) => {
  // Mach die Funktion async
  if (userRole === 'admin') {
    console.log(`Versuch, admin-User ${userId} zu löschen wurde blockiert.`)
    // Optional: Zeige eine Benachrichtigung im UI an
    return
  }

  // Bestätigungsdialog (optional, aber dringend empfohlen für Löschoperationen)
  if (!confirm(`Soll der Benutzer mit der ID ${userId} wirklich gelöscht werden?`)) {
    return // Abbruch, wenn Benutzer nicht bestätigt
  }

  console.log(`Löschen-Button für User-ID: ${userId} gedrückt. Versuche zu löschen...`)

  const success = await deleteUserById(userId) // Rufe die Löschfunktion auf

  if (success) {
    console.log(`Benutzer ${userId} erfolgreich gelöscht.`)
    // Aktualisiere die Liste, indem du alle Benutzer neu abrufst
    await fetchUsers()
    // Optional: Eine Erfolgsmeldung anzeigen, z.B. Toast-Nachricht
  } else {
    console.error(`Löschen des Benutzers ${userId} fehlgeschlagen:`, deleteError.value)
    // Optional: Eine Fehlermeldung anzeigen
  }
}
</script>

<style scoped>
/* Hier können bei Bedarf zusätzliche spezifische Styles hinzugefügt werden */
</style>
