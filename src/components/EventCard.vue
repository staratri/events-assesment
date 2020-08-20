<template>
  <div class="card">
    <h3 class="card__heading"> {{ event.name }}</h3>
    <div class="card__details">
      <img class="event-img" :src="`https://dummyimage.com/200x250/d9d9d9/${event.img}`">
      <div class="details">
        <p> {{ event.date }} </p>
        <p> Seats Available: <span> {{ event.availableSeats }} </span>  </p>
        <button class="button-wrapper" @click="$router.push({ name: 'Event', params: { id: event.id } })" :disabled="!event.availableSeats" > {{ event.availableSeats ? 'Book Now' : 'Sold Out' }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventCard',
  props: {
    event: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  padding: $spacer/2;
  border-radius: $border-radius;
  box-shadow: $shadow;
  color: $secondary-color;
  margin: $spacer/4;
  min-width: 225px;
  &__heading {
    text-align: center;
    color: initial;
  }
  &__details {
    display: flex;
    margin-top: $spacer/4;

    .button-wrapper {
      color: white;
      padding: 4px 10px;
      display: inherit;
      width: auto;
      text-align: center;
      text-decoration: none;
      background: #1484c5;
      &:disabled {
        background: maroon;
        opacity: 0.5;
        cursor: not-allowed;
      }
    }

    .event-img {
      max-width: 100px;
      height: 100px;
    }
    .details {
      max-height: 250px;
      padding: $spacer/4 0;
      * + * {
        margin-top: $spacer/2;
      }
      p > span {
        color: initial;
      }
    }
    .event-img + .details {
      margin-left: $spacer/4;
    }
  }
}
</style>
