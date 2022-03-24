<template>
  <h1>The events</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>

// @ is an alias to /src
import EventCard from "@/components/EventCard.vue"
import EventService from '@/services/EventService.js'
// import axios from 'axios'

export default {
  name: "EventList",
  components: {
    EventCard
  },
  data() {
    return {
      events: null
    }
  },
  created() {
    //get events from database
    EventService.getEvents()
      .then(res => {
        this.events = res.data
      })
      .catch(error => {
        console.log(error)
      })
  }
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>