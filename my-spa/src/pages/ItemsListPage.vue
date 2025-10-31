<template>
  <section>
    <h2>Items List</h2>
    <ul>
      <li v-for="item in items" :key="item.id">
        <router-link :to="`/items/${item.id}`">{{ item.title }}</router-link>
      </li>
    </ul>
  </section>
</template>

<script setup>
const items = [
  { id: 1, title: 'Project Alpha' },
  { id: 2, title: 'Project Beta' },
  { id: 3, title: 'Project Gamma' },
]
</script>
