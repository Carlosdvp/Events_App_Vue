<template>
  <div v-if='GStore.event'>
    <h1>{{ GStore.event.title }}</h1>
    <!-- Add the Navigation for the Details, Registration and Edit components -->
    <nav id="nav">
      <router-link :to="{ name: 'EventDetails' }">Details</router-link> |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link> |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </nav>
    <!-- Our Children components will be rendered here -->
    <router-view :event="GStore.event"></router-view>
  </div>
</template>

<script>

export default {
  inject: ['GStore']
}

</script>
