<template>
  <div>
    <v-layout justify-center align-center>
      <v-toolbar dark>
        <v-toolbar-title>Выбор города</v-toolbar-title>
        <v-autocomplete
          v-model="select"
          :loading="loading"
          :items="items"
          :search-input.sync="search"
          cache-items
          clearable
          class="mx-4"
          flat
          hide-details
          dense
          filled
          label="Из какого вы города?"
          solo-inverted
          ><template slot="no-data">
            <div class="pa-4">Совпадений не обнаружено</div>
          </template></v-autocomplete
        >
      </v-toolbar>
    </v-layout>

    <div v-if="selected">
      <WeatherCard :weather="cityWeather" />
      <v-card-actions>
        <v-btn text color="grey" @click.prevent="selectCity(cityWeather)">
          Подробный отчет</v-btn
        >
      </v-card-actions>
    </div>
  </div>
</template>

<script>
import WeatherCard from '~/components/WeatherCard.vue'

export default {
  components: {
    WeatherCard,
  },
  async fetch({ store }) {
    if (store.getters['cities/cities'].length === 0) {
      await store.dispatch('cities/fetch')
    }
  },
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      select: null,
      selected: null,
      cityWeather: null,
      city: null,
    }
  },
  computed: {
    cities() {
      return this.$store.getters['cities/cities']
    },
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val)
      if (!this.select) {
        this.selected = false
      }
      if (this.select) {
        setTimeout(() => {
          this.selected = true
        }, 500)
      }
      if (this.select && this.loading === false) {
        this.$store.dispatch('searches/setSearches', this.select)
        fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${this.select},ru&cnt=5&units=metric&appid=c426927dc3a9b8d41cad09e0d65fa6e1`
        )
          .then((res) => res.json())
          .then((res) => {
            this.cityWeather = res.list[0]
            this.$store.dispatch('weathers/setWeathers', res.list)
            this.city = res.city.name
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            this.selected = false
            this.isLoading = false
          })
      }
    },
  },
  methods: {
    querySelections(v) {
      this.loading = true
      setTimeout(() => {
        this.items = this.cities.filter((e) => {
          return (e || '').toLowerCase().includes(v.toLowerCase()) === true
        })
        this.loading = false
      }, 500)
    },
    selectCity(cityWeather) {
      this.$router.push('/' + this.city.toLowerCase())
    },
  },
}
</script>
