<template>
  <div class="events-page">
    <SearchPanel />
    <EventsList />
  </div>
</template>

<script>
import SearchPanel from '@/components/SearchPanel.vue'
import EventsList from '@/components/EventsList.vue'

export default {
  name: 'EventsPage',
  components: {
    SearchPanel,
    EventsList
  },
  created () {
    this.$store.dispatch('updateEvents')
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.events-page {
    max-width: 1100px;
    margin: auto;
}
</style>
