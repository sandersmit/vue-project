<script setup lang="ts">
import { onMounted } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'
import { useDataNumberStore } from '../stores/DataNumberStore'

const dataNumberStore = useDataNumberStore()

onMounted(() => {
  console.log("onMounted HomeView.vue");
  
  dataNumberStore.initAllRowColFinal()
})
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
