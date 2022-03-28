<template>
  <div v-if='event'>
    <h1>{{ event.title }}</h1>
    <!-- Add the Navigation for the Details, Registration and Edit components -->
    <nav id="nav">
      <router-link :to="{ name: 'EventDetails', params: {id} }">Details</router-link> |
      <router-link :to="{ name: 'EventRegister', params: {id} }">Register</router-link> |
      <router-link :to="{ name: 'EventEdit', params: {id} }">Edit</router-link>
    </nav>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
/* eslint-disable */ 
import EventService from '../../services/EventService.js'

export default {
  props: ['id'],
  data() {
    return {
      event: null
    }
  },
  created() {
    // fetch the event by id and set local event data
    EventService.getEvent(this.id)
      .then(response => {
      this.event = response.data
    }).catch(error => {
      console.log(error)
    })
  }
}

</script>

<style scoped>

</style> 