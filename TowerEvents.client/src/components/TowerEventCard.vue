<template>
  <router-link :to="{ name: 'EventDetails', params: { eventId: towerEvent.id } }">
    <div class="selectable p-3">
      <div class="text-center">
        <img class="img-fluid eventCard" :src="towerEvent.coverImg" :alt="towerEvent.name">
      </div>
      <h5>{{ towerEvent.name }}</h5>
      <h6>{{ towerEvent.location }}</h6>
      <h6>{{ towerEvent.startDate }}</h6>
      <div class="text-end">
        <h5>{{ towerEvent.capacity }} spots left</h5>
      </div>
    </div>
  </router-link>
</template>


<script>
import { TowerEvent } from "../models/TowerEvent.js";

export default {

  props: {
    towerEvent: { type: TowerEvent, required: true }
  },

  setup() {
    return {}
  }
}
</script>


<style lang="scss" scoped>
.eventCard {
  border: 2px solid #56C7FB;
  border-radius: 1em;
  background-image: url();
}
</style>