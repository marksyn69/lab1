<template>
  <section>
    <h2>Item Details</h2>
    <div v-if="item">
      <p><strong>ID:</strong> {{ item.id }}</p>
      <p><strong>Title:</strong> {{ item.title }}</p>
    </div>
    <p v-else>Item not found.</p>

    <router-link to="/items">← Back to list</router-link>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const items = [
  { id: 1, title: 'Project Alpha' },
  { id: 2, title: 'Project Beta' },
  { id: 3, title: 'Project Gamma' },
]

const item = computed(() => items.find(i => i.id === Number(route.params.id)))
</script>
