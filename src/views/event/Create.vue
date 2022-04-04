<template>
  <h1>Create an Event</h1>

  <section class="form-container">
    <form @submit.prevent="onSubmit">

      <label>Select a category:</label>
      <select v-model="event.category">
        <option
          v-for="option in catgories"
          :value="option"
          :key="option"
          :selected="option === event.category">{{ option }}</option>
      </select>

      <h3>Give the event a name and description</h3>
      <label>Title</label>
      <input v-model="event.title" type="text" name="title" placeholder="Title">
      <label>Description</label>
      <input v-model="event.description" type="text" name="description" placeholder="Description">

      <h3>Where is the Event?</h3>
      <label>Location</label>
      <input v-model="event.location" type="text" name="location" placeholder="Location">

      <h3>When will the Event take place?</h3>
      <label>Date</label>
      <input v-model="event.date" type="text" name="date" placeholder="date">
      <label>Time</label>
      <input v-model="event.time" type="text" name="time" placeholder="Time">

      <button type="submit">Submit</button>

    </form>
  </section>

</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  data() {
    return {
      categories: [
        'nature',
        'animalistic',
        'housing',
        'education',
        'fitness',
        'philosophy',
        'self-reliance'
      ],
      event: {
        id: '',
        category: '',
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        organizer: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.event.id = uuidv4()
      this.event.organizer = this.$store.state.user
      console.log("Event:", this.event)
    }
  }
}

</script>

<style>

</style>