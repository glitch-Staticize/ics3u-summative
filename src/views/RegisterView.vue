<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { ref } from 'vue';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from 'vue-router';
import { useStore } from "../store"

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const router = useRouter();
const store = useStore();

async function registerByEmail() {
  try {
    const user = (await createUserWithEmailAndPassword(auth, email.value, password.value)).user;
    await updateProfile(user, { displayName: `${firstName.value} ${lastName.value}` });
    store.user = user;
    router.push("/movies/all");
  } catch (error) {
    console.log(error)
    alert("There was an error creating a user with email!");
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
  <div class="hero">
    <div class="overlay">
      <div class="navbar">
        <h2>Create an Account</h2>
        <a href="index.html" class="button login">Login</a>
      </div>
      <div class="form-container">
        <form @submit.prevent="registerByEmail()">
          <input v-model="firstName" type="text" placeholder="First Name" class="input-field" required>
          <input v-model="lastName" type="text" placeholder="Last Name" class="input-field" required>
          <input v-model="email" type="email" placeholder="Email" class="input-field" required>
          <input v-model="password" type="password" placeholder="Password" class="input-field" required>
          <input v-model="confirmPassword" type="password" placeholder="Confirm Password" class="input-field" required>
          <button type="submit" class="button register">Register</button>
        </form>
        <div>
          <button @click="registerByGoogle()" class="register">Register by Google</button>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  color: #000;
}

.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(to bottom right, #24b14a, #3d7b22);
  color: white;
  padding: 20px;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 15px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.navbar h2 {
  font-size: 24px;
  color: white;
}

.navbar .button {
  text-decoration: none;
  padding: 10px 20px;
  background-color: #24b14a;
  color: white;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.navbar .button:hover {
  background-color: #3d7b22;
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-container h2 {
  font-size: 26px;
  margin-bottom: 20px;
}

.input-field {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 2px solid #24b14a;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #3d7b22;
  outline: none;
}

.register {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  background-color: #24b14a;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.register:hover {
  background-color: #3d7b22;
}

.register:active {
  transform: scale(0.98);
}

@media (max-width: 768px) {
  .overlay {
    padding: 15px;
  }

  .input-field,
  .register {
    font-size: 14px;
  }

  .navbar h2 {
    font-size: 20px;
  }
}
</style>
