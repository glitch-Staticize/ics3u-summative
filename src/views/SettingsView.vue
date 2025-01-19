<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { useStore } from '../store';
import { auth } from "../firebase";
import { updateProfile } from "firebase/auth";
import { ref, onMounted } from 'vue';

const store = useStore();

const firstName = ref('');
const lastName = ref('');
const email = ref('');

let user = auth.currentUser;

onMounted(() => {
  const fullName = store.user.displayName.split(" ")
  firstName.value = fullName[0] || '';
  lastName.value = fullName[1] || '';
  email.value = store.user.email || '';
});

function saveChanges() {
  updateProfile(user, { displayName: `${firstName.value} ${lastName.value}` });
  alert('Changes saved');
}
</script>

<template>
  <Header />
  <div class="layout">
    <div class="settings-container">
      <div class="settings-input">
        <h1>Settings</h1>
        <div>
          <h2>First Name</h2>
          <input v-model="firstName" type="text" class="input-field" required />
        </div>
        <div>
          <h2>Last Name</h2>
          <input v-model="lastName" type="text" placeholder="Last Name" class="input-field" required />
        </div>
        <div>
          <h2>Email</h2>
          <input v-model="email" type="email" placeholder="Email" class="input-field" disabled />
        </div>
        <button class="btn btn-primary" @click="saveChanges">Save Changes</button>
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9f9f9;
  color: black;
}

.settings-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #3d7b22;
}

.settings-input {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  width: 100%;
}

.settings-input h2 {
  color: #3d7b22;
  font-size: 24px;
  margin-bottom: 20px;
}

.settings-input h4 {
  color: black;
  margin: 10px 0;
  font-size: 16px;
}

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #3d7b22;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 14px;
  color: black;
}

.input-field:disabled {
  background-color: #e0e0e0;
  color: #888;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary {
  background-color: #24b14a;
  color: white;
}

.btn-primary:hover {
  background-color: #3d7b22;
}

.btn-primary:active {
  background-color: black;
  color: white;
}
</style>
