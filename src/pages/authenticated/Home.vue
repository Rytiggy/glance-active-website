<template>
  <q-page class="max-page-width" padding>
    <div class="text-h5">Free Themes</div>
    <Templates :templates="freeTemplates" :editable="false" />
    <div class="text-h5">Custom Themes</div>
    <Templates :templates="userTemplates" :editable="true" />
    <ManageTemplate />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import Templates from "components/Templates.vue";
import ManageTemplate from "src/components/ManageTemplate.vue";
import { useTemplatesStore } from "src/stores/templates";

export default defineComponent({
  name: "HomePage",

  components: {
    Templates,
    ManageTemplate,
  },
  setup() {
    const store = useTemplatesStore();

    store.fetchTemplates();
    store.fetchUserTemplates();
    store.fetchUsersTemplateId();

    return {
      store,
    };
  },
  computed: {
    freeTemplates() {
      return this.store.templates;
    },
    userTemplates() {
      return this.store.userTemplates;
    },
  },
});
</script>
