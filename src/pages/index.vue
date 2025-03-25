<template>
<div>index</div>

<button @click="onLogout">Logout</button>

<div v-if="isAuth">

</div>
</template>

<script setup lang="ts">
  import { navigateTo } from "#app";
  import {useUserStore} from "~/store/user";

  const {isAuth, logout} = useUserStore();

  const onLogout = () => {
    logout();
  }


  watchEffect(() => {
    if (!isAuth.value) {

      navigateTo('/login');
    }
  });

</script>
