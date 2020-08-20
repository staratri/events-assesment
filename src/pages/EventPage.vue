<template>
  <div class="events-page">
    <button class="button-wrapper" @click.prevent="$router.back()">
      Go Back
    </button>
    <h1 class="events-page__heading">{{ currentEvent.name }}</h1>
    <p class="events-page__seats-count"> Number of seats available: {{ currentEvent.availableSeats }} </p>
    <div class="events-page__form">
      <h2 class="confirmation" v-if="isBooked">Tickets booked</h2>
      <span class="error">{{ error }}</span>
      <div class="form">
        <img :src="`https://dummyimage.com/200x250/d9d9d9/${currentEvent.img}`">
        <form >
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="formValues.name.value" @change="validate('name')">
            <span class="error">{{ formValues.name.error }}</span>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="formValues.email.value" @change="validate('email')">
            <span class="error">{{ formValues.email.error }}</span>
          </div>
          <!-- <div class="form-group">
            <label for="number">Phone Number:</label>
            <input type="text" id="number" @change="validate('phone')">
            <span>{{ formValues.phone.error }}</span>
          </div> -->
          <div class="form-group">
            <label for="number-of-seats">Number of seats:</label>
            <select name="number-of-seats" id="number-of-seats" v-model="seatSelection">
              <option v-for="(i, index) in currentEvent.availableSeats" :key="`available-seat--${index}`" :value="index + 1">{{ index + 1 }}</option>
            </select>
          </div>
          <template v-if="numberOfAttendees.length">
            <div v-for="(attendee, index) in numberOfAttendees" :key="`seat--${index}`" class="form-group">
              <label for="name">Name of attendee {{ index + 2}}</label>
              <input type="text" id="name" v-model="attendee.name">
              <span class="error" v-if="isNameValid(attendee.name)">{{ isNameValid(attendee.name) }}</span>
            </div>
          </template>
        </form>
      </div>
      <div class="form-actions">
        <button class="button-wrapper" :class="{ disabled: isBooked }" @click.prevent="submitForm" :disabled="isBooked">
          Submit
        </button>
          <button class="button-wrapper" :class="{ disabled: isBooked }" @click.prevent="$router.back()" :disabled="isBooked">
          cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventPage',
  data () {
    return {
      formValues: {
        name: {
          value: '',
          error: ''
        },
        email: {
          value: '',
          error: ''
        },
        phone: {
          value: '',
          error: ''
        }
      },
      numberOfSeats: 1,
      numberOfAttendees: [],
      error: '',
      isBooked: false
    }
  },
  computed: {
    currentEvent () {
      return this.$store.state.events.find(event => event.id === this.$route.params.id)
    },
    seatSelection: {
      get () {
        return this.numberOfSeats
      },
      set (newValue) {
        this.numberOfAttendees = []
        if (newValue > 1) {
          for (let i = 2; i <= newValue; i++) {
            this.numberOfAttendees.push({
              value: '',
              name: '',
              error: ''
            })
          }
        }
        this.numberOfSeats = newValue
      }
    }
  },
  methods: {
    validate (type) {
      const emailRegex = /\S+@\S+\.\S+/
      switch (type) {
        case 'name':
          // pass message instead of bool
          this.formValues.name.error = this.isNameValid(this.formValues.name.value)
          break
        case 'email':
          this.formValues.email.error = emailRegex.test(this.formValues.email.value) ? '' : 'Invalid email'
          break
        default:
          break
      }
    },
    isNameValid (name) {
      const nameRegex = /^[A-Za-z\s]+$/
      if (!name.length || !nameRegex.test(name)) {
        return 'Only letters and spaces are allowed'
      }
      return ''
    },
    submitForm () {
      this.error = ''
      const isValid = (() => {
        const form = this.formValues
        let isValid = !!(form.name.value && form.email.value)
        if (this.numberOfAttendees.length) {
          isValid = this.numberOfAttendees.every(el => el.name)
        }
        return isValid
      })()
      if (!isValid) {
        this.error = 'Invalid entries, please correct your inputs'
        return
      }
      this.isBooked = true
      console.log({
        name: this.formValues.name.value,
        email: this.formValues.email.value,
        seats: this.numberOfSeats,
        attendees: this.numberOfAttendees.reduce((crr, acc) => {
          acc.push(crr.name)
          return acc
        }, [])
      })
    }
  }

}
</script>

<style lang="scss" scoped>
$mobile-screen: 650px;

.events-page {
    max-width: 1100px;
    margin: auto;
    & > * + * {
      margin-top: $spacer/2;
    }

    .button-wrapper {
      font-size: 20px;
    }

    &__heading {
      font-size: 36px;
      text-align: center;
    }

    &__seats-count {
      text-align: center;
    }

    &__form {
      padding: $spacer;
      max-width: 600px;
      margin: auto;
      border-radius: $border-radius;
      box-shadow: $shadow;
      margin-top: $spacer/2;
      position: relative;
      .confirmation {
        margin-bottom: $spacer/2;
        text-align: center;
      }
      .form {
        display: flex;
        justify-content: space-between;
        @media (max-width: $mobile-screen) {
          flex-wrap: wrap;
          justify-content: center;
        }
        img {
          width: 150px;
          height: 150px;
          @media (max-width: $mobile-screen) {
            margin-bottom: $spacer/2;
          }
        }
        form {
          flex: 1;
        }
        .form-group {
          display: flex;
          flex: 2;
          margin-left: $spacer/2;
          flex-wrap: wrap;
          justify-content: space-between;
          position: relative;
          @media (max-width: $mobile-screen) {
            margin-bottom: 0;
          }
          label {
            flex: 1;
            text-align: end;
            margin-right: $spacer/3;
            @media (max-width: $mobile-screen) {
              margin-bottom: 0;
              text-align: start;

            }
          }
          input, select {
            min-width: 60%;
          }
          span {
            top: -15px;
            right: 0px;
            font-size: 12px;
          }
        }

        .form-group + .form-group {
          margin-top: $spacer/2;
        }

      }
      .form-actions {
        margin-top: $spacer/2;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        @media (max-width: $mobile-screen) {
          justify-content: center;
        }
        .button-wrapper {
          background: #1484c5;
          padding: $spacer/4 $spacer/2;
          color: #ffffff;
        }
        .button-wrapper + .button-wrapper {
          margin-left: $spacer/2;
          background: $secondary-color;
        }
      }
    }

    .error {
      position: absolute;
      top: -15px;
      right: 0px;
      color: red;
      font-size: 12px;
    }
}
</style>
