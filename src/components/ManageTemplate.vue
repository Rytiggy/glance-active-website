<template>
  <q-btn
    color="primary"
    :label="isEditing ? 'Edit' : 'Create New Template'"
    flat
    @click="openDialog = true"
    v-bind:class="{ 'q-mt-md': !isEditing }"
  />
  <q-dialog v-model="openDialog">
    <q-card v-if="template" :dark="true">
      <q-card-section class="row items-center q-pb-none">
        <q-btn icon="close" flat round dense v-close-popup />
        <div class="subtitle">Manage Theme</div>
        <q-space />
        <q-btn
          icon="delete"
          flat
          round
          dense
          v-close-popup
          @click="deleteTemplate"
        />
      </q-card-section>
      <q-card-section class="row q-pb-none">
        <q-input
          class="col"
          :dark="true"
          filled
          label="Title"
          v-model="templateName"
        />
      </q-card-section>
      <q-card-section class="row items-center q-pb-none flex-center">
        <q-avatar
          class="q-ma-sm"
          v-bind:class="{ 'selected-color': selectedColor == templateKey }"
          size="65px"
          v-for="(templateKey, index) in getTemplateColors(template)"
          :key="index"
          :style="`background: ${template[templateKey]}`"
          @click="selectColor(templateKey)"
        >
        </q-avatar>
      </q-card-section>

      <div class="row flex-center">
        <q-separator
          inset
          size="3px"
          :style="`background: ${template[selectedColor]}; width:30px`"
        />
        <div class="text-h6">{{ userFrendlyKeys(selectedColor) }} Colors</div>
        <q-separator
          inset
          size="3px"
          :style="`background: ${template[selectedColor]}; width:30px`"
        />
      </div>
      <q-card-section class="q-pt-sm">
        <div class="row flex-center">
          <q-color
            no-header
            no-footer
            flat
            name="accent_color"
            v-model="template[selectedColor]"
          />
        </div>
      </q-card-section>
      <q-card-section class="row">
        <q-btn
          v-if="isEditing"
          color="primary"
          label="Update Theme"
          class="text-black q-py-md col"
          icon="save"
          v-close-popup
          @click="update()"
        />
        <q-btn
          v-else
          color="primary"
          label="Create Theme"
          class="text-black q-py-md col"
          v-close-popup
          icon="save"
          @click="create()"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { ref } from "vue";
import { useTemplatesStore } from "src/stores/templates";

export default {
  // Pass in a template if you want to edit it
  props: ["templateId"],
  setup(props) {
    const store = useTemplatesStore();
    const template = ref({
      name: "",
      blue: "#3be9e6",
      gray: "#303030",
      green: "#a3fa00",
      orange: "#fb9411",
      red: "#fb114f",
      white: "#ffffff",
    });
    const isEditing = props.templateId ? true : false;
    if (isEditing) {
      template.value = JSON.parse(
        JSON.stringify(store.getTemplateById(props.templateId))
      );
    }
    const templateName = ref(template.value.name);
    const editColor = ref("");
    const openDialog = ref(false);
    // text is the first one in the list
    const selectedColor = ref("white");

    function create() {
      template.value.name = templateName.value;
      let temp = JSON.parse(JSON.stringify(template.value));
      store.createUserTemplate(temp);
    }

    function update() {
      template.value.name = templateName.value;
      let temp = JSON.parse(JSON.stringify(template.value));
      store.updateUserTemplate(props.templateId, temp);
    }

    function deleteTemplate() {
      store.deleteUserTemplate(props.templateId);
    }
    function userFrendlyKeys(templateColor) {
      const keyMap = {
        blue: "Secondary",
        gray: "Dark",
        green: "Primary",
        orange: "Accent",
        red: "Tertiary",
        white: "Text",
      };
      return keyMap[templateColor];
    }

    function getTemplateColors(t) {
      // Remove the name from the colors
      delete t["name"];
      return Object.keys(t).reverse();
    }

    function showColorPicker(color) {
      editColor.value = color;
    }

    function selectColor(colorKey) {
      selectedColor.value = colorKey;
    }

    return {
      store,
      props,
      template,
      templateName,
      isEditing,
      editColor,
      openDialog,
      selectedColor,
      create,
      update,
      deleteTemplate,
      userFrendlyKeys,
      getTemplateColors,
      showColorPicker,
      selectColor,
    };
  },
};
</script>

<style scoped>
.selected-color {
  outline: 2px solid #bbb;
  border: 4px solid #1d1d1d;
}
.q-color-picker {
  width: 100%;
}
</style>
