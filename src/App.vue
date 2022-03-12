<template>
  <div id="app">
    <div class="toast" :class="{ 'active-toast': show_toast }">
      {{ toast_message }}
    </div>
    <nav-bar />
    <div class="loader" v-if="show_loader">
      <img src="https://img.icons8.com/ios/50/000000/square-loader.png" />
      <h3>{{ loading_text }}</h3>
    </div>
    <router-view />
  </div>
</template>

<script>
import navBar from "@/components/navBar";
export default {
  components: {
    navBar,
  },

  created() {
    this.$bus.$on("show_loader", (text) => {
      this.loading_text = text;
      this.show_loader = true;
    });

    this.$bus.$on("hide_loader", () => {
      this.loading_text = "";
      this.show_loader = false;
    });

    this.$bus.$on("toast", (message) => {
      this.toast_message = message;
      this.show_toast = true;

      setTimeout(() => {
        this.toast_message = "";
        this.show_toast = false;
      }, 2500);
    });
  },

  data() {
    return {
      loading_text: "",
      show_loader: false,
      toast_message: "",
      show_toast: false,
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap");

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  text-decoration: 0;
  font-family: "Montserrat", sans-serif;
}

#app {
  position: relative;
  padding: 0 0 100px 0;
  overflow-x: hidden;
}

.container {
  padding: 100px 20px 0 20px;
}

.loader {
  min-height: 100vh;
  width: 100%;
  position: fixed;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(73, 71, 71, 0.5);
}

.loader h3 {
  font-weight: 600;
  font-size: 1.2rem;
  margin-top: 10px;
}

.toast {
  position: fixed;
  left: 100%;
  top: 50px;
  padding: 10px 20px;
  border-radius: 0.3rem;
  border: 1.5px solid #000;
  background: #0e9cd4;
  color: #fff;
  display: block;
  width: fit-content;
  font-size: 0.8rem;
  font-weight: 700;
  z-index: 5;
}

.toast.active-toast {
  transform: translateX(-110%);
  transition: all ease-in-out 0.4s;
}

@media screen and (max-width: 400px) {
  .container {
    padding: 100px 10px 0 10px;
  }
}
</style>
