<template>
  <BikeMapVue v-if="showMap" />
  <ProblemsListVue v-else />
</template>

<script setup>
import BikeMapVue from '@/components/BikeMap.vue'
import ProblemsListVue from '@/components/ProblemsList.vue'
import { useAppConfigStore } from '@/stores/appConfig'
import { storeToRefs } from 'pinia'

const appConfigStore = useAppConfigStore()
const { showMap } = storeToRefs(appConfigStore)
</script>
