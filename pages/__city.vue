<template>
  <div>
    <v-card-actions>
      <v-btn text color="grey" @click.prevent="historyBack()"> Назад</v-btn>
    </v-card-actions>
    <v-item-group>
      <v-container>
        <v-row>
          <v-col v-for="n in weather" :key="n.dt_txt" cols="12" md="4">
            <WeatherCard :weather="n" />
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </div>
</template>

<script>
import WeatherCard from '~/components/WeatherCard.vue'

export default {
  components: {
    WeatherCard,
  },
  data() {
    return {
      newSearch: false,
    }
  },
  computed: {
    weather() {
      if (this.$store.getters['weathers/weathers'].length !== 0) {
        return this.$store.getters['weathers/weathers']
      }
      return null
    },
  },
  async created() {
    if (!this.weather) {
      await this.getData()
    }
  },
  methods: {
    historyBack() {
      this.$router.push('./')
    },
    getData() {
      this.$store.dispatch(
        'searches/setSearches',
        this.$route.params._city[0].toUpperCase() +
          this.$route.params._city.slice(1)
      )
      fetch(
        `http://api.openweathermap.org/data/2.5/forecast?q=${this.$route.params._city},ru&cnt=5&units=metric&appid=c426927dc3a9b8d41cad09e0d65fa6e1`
      )
        .then((res) => res.json())
        .then((res) => {
          this.$store.dispatch('weathers/setWeathers', res.list)
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
