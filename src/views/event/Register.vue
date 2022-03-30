<template>
  <p>Register for the Event here</p>
  <button @click="register">Register</button>
</template>

<script>

export default {
  props: ['event'],
  // Make the GStore object available inside this component
  inject: ['GStore'],
  methods: {
    register() {
      // Call to API
      // If user registration is successful, redirect to the event details page
      
      // Show the flash message or a successful registration
      this.GStore.flashMessage = 'You have registered successsfully for ' + this.event.title
      // Set a timeout to clear the flash message after three seconds
      setTimeout(() => {
        this.GStore.flashMessage = ''
      }, 3000)
      
      this.$router .push({
        name: 'EventDetails',
        // we could leave this line out as this information is passed in by default in the router file. I would work the same without this line.
        // params: { id: this.event.id } // same object that is used with router-link
      })
    }
  }
}

</script>