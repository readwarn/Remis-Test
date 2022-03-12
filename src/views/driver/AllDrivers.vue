<template>
  <div class="container">
    <p class="title">Remis Driver</p>
    <div class="drivers-conatiner" v-if="getDrivers.length">
      <router-link
        :to="{ name: 'DriveProfile', params: { id: driver.id } }"
        v-for="driver in getDrivers"
        :key="driver.id"
      >
        <driver-card :driver="driver" direct />
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import driverCard from "@/components/driverCard";
export default {
  name: "AllDrivers",

  components: {
    driverCard,
  },

  computed: {
    ...mapGetters({ getDrivers: "driver/getDrivers" }),
  },

  watch: {
    getDrivers: {
      handler(drivers) {
        if (!drivers.length) this.fetchDrivers();
      },
      immediate: true,
    },
  },

  data() {
    return {
      getting_drivers: false,
    };
  },

  methods: {
    ...mapActions({ getAllDrivers: "driver/getAllDrivers" }),

    fetchDrivers() {
      this.$bus.$emit("show_loader", "loading drivers...");
      this.getAllDrivers()
        .then((res) => {
          this.$bus.$emit("hide_loader");
          if (!res) {
            console.log("error fetching");
          }
        })
        .catch(() => {
          console.log("error fetching");
        });
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.drivers-conatiner {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
}

.title {
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 20px;
}
a {
  color: inherit;
}
</style>
