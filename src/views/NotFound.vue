<template>
  <div class="not-found">
    <h1>This is not the {{ resource }} you are looking for.</h1>
    <router-link :to="{name: 'EventList'}">Back to Home page</router-link>
  </div>
</template>

<script>

export default {
  props: {
    resource: {
      type: String,
      required: true,
      default: 'page'
    }
  }
}

</script>