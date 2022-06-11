<template>
  <q-page class="max-page-width" padding>
    <div>
      Auth
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
import { ref } from "vue";

export default defineComponent({
  name: "Auth-page",
  props: {},
  setup() {
    const store = useAuthStore();
    const email = ref(null);
    const password = ref(null);
    return {
      // you can return the whole store instance to use it in the template
      email,
      password,
      store,
    };
  },
  methods: {
    login() {
      this.store.login(this.email, this.password);
    },
  },
});
</script>
