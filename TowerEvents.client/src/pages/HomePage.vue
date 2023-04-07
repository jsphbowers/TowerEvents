<template>
  <section class="row p-3">
    <!-- SECTION Banner Photo with catchphrase -->
    <div class="col-12 border border-primary rounded p-3 bg-photo">
      <section class="row">
        <h3 class="col-md-3 mx-md-5 text-light title-text">Forget ticketmaster. Reserve your seat now with real events for
          real
          people.
        </h3>
      </section>
    </div>

    <!-- SECTION Sort Bar -->
    <div class="col-12 my-4">
      <section class="row">
        <div class="d-flex justify-content-evenly">
          <button class="btn btn-primary" title="All" @click="changeFilterCategory('')">All</button>
          <button class="btn btn-primary" :title="c" @click="changeFilterCategory(c)" v-for="c in categories">{{
            c.toUpperCase() }}</button>
        </div>
      </section>
    </div>

    <!-- SECTION Events Listed -->
    <div class="col-12">
      <section class="row">
        <div class="col-md-4 text-light p-2" v-for="e in towerEvents" :key="e.id">
          <TowerEventCard :towerEvent="e" />
        </div>
      </section>

    </div>
  </section>
</template>

<script>
import { onMounted, ref } from "vue";
import Pop from "../utils/Pop.js";
import { logger } from "../utils/Logger.js";
import { towerEventsService } from "../services/TowerEventsService.js"
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import TowerEventCard from "../components/TowerEventCard.vue";

export default {
  setup() {
    const filterCategory = ref("");
    const categories = ["concert", "convention", "sport", "digital"];
    async function getAllEvents() {
      try {
        await towerEventsService.getAllEvents();
      }
      catch (error) {
        Pop.error(error.message);
        logger.error(error.message);
      }
    }
    onMounted(() => getAllEvents());
    return {
      categories,
      account: computed(() => AppState?.account),
      towerEvents: computed(() => {
        if (!filterCategory.value) {
          return AppState.towerEvents;
        }
        else {
          return AppState.towerEvents.filter(t => t.type == filterCategory.value);
        }
      }),
      changeFilterCategory(category) {
        filterCategory.value = category
      }
    };
  },
  components: { TowerEventCard }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

.bg-photo {
  background-image: url("https://muralsyourway.vtexassets.com/arquivos/ids/233988/RL52989857.jpg?v=638004076001930000");
  background-position: center;
  background-size: cover;
}

.text-blur {}

.title-text {
  text-shadow: 2px 2px 3px black;
}
</style>
