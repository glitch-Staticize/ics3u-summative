<script setup>
import { useStore } from "../store"
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Footer from '../components/Footer.vue'

import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";

const router = useRouter();
const store = useStore();

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');


const validateForm = (event) => {
  event.preventDefault();
  if (password.value !== confirmPassword.value) {
    alert('The passwords do not match. Please check and try again.');
  } else {
    store.setRegistrationData({
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      password: password.value,
    });
    store.currentUserEmail = email.value
    router.push('/movies')
  }
}
async function registerByGoogle() {
  try {
    const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
    store.user = user;
    router.push("/movies");
  } catch (error) {
    alert("There was an error creating a user with Google!");
  }
}
</script>

<template>
  <Header />
  <div class="form-container">
    <h2>Create an Account</h2>
    <form @submit="validateForm">
      <input type="text" placeholder="First Name" class="input-field" v-model="firstName" required />
      <input type="text" placeholder="Last Name" class="input-field" v-model="lastName" required />
      <input type="email" placeholder="Email" class="input-field" v-model="email" required />
      <input type="password" placeholder="Password" class="input-field" v-model="password" required />
      <input type="password" placeholder="Confrim Password" class="input-field" v-model="confirmPassword" required />
      <button type="submit" class="register">Register</button>
    </form>
    <div>
      <button @click="registerByGoogle()" class="register">Register by Google</button>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  color: black;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background-color: #6f7e69;
  min-height: 100vh;
  color: white;
}

.form-container h2 {
  font-size: 28px;
  margin-bottom: 20px;
  color: white;
}

.input-field {
  width: 100%;
  max-width: 400px;
  padding: 12px 15px;
  margin-bottom: 15px;
  border: 2px solid #24b14a;
  border-radius: 5px;
  font-size: 16px;
  color: black;
}

.input-field:focus {
  border-color: #3d7b22;
  outline: none;
}

.register {
  width: 100%;
  max-width: 400px;
  padding: 12px 15px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background-color: #24b14a;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, transform 0.2s ease;
}

.register:hover {
  background-color: #3d7b22;
}

.register:active {
  background-color: black;
  color: white;
  transform: scale(0.98);
}

@media (max-width: 768px) {

  .input-field,
  .register {
    font-size: 14px;
  }
}
</style>
