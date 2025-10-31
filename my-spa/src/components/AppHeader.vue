<template>
  <header class="header">
    <h1>My Vue SPA</h1>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/items">Catalog</router-link>
    </nav>
  </header>
</template>

<style scoped>
.header {
  background-color: #333;
  color: white;
  padding: 1em;
}
nav a {
  color: white;
  text-decoration: none;
  margin: 0 8px;
}
.router-link-active {
  text-decoration: underline;
}
</style>
