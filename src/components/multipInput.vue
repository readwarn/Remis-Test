<template>
  <div>
    <labelled-input label="roles" add @saved="addnewrole" v-model="new_role" />
    <div class="item-wrapper" v-if="updated_roles.length">
      <div
        class="item"
        v-for="(role, index) in updated_roles"
        :key="index"
        @click="removeRole(index)"
      >
        <p>{{ role }}</p>
        <img
          width="12"
          height="12"
          src="https://img.icons8.com/external-becris-lineal-becris/64/000000/external-cancel-mintab-for-ios-becris-lineal-becris.png"
        />
      </div>
    </div>
    <!-- <input type="text" class="add-role" placeholder="Add new Role" /> -->
  </div>
</template>

<script>
import labelledInput from "@/components/labelledInput";
export default {
  name: "MultiInput",

  components: {
    labelledInput,
  },

  props: {
    roles: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  watch: {
    roles: {
      handler(value) {
        this.updated_roles = value;
      },
      immediate: true,
    },
  },

  data() {
    return {
      new_role: "",
      updated_roles: [],
    };
  },

  methods: {
    addnewrole() {
      this.updated_roles.push(this.new_role);
      this.$emit("updated", this.updated_roles);
    },

    removeRole(index) {
      this.updated_roles.splice(index, 1);
      this.$emit("updated", this.updated_roles);
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 0 40px;
  position: relative;
}

.item-wrapper {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  border: 1.5px solid #000;
  border-radius: 0.4rem;
  padding: 15px;
  margin-top: 10px;
}

.item {
  display: inline-flex;
  align-items: center;
  gap: 0 15px;
  padding: 8px 18px;
  background: rgb(18, 217, 253, 0.6);
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: background ease-in-out 0.2s;
}

.item:hover {
  background: #f37474;
}

span {
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: color ease-in-out 0.2s;
}

span:hover {
  color: #07adca;
}

span.bottom-left {
  position: absolute;
  top: calc(100% - 22px);
  left: 20px;
  font-size: 0.8rem;
  cursor: unset;
}

span.bottom-left:hover {
  color: #000;
}

input.add-role {
  border: 1.5px solid #000;
  border-radius: 0.3rem;
  width: 100%;
  outline: 0;
  padding: 0 20px;
  height: 40px;
  margin-top: 10px;
  transition: border-color ease-in-out 0.2s;
}
input.add-role:focus {
  border-color: #07adca;
}
</style>
