<template>
  <div class="driver-card">
    <img
      src="https://img.icons8.com/material/24/1fb0f3/verified-account--v1.png"
      width="17"
      height="17"
      class="top-right-icon"
    />
    <img
      src="https://img.icons8.com/ios-glyphs/30/1fb0f3/arrow.png"
      width="30"
      height="20"
      class="bottom-right-icon"
      v-if="direct"
    />
    <h3 class="title">{{ driver.name }}</h3>
    <div class="tag">
      <img
        src="https://img.icons8.com/material/24/000000/company.png"
        width="15"
        height="15"
      />
      <p>{{ driver.companyName }}</p>
    </div>
    <div class="tag">
      <img
        src="https://img.icons8.com/material/24/000000/phone.png"
        width="15"
        height="15"
      />
      <p>{{ driver.phone }}</p>
    </div>

    <div class="tag">
      <img
        src="https://img.icons8.com/material/24/000000/mail.png"
        width="15"
        height="15"
      />
      <p>{{ driver.email }}</p>
    </div>
    <button @click="deleteUser" v-if="remove" :disabled="deleting">
      {{ deleting ? "Removing Driver" : "Remove Driver" }}
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "DriverCard",

  props: {
    driver: {
      type: Object,
      default: () => {},
    },

    direct: {
      type: Boolean,
      default: false,
    },

    remove: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    getDeletePayload() {
      return {
        driverId: this.driver.id,
        companyId: this.driver.companyId,
      };
    },
  },

  data() {
    return {
      deleting: false,
    };
  },

  methods: {
    ...mapActions({ deleteDriver: "driver/deleteDriver" }),

    deleteUser() {
      if (!confirm("Are you sure you want to delete this driver")) return;

      this.deleting = true;
      this.deleteDriver(this.getDeletePayload)
        .then((response) => {
          this.deleting = false;
          response
            ? this.$bus.$emit("toast", "Driver Profile deleted")
            : this.$bus.$emit("toast", "Failed to delete profile");
          console.log("delete resposne", response);
        })
        .catch(() => {
          this.deleting = false;
          this.$bus.$emit("toast", "Failed to update profile");
          console.log("error deleting user");
        });
    },
  },
};
</script>

<style scoped>
.driver-card {
  border-radius: 10px;
  padding: 15px;
  position: relative;
  border: 1.5px solid #343636;
  width: 300px;
  cursor: pointer;
  transition: border-color ease-in-out 0.2s;
}

.driver-card:hover {
  border-color: #1fb0f3;
}

.top-right-icon {
  position: absolute;
  inset: 0;
  left: calc(100% - 30px);
  top: 15px;
}

.bottom-right-icon {
  position: absolute;
  inset: 0;
  left: calc(100% - 40px);
  top: calc(100% - 25px);
  display: none;
}

.driver-card:hover .bottom-right-icon {
  display: block;
}

.title {
  font-weight: 700;
  text-align: center;
  margin-bottom: 13px;
  text-transform: capitalize;
}

.tag {
  display: flex;
  gap: 0 10px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
}

.tag p {
  font-size: 0.9rem;
  font-weight: 500;
}

button {
  background: #df5757;
  color: #fff;
  padding: 10px 0;
  border-radius: 0.4rem;
  width: 80%;
  margin: 15px auto;
  display: block;
  border: 0;
  outline: 0;
  cursor: pointer;
}
button:hover {
  filter: brightness(1.5);
}
</style>
