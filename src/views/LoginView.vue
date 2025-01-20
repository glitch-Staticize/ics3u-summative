<script setup>
import Header from '../components/Header.vue';
import Footer from '../components/Footer.vue';
import { RouterLink, useRouter } from 'vue-router';
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { ref } from 'vue';
import { useStore } from "../store/index";

const store = useStore();
const router = useRouter();
const email = ref('');
const password = ref('');

const loginByEmail = async () => {
  try {
    console.log(email.value)
    const user = (await signInWithEmailAndPassword(auth, email.value, password.value)).user;
    store.user = user;
    router.push("/movies");
  } catch (error) {
    console.log(error);
    alert("There was an error signing in with email!");
  }
};

const loginByGoogle = async () => {
  try {
    const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
    store.user = user;
    router.push("/movies");
  } catch (error) {
    alert("There was an error signing in with Google!");
  }
};
</script>

<template>
  <Header />
  <div class="hero">
    <div class="overlay">
      <div class="form-container">
        <h2>Login to Your Account</h2>
        <form @submit.prevent="loginByEmail()">
          <div class="form-group">
            <input v-model:="email" type="email" placeholder="Email" class="input-field" required />
          </div>
          <div class="form-group">
            <input v-model:="password" type="password" placeholder="Password" class="input-field" required />
          </div>
          <button type="submit" class="button login">Login</button>
          <button @click="loginByGoogle()" type="submit" class="button login">Login by Google</button>
        </form>
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
  background: url('https://source.unsplash.com/random/1920x1080/?movie') no-repeat center center;
  background-size: cover;
  position: relative;
  color: white;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.85);
  padding: 30px;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-container {
  width: 100%;
}

.form-container h2 {
  font-size: 26px;
  margin-bottom: 20px;
  color: #24b14a;
  text-align: center;
}

.input-field {
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  border: 2px solid #24b14a;
  margin-bottom: 20px;
  font-size: 16px;
  background-color: white;
  color: black;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input-field:focus {
  border-color: #3d7b22;
  box-shadow: 0 0 8px rgba(36, 177, 74, 0.8);
  outline: none;
}

.button {
  display: block;
  width: 100%;
  padding: 15px;
  margin-top: 15px;
  background-color: #3d7b22;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.button:hover {
  background-color: #24b14a;
  transform: scale(1.05);
}

.button:active {
  background-color: black;
  transform: scale(0.98);
}

@media (max-width: 600px) {
  .overlay {
    padding: 20px;
  }

  .form-container h2 {
    font-size: 22px;
  }

  .input-field {
    padding: 12px;
    font-size: 14px;
  }

  .button {
    font-size: 16px;
  }
}
</style>