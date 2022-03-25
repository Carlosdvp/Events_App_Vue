<template>
  <div v-if='event'>
    <h1>{{ event.title }}</h1>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>
  </div>
</template>

<script>
/* eslint-disable */ 
import EventService from '../services/EventService.js'

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