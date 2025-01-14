<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useStore } from '../store';
import Header from '../components/Header.vue'

const store = useStore('');
const email = ref('');
const password = ref('');
const router = useRouter('');

const handleLogin = () => {
  if (email.value === store.email && password.value === store.password) {
    router.push("/movies");
  } else {
    alert('Login incorrect :(');
  }
};
</script>

<template>
  <Header />
  <div class="hero">
    <div class="overlay">
      <div class="navbar">
        <div class="form-container">
          <h2>Login to Your Account</h2>
          <form @submit.prevent="handleLogin">
            <input v-model="email" type="email" placeholder="Email" class="input-field" required />
            <input v-model="password" type="password" placeholder="Password" class="input-field" required />
            <button type="submit" class="button login">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero {
  background-image: url('https://source.unsplash.com/random/1920x1080/?movie');
  background-size: cover;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-family: 'Arial', sans-serif;
}

.overlay {
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 20px;
}

.navbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.navbar .register {
  background-color: #3d7b22;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.navbar .register:hover {
  background-color: #24b14a;
  transform: scale(1.05);
}

.form-container {
  text-align: center;
  margin-top: 50px;
}

.form-container h2 {
  font-size: 2rem;
  margin-bottom: 20px;
  color: #24b14a;
}

.input-field {
  padding: 15px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid #3d7b22;
  margin-bottom: 15px;
  background-color: white;
  color: black;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input-field:focus {
  border-color: #24b14a;
  box-shadow: 0 0 8px rgba(36, 177, 74, 0.8);
  outline: none;
}

.login {
  background-color: #3d7b22;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.login:hover {
  background-color: #24b14a;
  transform: scale(1.05);
}

@media (max-width: 600px) {
  .input-field {
    width: 90%;
  }

  .navbar h1 {
    font-size: 1.5rem;
  }
}
</style>