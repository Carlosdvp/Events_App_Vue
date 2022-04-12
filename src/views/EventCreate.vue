<template>
  <h1>Create an Event</h1>

  <section class="form-container">
    <form @submit.prevent="onSubmit">

      <label>Select a category:</label>
      <select v-model="event.category">
        <option
          v-for="option in categories"
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

      <!-- Just for testing - to see what events are in our state -->
      <!-- <div>{{ $store.state.events }}</div> -->

    </form>
  </section>

</template>

<script>
import { v4 as uuidv4 } from 'uuid'
// import EventService from '@/services/EventService.js'

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
      // ue the uuid library to create unique id's
      this.event.id = uuidv4()
      // this is a basic way of accessing the data in the store from our component
      this.event.organizer = this.$store.state.user
      // now we need to dispatch the 'Action' that will commit the mutation and update the state
      this.$store.dispatch('createEvent', this.event).then(() => {
        this.$router.push({
          name: 'EventDetails',
          params: { id: this.event.id }
        })
      }).catch(error => {
        this.$router.push({
          name: 'ErrorDisplay',
          params: { error: error }
        })
      })
    }
  }
}

</script>

<style scoped>

h3 {
  font-size: 2rem;
  font-weight: 700;
}

input {
  display: block;
  width: 100%;
  height: 2.3rem;
  margin-bottom: 1.5rem;
}

input[type=text] {
  padding: 0 10px;
}

input:focus {
  border-color: firebrick;
  outline: 0;
}

.form-container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10%;
}

select:focus {
  border-color: firebrick;
  outline: 0;
}

button {
  align-items: center;
  height: 3rem;
  padding: 0 40px;
  background: linear-gradient(to right, lightblue, lightskyblue);
  color: #FFF;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s linear;
}

button:hover {
  transform: scale(1.03);
  box-shadow: 0 3px 9px 0 rgba(0, 0, 0, 0.3);
}

</style>