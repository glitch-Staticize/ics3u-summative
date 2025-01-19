<script setup>
import { computed } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { signOut } from 'firebase/auth';
import { useStore } from '../store';
import { auth } from '../firebase';

const route = useRoute();
const router = useRouter();
const store = useStore();

let currentUserEmail = store.user?.email || '';

const current = computed(() => route.path);
const movieRoute = computed(() => route.name === "movie" || route.path.startsWith('/movies/'));

const currentUserFirstName = computed(() => {
    const userAccount = currentUserEmail;
    const fullName = store.user.displayName.split(" ")
    console.log(currentUserEmail)
    return userAccount ? fullName[0] : '';
});

const logout = () => {
  store.user = null;
  signOut(auth);
  router.push(`/`);
}
</script>

<template>
    <div class="navbar">
        <RouterLink v-if="currentUserEmail === ''" to="/"><img id="logo" src="../images/Relicx Pure Logo (1).png"></RouterLink>
        <RouterLink v-if="currentUserEmail != ''" to="/movies"><img id="logo" src="../images/Relicx Pure Logo (1).png"></RouterLink>
        <RouterLink v-if="current === '/register' || current === '/'" to="/login" class="right">Sign In</RouterLink>
        <RouterLink v-if="current === '/login' || current === '/'" to="/register" class="right">Register</RouterLink>
        <RouterLink v-if="movieRoute || current === '/settings' || current === '/movies'" to="/cart" class="right">Cart</RouterLink>
        <RouterLink v-if="movieRoute || current === '/cart' || current === '/movies'" to="/settings" class="right">Settings</RouterLink>
        <RouterLink v-if="movieRoute || current === '/settings' || current === '/cart' || current === '/movies'" @click.prevent="logout" to="/" class="right">Logout</RouterLink>
        <h2 v-if="currentUserEmail != ''"> Welcome, {{ currentUserFirstName }}! </h2>
    </div>
</template>

<style scoped>
.navbar {
    position: absolute;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0));
    z-index: 100;
    color: white;
    font-family: Arial, sans-serif;
}

/* Logo */
#logo {
    height: 50px;
    cursor: pointer;
    transition: transform 0.2s ease-in-out;
    margin-right: 0%;
}

#logo:hover {
    transform: scale(1.1);
}

/* Navigation Links */
.navbar .right {
    color: white;
    font-weight: bold;
    text-decoration: none;
    padding: 10px 15px;
    border-radius: 5px;
    background-color: transparent;
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
}

.navbar .right:hover {
    background-color: #24b14a;
    color: black;
    transform: scale(1.1);
}

/* Active States */
.navbar .right:active {
    background-color: black;
    color: white;
    transform: scale(0.98);
}

/* Responsive Design */
@media (max-width: 768px) {
    .navbar {
        padding: 15px;
    }

    #logo {
        height: 40px;
    }

    .navbar .right {
        font-size: 0.9rem;
        padding: 8px 12px;
    }
}
</style>