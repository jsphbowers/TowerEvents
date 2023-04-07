<template>
  <section class="row justify-content-center">
    <div class="col-6 text-light">
      <h1>HERES THE TICKET</h1>
    </div>
  </section>
</template>


<script>
import { onMounted } from "vue";
import { Ticket } from "../models/TowerEvent.js";
import { attendeesService } from "../services/AttendeesService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";
import { accountService } from "../services/AccountService.js";

export default {
  props: {
    ticket: { type: Ticket, required: true }
  },
  setup() {
    return {
    }
  }
}
</script>


<style lang="scss" scoped></style>