<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="navbar">
        <RouterLink to="/"><img id="logo" src="../images/Relicx Pure Logo (1).png"></RouterLink>
        <div class="nav-buttons">
            <RouterLink to="/register" class="button register">Register</RouterLink>
            <RouterLink to="/login" class="button login">Login</RouterLink>

        </div>
    </div>
</template>

<style scoped>
#logo {
    max-width: 12%;
}

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
}

.nav-buttons {
    display: flex;
    gap: 15px;
}

.nav-buttons .button {
    background-color: #3d7b22;
    color: white;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

.nav-buttons .button:hover {
    background-color: #24b14a;
    transform: scale(1.05);
}
</style>