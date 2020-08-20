<script>
import debounce from 'lodash/debounce'

export default {
  name: 'SearchPanel',
  data () {
    return {
      searchText: '',
      isSearching: false
    }
  },
  computed: {
    city: {
      get () {
        return this.searchText
      },
      set (newValue) {
        this.$store.dispatch('updateEvents', newValue)
      }
    }
  },
  methods: {
    debounce
  }
}
</script>

<template>
  <div class="search">
    <form>
      <input type="text" placeholder="Search Events" class="search__input" v-model="city" @focus="isSearching = true" >
    </form>
    <button class="button-wrapper" />
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.search {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: $border-radius;
  box-shadow: $shadow;
  position: relative;
  max-width: 500px;
  form {
    width: 100%;
    display: flex;
    padding: $spacer/2 $spacer/1.5;
  }

  &__input {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    font-size: 14px;
    // font-family: "Roboto", sans-serif;
    letter-spacing: 1px;
    padding-left: 10px;
    font-weight: bold;
    text-transform: capitalize;
    border: none;
    &:focus {
      outline: none;
    }
  }
  &__icon {
    width: 20px;
    height: 20px;
  }
  &__options {
    font-size: 14px;
    letter-spacing: 1px;
    font-weight: bold;
    position: absolute;
    border-radius: $border-radius;
    box-shadow: 0 5px 10px 0 rgba(32, 33, 36, 0.28);
    top: 101%;
    background: #ffffff;
    width: 100%;
    left: 0;
    z-index: 1;
    .city {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: $spacer/2 $spacer/1.5;
      &__name span {
        color: gray;
      }
      &__weather {
        display: flex;
        align-items: center;
        p {
          font-weight: bold;
          span {
            font-weight: normal;
            display: block;
            font-size: 12px;
          }
        }
        p + img {
          margin-left: $spacer/5;
        }
      }
    }
    &--hide {
      display: none;
    }
    li + li {
      border-top: 1px solid lightgray
    }
  }
}
</style>
