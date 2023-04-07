<template>
  <router-link :to="{ name: 'EventDetails', params: { eventId: towerEvent.id } }">
    <div class="selectable p-1 text-primary">
      <div class="text-center">
        <img class="eventCard card-img" :src="towerEvent.coverImg" :alt="towerEvent.name">
      </div>
      <div class="text-glass">
        <h5 class="text-blur mb-0">{{ towerEvent.name }}</h5>
        <h6 v-if="towerEvent.isCanceled == false" class="text-blur mb-0">{{ towerEvent.location }}</h6>
        <h6 v-if="towerEvent.isCanceled == false" class="text-blur mb-0">{{ towerEvent.startDate }}</h6>
        <div class="text-end">
          <h5 class="text-blur">{{ towerEvent.capacity }} spots left</h5>
        </div>
        <div v-if="towerEvent.isCanceled == true" class="text-center text-warning canceled rounded">
          <h5>Canceled</h5>
        </div>
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
  height: 38vh;
  width: 100%;
  border: 2px solid #56C7FB;
  border-radius: 1em;
  background-image: url();
}

.text-glass {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding-right: 2vh;
  padding-left: 2vh;
  padding-bottom: 1vh;
  border-radius: 6%;
  backdrop-filter: blur(3px);
  margin: 2.2%;
  text-shadow: 1px 1px 2px black;
}

.canceled {
  background-color: red;
}
</style>