import { defineStore } from "pinia";
import { api } from "boot/axios";
import { LocalStorage } from "quasar";

export const firebaseConfig = {
  apiKey: "AIzaSyBdaaBnmWvXqWKcFXMerp_LiM8NIa0j_lA",
  authDomain: "glance-active-2022.firebaseapp.com",
  projectId: "glance-active-2022",
  storageBucket: "glance-active-2022.appspot.com",
  messagingSenderId: "63361466551",
  appId: "1:63361466551:web:e41fcc92d35cbe2f568d32",
  measurementId: "G-HX7ZWV6ZX1",
};

const AUTH_API = `https://identitytoolkit.googleapis.com/v1/accounts`;
const TOKEN_API = `https://securetoken.googleapis.com/v1/token`;

export const useAuthStore = defineStore("account", {
  state: () => ({
    counter: 0,
    auth: null,
  }),

  getters: {
    doubleCount(state) {
      return state.counter * 2;
    },
  },

  actions: {
    login(email, password) {
      let body = {
        email: email,
        password: password,
        returnSecureToken: true,
      };
      api
        .post(
          `${AUTH_API}:signInWithPassword?key=${firebaseConfig.apiKey}`,
          body
        )
        .then((response) => {
          LocalStorage.set("refresh-token", response.data.refreshToken);
          this.getAccessToken()
            .then((token) => console.log(token))
            .catch((err) => console.log(err));
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /**
     * gets the accessToken or shows the login page
     * @returns {Promise} - resolves with access token
     */
    getAccessToken() {
      let refreshToken = LocalStorage.getItem("refresh-token");
      return new Promise((resolve, reject) => {
        api({
          method: "post",
          url: `https://securetoken.googleapis.com/v1/token?key=AIzaSyBdaaBnmWvXqWKcFXMerp_LiM8NIa0j_lA`,
          data: `grant_type=refresh_token&refresh_token=${refreshToken}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        })
          .then((response) => {
            resolve(response.data.access_token);
            this.auth = response.data;
          })
          .catch((error) => {
            this.auth = null;
            reject(error);
          });
      });
    },

    logout() {
      LocalStorage.remove("refresh-token");
      this.auth = null;
    },
  },
});
