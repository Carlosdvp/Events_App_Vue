<template>
  <h1>The events</h1>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <!-- Add the Links for Pagination here -->
    <div class="pagination">
      <router-link
        id="prev-page"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
      >&#60; Previous</router-link>

      <router-link
        id="next-page"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >Next &#62;</router-link>
    </div>
  </div>
</template>

<script>

// @ is an alias to /src
import EventCard from "@/components/EventCard.vue"
import EventService from '@/services/EventService.js'
import { watchEffect } from 'vue'
import NProgress from 'nprogress'

export default {
  name: "EventList",
  // we will use props to pass the page # to EventService API
  props: ['page'],
  components: {
    EventCard
  },
  data() {
    return {
      events: null,
      // store the total number of events
      totalEvents: 0
    }
  },
  created() {
    watchEffect(() => {
      this.event = null
      // Start the progress bar
      NProgress.start()
      //get events from database
      // Parse te page number from the route we are navigating to
      EventService.getEvents(2, this.page)
        .then(res => {
          // continue routing and once the component is loaded, set these values
          this.events = res.data
          this.totalEvents = res.headers['x-total-count']
        })
        .catch(() => {
          // if the API all fails, load the Network Error page
          this.$router.push({name: 'NetworkError'})
        })
        .finally(() => {
          NProgress.done()
        })
    })
  },
  computed: {
    // Find the total number of pages
    hasNextPage() {
      var totalPages = Math.ceil(this.totalEvents / 2)
      // return if this page is not the last page
      return this.page < totalPages
    }
  }
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: darkviolet;
}

#prev-page {
  text-align: left;
}

#next-page {
  text-align: right;
}
</style>