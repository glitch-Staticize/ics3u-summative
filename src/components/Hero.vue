<script setup></script>
<template>
    <div class="hero">
        <div class="overlay">
            <div class="hero-content">
                <h1>Relicx</h1>
                <h2>Watch Anywhere, Anytime.</h2>
                <p>Ready to watch? Enter your email to begin.</p>
                <input type="email" placeholder="Email address" class="email-input">
                <button class="button join">Get Started</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.hero {
    background-image: url('https://source.unsplash.com/random/1920x1080/?movie');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.overlay {
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #f0f0f0;
    padding: 20px;
}

.hero-content {
    text-align: center;
    margin-top: 80px;
}

.hero-content h1 {
    font-size: 6rem;
    color: #24b14a;
    margin-bottom: 20px;
    font-weight: bold;
}

.hero-content h2 {
    font-size: 3.5rem;
    color: #f0f0f0;
    margin-bottom: 20px;
    font-weight: bold;
}

.hero-content p {
    font-size: 1.2rem;
    color: #cccccc;
    margin-bottom: 30px;
    font-weight: bold;
}
</style>
