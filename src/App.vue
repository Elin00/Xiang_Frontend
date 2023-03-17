<script setup>
/*
=========================================================
* Vue Material Kit 2 - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vue-material-kit
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { RouterView } from "vue-router";
import NavbarDefault from "../src/examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../src/examples/footers/FooterDefault.vue";
import LoginRegisterWindowModal from "../src/views/Other/LoginRegisterWindow/LoginRegisterWindowModal.vue";
import { createStore } from 'vuex';

function useStore() {
  const store = createStore({
    state() {
      return {
        user: null
      };
    },
    mutations: {
      setUser(state, payload) {
        state.user = payload;
      }
    }
  });

  return {
    store
  };
}
</script>

<template>
  <div class="container-fluid position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <NavbarDefault :sticky="true" class="mb-4" />
      </div>
    </div>
  </div>
  <router-view />
  <DefaultFooter />
  <LoginRegisterWindowModal />
</template>