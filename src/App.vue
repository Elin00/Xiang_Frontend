<script setup>

import { RouterView } from "vue-router";
import NavbarDefault from "../src/examples/navbars/NavbarDefault.vue";
import DefaultFooter from "../src/examples/footers/FooterDefault.vue";
import LoginRegisterWindowModal from "../src/views/Other/LoginRegisterWindow/LoginRegisterWindowModal.vue";
import CheatbotView from "../src/views/Other/Cheatbot/CheatbotView.vue";
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
  <CheatbotView />
</template>
