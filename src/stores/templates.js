import { defineStore } from "pinia";
import { api } from "boot/axios";
import { useAuthStore } from "src/stores/auth";
const API_URL = `https://glance-active-2022-default-rtdb.firebaseio.com/`;

export const useTemplatesStore = defineStore("templates", {
  state: () => ({
    // colors: null,
    templateId: null,
    templates: null,
    userTemplates: null,
  }),

  getters: {
    getSelectedTemplate: (state) => {
      if (state.templates) {
        var template = state.templates[state.templateId];
        if (!template) {
          template = state.userTemplates[state?.templateId];
        }
        return template;
      }
      return null;
    },
    getTemplateById: (state) => (templateId) => {
      let template = state.templates?.[templateId];
      if (!template) {
        template = state.userTemplates?.[templateId];
      }
      if (template) {
        return template;
      }
      return {};
    },
  },

  actions: {
    /**
     * Fetch the free templates
     * @sets {Array} templates
     */
    async fetchTemplates() {
      const store = useAuthStore();
      let accessToken = await store.getAccessToken();
      api
        .get(`${API_URL}templates.json?auth=${accessToken}`)
        .then((response) => {
          this.templates = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /**
     * Fetch the user's templates
     * @sets {Array} templates
     */
    async fetchUserTemplates() {
      const store = useAuthStore();
      let accessToken = await store.getAccessToken();
      api
        .get(
          `${API_URL}users/${store.auth.user_id}/templates.json?auth=${accessToken}`
        )
        .then((response) => {
          this.userTemplates = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async fetchUsersTemplateId() {
      const store = useAuthStore();
      let accessToken = await store.getAccessToken();
      let url = `${API_URL}users/${store.auth.user_id}/customizations/template_id.json?auth=${accessToken}`;
      api
        .get(url)
        .then((response) => {
          this.templateId = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async setUsersTemplateId(templateId) {
      const store = useAuthStore();
      let accessToken = await store.getAccessToken();
      var url = `${API_URL}users/${store.auth.user_id}/customizations.json?auth=${accessToken}`;
      var data = {
        template_id: templateId,
      };
      api
        .put(url, data)
        .then((response) => {
          this.templateId = response.data.template_id;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async createUserTemplate(template) {
      const store = useAuthStore();
      let accessToken = await store.getAccessToken();

      api({
        method: "post",
        url: `${API_URL}users/${store.auth.user_id}/templates.json?auth=${accessToken}`,
        data: template,
      })
        .then((response) => {
          console.log(response);
          this.fetchUserTemplates();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async updateUserTemplate(templateId, template) {
      const store = useAuthStore();
      let accessToken = await store.getAccessToken();
      api({
        method: "put",
        url: `${API_URL}users/${store.auth.user_id}/templates/${templateId}.json?auth=${accessToken}`,
        data: template,
      })
        .then((response) => {
          console.log(response);
          this.fetchUserTemplates();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async deleteUserTemplate(templateId) {
      const store = useAuthStore();
      let accessToken = await store.getAccessToken();
      api({
        method: "delete",
        url: `${API_URL}users/${store.auth.user_id}/templates/${templateId}.json?auth=${accessToken}`,
      })
        .then((response) => {
          console.log(response);
          this.fetchUserTemplates();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
