<template>
  <p>Register for the Event here</p>
  <button @click="register">Register</button>
</template>

<script>

export default {
  props: ['event'],
  methods: {
    register() {
      // Call to API
      // If user registration is successful, redirect to the event details page
        // lets assume it was successful and navigate back progratically
        // and navigate the user to this location
      this.$router.push({
        name: 'EventDetails',
        // we could leave this line out as this information is passed in by default in the router file. I would work the same without this line.
        // params: { id: this.event.id } // same object that is used with router-link
      })
    }
  }
}

</script>