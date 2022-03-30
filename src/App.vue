<template>
  <div id="app">
    <!-- Display the flash message if it's not blank -->
    <div id="flashMessage" v-if="GStore.flashMessage">
      {{ GStore.flashMessage }}
    </div>
    <!-- naigation Links -->
    <div id="nav">
      <router-link :to="{ name: 'EventList' }">Events</router-link> |
      <router-link :to="{ name: 'About' }">About</router-link>
    </div>
    <!-- Rendered content for the App -->
    <router-view />
  </div>
</template>

<script>

export default {
  // Make the GStore object available inside this component
  inject: ['GStore']
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h4 {
  font-size:  20px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

/*************************
* flash message 
when the div appears fade the background from blue to transparent
***************************/
@keyframes bluefade {
  from {
    background: lightsteelblue;
  }
  to {
    background: transparent;
  }
}

#flashMessage {
  animation-name: bluefade;
  animation-duration: 3s;
  padding: 2rem;
}

</style>
