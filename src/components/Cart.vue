<script setup>
import { computed } from 'vue';
import { useRouter, RouterView } from 'vue-router';
import { useStore } from '../store';

const store = useStore();
const router = useRouter();

const currentUserFirstName = computed(() => {
  const userAccount = store.accounts.get(store.currentUserEmail);
  return userAccount ? userAccount.firstName : '';
});
</script>

<template>
  <header class="header">
    <h1>{{ `Hello ${currentUserFirstName}!` }}</h1>
    <button @click="router.push(`/cart`)" class="logout-button">Cart</button>
    <button @click="router.push(`/`)" class="logout-button">Logout</button>
    <button @click="router.push(`/settings`)" class="logout-button">Settings</button>
  </header>
</template>

<style scoped>
.header {
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2%;
  margin-left: 10px;
  margin-right: 10px;
}

.header h1 {
  font-size: 30px;
  margin: 0;
}

.logout-button {
  background-color: #3d7b22;
  /* Dark Green */
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #24b14a;
  /* Green color on hover */
}
</style>