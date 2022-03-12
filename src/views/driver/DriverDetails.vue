<template>
  <div class="container" v-if="driver_details">
    <div class="profile-card">
      <driver-card :driver="driver_details" class="driver-card" remove />
    </div>
    <div class="details">
      <labelled-input
        label="name"
        :default="driver_details.name"
        v-model="name"
      />
      <labelled-input
        label="phone"
        :default="driver_details.phone"
        v-model="phone"
      />
      <labelled-input
        label="email"
        :default="driver_details.email"
        v-model="email"
      />
      <labelled-input
        label="address"
        :default="driver_details.address"
        v-model="address"
      />
      <labelled-input
        label="city"
        :default="driver_details.city"
        v-model="city"
      />
      <labelled-input
        label="state"
        :default="driver_details.state"
        v-model="state"
      />
      <multip-input
        @updated="updateRoles($event)"
        :roles="driver_details.roles"
      />
      <button :disabled="updating" @click="updateUser">
        {{ updating ? "UPDATING..." : "UPDATE" }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import labelledInput from "@/components/labelledInput";
import multipInput from "@/components/multipInput";
import driverCard from "@/components/driverCard";

export default {
  name: "DriverDetails",

  components: {
    driverCard,
    labelledInput,
    multipInput,
  },

  mounted() {
    this.getDriverProfile();
  },

  watch: {
    driver_details: {
      handler(details) {
        if (details) this.roles = details.roles;
      },
      immediate: true,
    },
  },

  computed: {
    ...mapGetters({ authUser: "auth/getAuthUser" }),

    disabled() {
      return (
        !this.name ||
        !this.email ||
        !this.phone ||
        !this.address ||
        !this.city ||
        !this.state ||
        !this.roles.length
      );
    },

    updatePayload() {
      return {
        updatePayload: {
          companyId: this.driver_details.companyId,
          userId: this.authUser.userId,
          name: this.name,
          phone: this.phone,
          email: this.email,
          address: this.address,
          city: this.city,
          state: this.state,
          roles: this.roles,
        },
        driverId: this.driver_details.id,
        companyId: this.driver_details.companyId,
      };
    },
  },

  data() {
    return {
      driver_details: null,
      roles: [],
      name: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      state: "",

      updating: false,
    };
  },

  methods: {
    ...mapActions({
      getADriver: "driver/getADriver",
      updateDriver: "driver/updateDriver",
      deleteDriver: "driver/deleteDriver",
    }),

    getDriverProfile() {
      this.$bus.$emit("show_loader", "Loading driver profile");
      this.getADriver(this.$route.params.id)
        .then((response) => {
          this.$bus.$emit("hide_loader");
          if (response) this.driver_details = response.data;
        })
        .catch(() => {
          console.log("error fetching details");
        });
    },

    updateRoles(roles) {
      if (!roles.length) return;
      this.roles = roles;
    },

    updateUser() {
      if (this.disabled) {
        this.$bus.$emit("toast", "Fill all fields");
        return;
      }
      this.updating = true;

      this.updateDriver(this.updatePayload)
        .then((response) => {
          this.updating = false;
          response
            ? this.$bus.$emit("toast", "Driver Profile updated")
            : this.$bus.$emit("toast", "Failed to update profile");
        })
        .catch(() => {
          this.updating = false;
          this.$bus.$emit("toast", "Failed to update profile");
        });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px 2%;
}

.profile-card {
  width: 30%;
}
.details {
  width: 68%;
  display: flex;
  flex-direction: column;
  gap: 20px 0;
}

.container .driver-card {
  width: 100%;
}

button {
  padding: 10px 0;
  border-radius: 0.4rem;
  background: #07adca;
  color: #fff;
  outline: 0;
  border: 0;
  cursor: pointer;
}
button:hover {
  background: rgb(34, 63, 228);
  color: #07adca;
}

@media screen and (max-width: 800px) {
  .details {
    width: 80%;
    margin: auto;
  }

  .profile-card {
    width: 50%;
    margin: auto;
  }
}

@media screen and (max-width: 600px) {
  .details {
    width: 85%;
    margin: auto;
  }

  .profile-card {
    width: 65%;
    margin: auto;
  }
}

@media screen and (max-width: 400px) {
  .details {
    width: 100%;
    margin: auto;
  }

  .profile-card {
    width: 90%;
    margin: auto;
  }
}
</style>
