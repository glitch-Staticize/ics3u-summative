<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';

const response = ref(null);

function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

onMounted(async () => {
    const movieData = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}`);
    response.value = movieData.data.results;
})
</script>

<template>
    <h1>
        Featured Movies
    </h1>
    <div class="flexbox-container">
        <div v-if="response" class="movie-list">
            <div v-for="movie in shuffleArray(response).slice(0, 5)" :key="movie.id" class="flexbox-item"
                @click="getMovieDetails(movie.id)">
                <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster" />
                <p class="movie-title">{{ movie.title }}</p>
            </div>
        </div>
    </div>
    <div class="movie-gallery"> 
    </div>
</template>

<style scoped>
.flexbox-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    min-height: 100vh;
    padding: 20px;
    background-color: #000;
}

h1 {
    font-size: 3.5rem;
    text-align: center;
    margin: 0;
    color: #24b14a;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
}

.movie-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 0;
}

.flexbox-item {
    flex: 0 1 225px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: #3d7b22;
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
}

.flexbox-item:hover {
    transform: translateY(-10px);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.7);
}

.flexbox-item img {
    width: 100%;
    height: auto;
    max-height: 350px;
    object-fit: cover;
    border-bottom: 5px solid #24b14a;
}

.movie-title {
    margin-top: 10px;
    font-size: 1rem;
    color: #ffffff;
    font-weight: bold;
    padding: 10px 0;
    background-color: #24b14a;
    width: 100%;
}
</style>