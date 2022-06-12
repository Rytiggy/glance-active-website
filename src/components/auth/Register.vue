<template>
  <div>
    <div class="text-h5 q-pb-md">Sign Up</div>
    <q-form @submit="register" class="q-gutter-md">
      <q-input
        :dark="true"
        outlined
        v-model="email"
        label="Email"
        type="email"
        required
      />
      <q-input
        :dark="true"
        outlined
        v-model="password"
        label="Password"
        type="password"
        required
      />
      <q-input
        :dark="true"
        outlined
        v-model="passwordTwo"
        label="Confirm Password"
        type="password"
        required
      />
      <div>
        <q-btn
          class="text-black"
          label="Register"
          type="submit"
          color="primary"
        />
      </div>
    </q-form>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useAuthStore } from "src/stores/auth";
import { ref } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "Register-Page",
  props: {},
  setup() {
    const $q = useQuasar();

    const store = useAuthStore();
    const email = ref(null);
    const password = ref(null);
    const passwordTwo = ref(null);

    function register() {
      if (password.value !== passwordTwo.value) {
        $q.notify({
          type: "warning",
          position: "top",
          message: "Passwords do not match",
        });
        return;
      }
      store.register(email.value, password.value);
    }
    return {
      // you can return the whole store instance to use it in the template
      email,
      password,
      passwordTwo,
      store,
      register,
    };
  },
});
</script>
