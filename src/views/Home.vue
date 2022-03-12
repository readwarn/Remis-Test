<template>
  <div class="home">
    <router-link :to="{ name: 'Login' }">Login</router-link>
    <router-link :to="{ name: 'AllDrivers' }">All Drivers</router-link>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
