<template>
  <div class="input-wrapper">
    <label for="name" :id="label">{{ label }}</label>
    <input
      ref="input"
      type="number"
      :id="label"
      v-if="number"
      @input="modelInput"
      v-model="value"
      :class="{ 'active-input': active }"
      :placeholder="getPlaceholder"
    />
    <input
      ref="input"
      type="text"
      :id="label"
      :disabled="!active"
      v-model="value"
      v-else
      @input="modelInput"
      :class="{ 'active-input': active }"
      :placeholder="getPlaceholder"
    />
    <p @click="toggle">
      {{ active ? "Save" : add ? "Add" : "Edit" }}
    </p>
  </div>
</template>

<script>
export default {
  name: "LabelledInput",

  props: {
    default: {
      type: [String, Number],
      default: "",
    },
    label: {
      type: String,
      default: "Name",
    },
    number: {
      type: Boolean,
      default: false,
    },
    add: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    getPlaceholder() {
      return this.add
        ? `Click ${this.active ? "save" : "add"} to add new role`
        : `Click ${this.active ? "save" : "edit"} to update ${this.label}`;
    },
  },

  watch: {
    default: {
      handler(value) {
        this.value = value;
        this.$emit("input", value);
      },
      immediate: true,
    },

    active(active) {
      if (active) this.$refs.input.focus();
    },
  },

  data() {
    return {
      active: false,
      value: "",
    };
  },

  methods: {
    modelInput() {
      this.$emit("input", this.value);
    },

    toggle() {
      if (this.active) {
        if (!this.value) {
          this.$bus.$emit("toast", `${this.label} should not be empty`);
        } else {
          this.active = !this.active;
          if (this.add) {
            this.$emit("saved");
            this.value = "";
          }
        }
      } else {
        this.active = !this.active;
      }
    },
  },
};
</script>

<style scoped>
.input-wrapper {
  position: relative;
  min-height: 44px;
  height: 44px;
  width: 100%;
}

.input-wrapper input {
  position: absolute;
  inset: 0;
  border: 1.5px #000 solid;
  outline: 0;
  width: 100%;
  transition: border-color ease-in-out 0.25s;
  border-radius: 0.4rem;
  padding-left: 130px;
  color: rgb(112, 110, 110);
  font-weight: 500;
  filter: brightness(0.6);
}

.input-wrapper input:focus {
  border-color: #07adca;
}

input.active-input {
  background: transparent;
  color: #000;
}

label {
  font-weight: 700;
  font-size: 0.8rem;
  z-index: 2;
  padding: 0 15px;
  height: 100%;
  color: #555555;
  background: rgb(18, 217, 253, 0.6);
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 0.4rem;
  border-bottom-left-radius: 0.4rem;
  min-width: 120px;
  text-transform: capitalize;
}
p {
  position: absolute;
  inset: 0;
  left: calc(100% - 40px);
  top: 50%;
  transform: translateY(-35%);
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  z-index: 2;
  transition: color ease-in-out 0.25s;
}

p:hover {
  color: #07adca;
}

@media screen and (max-width: 600px) {
  label {
    min-width: 100px;
  }
  .input-wrapper input {
    padding-left: 100px;
  }
}
@media screen and (max-width: 400px) {
  label {
    min-width: 85px;
  }
  .input-wrapper input {
    padding-left: 90px;
  }
}
</style>
