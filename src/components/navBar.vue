<template>
  <nav>
    <router-link :to="{ name: 'AllDrivers' }" :active-class="'bold'"
      >Remis</router-link
    >
    <div class="right-links">
      <span>{{ getUsername }}</span>

      <router-link :to="{ name: 'Login' }" v-if="getUsername"
        >Logout</router-link
      >
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "NavBar",

  computed: {
    ...mapGetters({ getAuthUser: "auth/getAuthUser" }),

    getUsername() {
      return this.getAuthUser ? this.getAuthUser.fullName : "";
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  background: #0e9cd4;
  padding: 15px 30px;
  position: fixed;
  width: 100%;
  z-index: 9;
}

nav a {
  color: #000;
  transition: color ease-in-out 0.2s;
}
nav a:hover {
  text-decoration: underline;
  color: #fff;
}

nav span {
  font-weight: 700;
  margin-right: 15px;
}

.right-links {
  display: flex;
  align-items: center;
}

.bold {
  font-weight: 700;
}
</style>
