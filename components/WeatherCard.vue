<template>
  <v-card class="mt-10 mb-10" max-width="600">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline">
          {{ searches[searches.length - 1] }}
        </v-list-item-title>
        <v-list-item-subtitle
          >{{ new Date(weather.dt_txt) }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-row align="center">
        <v-col class="display-3" cols="6">
          {{ weather.main.temp }}&deg;C
        </v-col>
        <v-col cols="6">
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/sun.png"
            alt="Sunny image"
            width="92"
          ></v-img>
        </v-col>
      </v-row>
    </v-card-text>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-send</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>{{ weather.wind.speed }} km/h</v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-cloud-download</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>{{ weather.main.humidity }}%</v-list-item-subtitle>
    </v-list-item>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
export default {
  props: {
    weather: Object,
  },
  computed: {
    searches() {
      return this.$store.getters['searches/searches']
    },
  },
  methods: {
    formatDate(dateString) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
      return new Date(dateString).toLocaleDateString(`ru-RU`, options)
    },
  },
}
</script>

<style></style>
