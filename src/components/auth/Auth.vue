<template>
  <q-page class="max-page-width" padding>
    <Register v-if="showRegisterView" />
    <div v-else>
      <div class="text-h5 q-pb-md">Login</div>
      <q-form @submit="login" class="q-gutter-md">
        <q-input
          :dark="true"
          outlined
          v-model="email"
          label="Email"
          type="email"
        />
        <q-input
          :dark="true"
          outlined
          v-model="password"
          label="Password"
          type="password"
        />
        <div>
          <q-btn
            class="text-black"
            label="Login"
            type="submit"
            color="primary"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "src/stores/auth";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import Register from "./Register.vue";

export default defineComponent({
  name: "Auth-page",
  components: {
    Register,
  },
  setup() {
    const route = useRoute();
    const showRegisterView = ref(route.query.register);
    if (!showRegisterView.value) {
      showRegisterView.value = false;
    }

    watch(route, (selection, prevSelection) => {
      showRegisterView.value = route.query.register;
    });
    const store = useAuthStore();
    const email = ref(null);
    const password = ref(null);
    return {
      // you can return the whole store instance to use it in the template
      email,
      password,
      store,
      showRegisterView,
    };
  },
  methods: {
    login() {
      this.store.login(this.email, this.password);
    },
  },
});
</script>
