<template>
  <div v-if="eventsList.length" class="events">
    <template  v-for="(event, index) in eventsList" >
      <EventCard :key="`event--${index}`" :event="event" />
    </template>
  </div>
  <p class="no-results" v-else> No Results Found !!</p>
</template>

<script>
import EventCard from '@/components/EventCard.vue'

export default {
  name: 'EventsList',
  components: {
    EventCard
  },
  computed: {
    eventsList () {
      return this.$store.state.events
    }
  }
}
</script>

<style lang="scss" scoped>
.events {
  display: flex;
  margin-top: $spacer;
  flex-wrap: wrap;
  @media (max-width: 550px) {
    flex-wrap: wrap;
    justify-content: center;
  }
}

.no-results {
  font-size: 50px;
  font-weight: 200;
  word-spacing: 9px;
  letter-spacing: 2px;
  text-align: center;
  margin-top: $spacer;
}
</style>
