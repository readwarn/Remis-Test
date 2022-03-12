<template>
  <div class="container">
    <form action @submit.prevent="loginUser">
      <input type="email" v-model="email" placeholder="Email" />
      <input type="text" v-model="password" placeholder="Password" />
      <button type="submit" :disabled="logging">
        {{ logging ? "Please wait.." : "Log In" }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",

  computed: {
    getPayload() {
      return {
        email: this.email,
        password: this.password,
      };
    },
  },

  data() {
    return {
      email: "",
      password: "",
      logging: false,
    };
  },

  methods: {
    ...mapActions({ login: "auth/login" }),

    loginUser() {
      this.logging = true;
      this.login(this.getPayload)
        .then((res) => {
          this.logging = false;
          if (res) {
            this.$bus.$emit("toast", "Login Successful");
            setTimeout(() => {
              this.$router.push({ name: "AllDrivers" });
            }, 1200);
          } else {
            this.$bus.$emit("toast", "Failed to login");
          }
        })
        .catch((err) => {
          this.logging = false;
          console.log("page eerr", err);
        });
    },
  },
};
</script>

<style scoped>
form {
  width: 500px;
  margin: auto;
  padding: 20px;
  background: palegoldenrod;
  border: 2px solid #000;
}

form input {
  border: 1px solid #000;
  width: 100%;
  outline: 0;
  margin-bottom: 20px;
  min-height: 40px;
  padding: 0 15px;
  border-radius: 0.4rem;
}

form button {
  width: 100%;
  min-height: 40px;
  cursor: pointer;
  background: rgb(8, 187, 211);
  outline: 0;
  border: 0;
  color: #fff;
}

@media screen and (max-width: 320px) {
  form {
    width: 95%;
    margin: auto;
  }
}
</style>
