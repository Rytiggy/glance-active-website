<template>
  <div>
    <div class="text-h5">Custom Templates</div>
    <Templates
      :templates="userTemplates"
      :allowEditing="true"
      @edit="editTemplate"
    />
    <ManageTemplate />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Dialog } from "quasar";
import { useTemplatesStore } from "src/stores/templates";

import ManageTemplate from "./ManageTemplate.vue";
import Templates from "./Templates.vue";

export default defineComponent({
  name: "CustomTemplates",
  components: {
    Templates,
    ManageTemplate,
  },
  setup() {
    let store = useTemplatesStore();
    store.getUserColors();

    return {
      store,
    };
  },
  computed: {
    userTemplates() {
      return this.store.userTemplates;
    },
  },
});
</script>
