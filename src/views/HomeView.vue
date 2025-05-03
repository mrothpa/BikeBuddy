<template>
  <BikeMapVue v-if="showMap" />
  <ProblemsListAdminVue v-else-if="user_role === 'admin' || user_role === 'city_admin'" />
  <ProblemsListVue v-else />
</template>

<script setup>
import BikeMapVue from '@/components/BikeMap.vue'
import ProblemsListVue from '@/components/ProblemsList.vue'
import ProblemsListAdminVue from '@/components/ProblemsAdminList.vue'
import { useAppConfigStore } from '@/stores/appConfig'
import { storeToRefs } from 'pinia'

const appConfigStore = useAppConfigStore()
const { showMap, user_role } = storeToRefs(appConfigStore)
</script>
