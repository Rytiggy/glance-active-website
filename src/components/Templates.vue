<template>
  <div class="row">
    <div
      v-for="(template, index) in templates"
      :key="index"
      flat
      bordered
      class="col-lg-3 col-md-3 col-sm-6 col-xs-12 text-dark q-pa-xs"
    >
      <q-card :style="`background: ${template.gray}`" class="list-item">
        <q-item :dark="true">
          <q-item-section avatar>
            <ThemeColors
              :primary="template['green']"
              :secondary="template['blue']"
              :tertiary="template['red']"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label
              :style="`color: ${template.white}`"
              class="text-bold text-h6"
            >
              {{ template.name.length > 0 ? template.name : "Untitled" }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator :style="`background: ${template.orange}`" :dark="true" />

        <!-- <q-responsive :ratio="16 / 9"> -->
        <!-- notice "border-radius-inherit" below; it's important when in a QCard -->
        <!-- <q-card-section
          class="border-radius-inherit flex flex-center bg-grey-2 q-pa-none"
        >
          <div
            class="template shadow"
            :style="templateBackgroundColor(template)"
          ></div>
        </q-card-section> -->
        <!-- </q-responsive> -->
        <q-card-actions align="around">
          <ManageTemplate v-if="editable" :templateId="index" />

          <q-btn
            v-if="store.templateId == index"
            label="Selected"
            disable
            flat
            :style="`color: ${template.orange}`"
          />
          <q-btn
            v-else
            @click="useTemplate(index)"
            label="Use"
            flat
            :style="`color: ${template.orange}`"
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useTemplatesStore } from "src/stores/templates";
import ManageTemplate from "./ManageTemplate.vue";
import ThemeColors from "./ThemeColors.vue";

export default defineComponent({
  name: "TemplatesComponent",
  props: ["templates", "selected", "editable"],
  components: {
    ManageTemplate,
    ThemeColors,
  },
  setup() {
    const store = useTemplatesStore();
    store.fetchTemplates();
    return {
      store,
    };
  },
  methods: {
    useTemplate(templateId) {
      this.store.setUsersTemplateId(templateId);
    },
    templateBackgroundColor(template) {
      var tempTemplate = JSON.parse(JSON.stringify(template));
      delete tempTemplate.name;
      let arrayTemplate = Object.values(tempTemplate);
      return `background: linear-gradient(270deg, ${arrayTemplate[0]} 14%, ${arrayTemplate[1]} 28%, ${arrayTemplate[2]} 42%, ${arrayTemplate[3]} 56%, ${arrayTemplate[4]} 70%, ${arrayTemplate[5]} 84%);`;
    },
  },
});
</script>
<style scoped>
.template {
  /* border-radius: 1rem; */
  height: 40px;
  /* width: 250px; */
  width: 100%;
  /* height: 100%; */
}
.shadow {
  box-shadow: 0 0 0.5rem 0.2rem rgba(0, 0, 0, 0.2);
}
</style>
