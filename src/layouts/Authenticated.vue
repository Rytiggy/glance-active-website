<template>
  <q-layout view="lHh Lpr lFf">
    <NavBar />
    <!-- <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header> -->

    <!-- <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

    <q-page-container class="max-page-width">
      <router-view v-if="user" />
      <Auth v-else />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import Auth from "components/auth/Auth.vue";
import { useAuthStore } from "src/stores/auth";
import NavBar from "components/NavBar.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    Auth,
    NavBar,
  },

  setup() {
    const store = useAuthStore();
    return {
      store,
    };
  },
  computed: {
    user() {
      return this.store.auth;
    },
  },
});
</script>
