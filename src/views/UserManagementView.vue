<template>
  <div class="m-6">
    <h2 class="text-2xl font-bold mb-4 text-regal-blue-900">Benutzerverwaltung</h2>

    <div v-if="loadingUsers" class="mb-4">Lade Benutzerdaten...</div>
    <div v-if="usersError" class="text-red-500 mb-4">
      Fehler beim Laden der Benutzer: {{ usersError }}
    </div>

    <div v-if="users.length > 0" class="overflow-x-auto">
      <table class="min-w-full leading-normal shadow-md rounded-lg">
        <thead class="bg-gray-100">
          <tr>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              E-Mail
            </th>
            <th
              class="px-5 py-3 border-b-2 border-gray-200 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
            >
              Aktion
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
              {{ user.email }}
            </td>
            <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
              <button
                @click="deleteUser(user.id, user.role)"
                :disabled="user.role === 'Admin'"
                :class="{
                  'bg-red-500 hover:bg-red-700 text-white': user.role !== 'Admin',
                  'bg-gray-400 text-gray-700 cursor-not-allowed': user.role === 'Admin',
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
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import useFetchUsers from '@/composables/useFetchUsers' // Stelle sicher, dass der Pfad korrekt ist

const { users, loadingUsers, usersError, fetchUsers } = useFetchUsers()

onMounted(async () => {
  await fetchUsers()
})

const deleteUser = (userId, userRole) => {
  if (userRole === 'admin') {
    console.log(`Versuch, Admin-User ${userId} zu löschen wurde blockiert.`)
    return
  }
  console.log(`Löschen-Button für User-ID: ${userId} gedrückt.`)
  // Hier würde später die eigentliche Löschlogik stehen,
  // z.B. Aufruf eines Composables zum Löschen eines Users
}
</script>

<style scoped>
/* Hier können bei Bedarf zusätzliche spezifische Styles hinzugefügt werden */
</style>
