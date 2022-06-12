<template>
  <q-toolbar class="max-page-width q-py-md">
    <q-btn :to="{ name: 'landingPage' }" dense flat aria-label="Menu">
      <img style="width: 64px" src="~assets/logo.svg" />
    </q-btn>
    <!-- <q-avatar> -->
    <!-- </q-avatar> -->
    <q-space />
    <div>
      <span v-if="authed">
        <q-btn
          class="subtitle-2"
          flat
          label="Home"
          no-caps
          :to="{ name: 'home' }"
        />
        <q-btn
          class="subtitle-2"
          flat
          label="Account"
          no-caps
          :to="{ name: 'account' }"
        />
        <q-btn
          class="subtitle-2"
          flat
          label="Log Out"
          no-caps
          @click="logout"
        />
      </span>
      <span v-else>
        <q-btn
          class="subtitle-2"
          flat
          label="Log In"
          no-caps
          :to="{ name: 'home' }"
        />
        <q-btn
          class="subtitle-2"
          flat
          label="Sign Up"
          no-caps
          :to="{ name: 'home', query: { register: true } }"
        />
      </span>
    </div>
  </q-toolbar>
</template>
<script>
import { defineComponent, ref } from "vue";
import { useAuthStore } from "src/stores/auth";

export default defineComponent({
  name: "NavBar",

  setup() {
    const store = useAuthStore();
    return {
      store,
    };
  },
  computed: {
    authed() {
      return this.store.auth;
    },
  },
  methods: {
    logout() {
      this.store.logout();
    },
  },
});
</script>
