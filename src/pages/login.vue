<template>
  <div>Login</div>

  <form @submit.prevent="onLoginUser">
    <label for="email">
      <input type="email" id="email" name="email" placeholder="Email" required v-model="email"/>
    </label><br>
    <label for="password">
      <input type="password" id="password" name="password" placeholder="Password" required v-model="password"/>
    </label><br>
    <button type="submit"
    >Login</button>
  </form>
</template>

<script setup lang="ts">
  import { navigateTo } from "#app";
  import {fetchUser, postNewUser} from "~/server/users";
  import type {UserType} from "~/types/user";
  import {useUserStore} from "~/store/user";

  const email = ref('');
  const password = ref('');

  const {login} = useUserStore();

  const onLoginUser = async () => {

    try {
      const isValidUser = await fetchUser(email.value, password.value);

      if (isValidUser) {
        //store
        login(isValidUser);

        navigateTo('/');

      } else {

        const user: UserType = {
          name: '',
          surname: '',
          credentials: {
            username: email.value,
            passphrase: password.value,
          },
          active: true,
          created: Date.now(),
          _comment: `login ${email.value}`,
        }


        await postNewUser(user);
        //store
        login(user);

        navigateTo('/');
      }
    } catch (e) {
      //ошибка в пароле
      console.log(e)
    }

  }

</script>
