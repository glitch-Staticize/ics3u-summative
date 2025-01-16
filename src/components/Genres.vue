<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { useStore } from '../store';

const router = useRouter();
const store = useStore();
const selectedGenre = ref(28);
const response = ref(null);
const props = defineProps(["genres"]);

const genres = [
  {
    id: 28,
    genreName: "Action"
  },
  {
    id: 16,
    genreName: "Animation"
  },
  {
    id: 10752,
    genreName: "War"
  },
  {
    id: 878,
    genreName: "Sci-Fi"
  },
  {
    id: 36,
    genreName: "History"
  },
]

async function getMovieByGenre() {
  response.value = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${selectedGenre.value}`);
}

function getMovieDetails(id) {
  router.push(`/movies/${id}`)
}

onMounted(async () => {
  console.log(store.get.value)
  response.value = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&with_genres=${selectedGenre.value}`);
})
</script>

<template>
  <div class="movie-gallery">
    <select v-model="selectedGenre" @change="getMovieByGenre()">
      <option v-for="genre of genres" :value="genre.id">{{ genre.genreName }}</option>
    </select>
    <div v-if="response" class="movie-list">
      <div v-for="movie in response.data.results" :key="movie.id" class="movie-card">
        <div @click="getMovieDetails(movie.id)">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Movie Poster" class="movie-poster" />
          <p class="movie-title">{{ movie.title }}</p>
        </div>
        <button v-if='!store.cart.has(movie.id)'
          @click="store.addToCart(movie.id, { title: movie.title, url: movie.poster_path })" class="buy">
          Buy
        </button>
        <button v-else class='buy'>
          Added
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-gallery {
  margin-top: 40px;
  padding: 20px;
  color: white;
  background-color: black;
  font-family: 'Arial', sans-serif;
}

.movie-gallery h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5rem;
  color: #24b14a;
}

.movie-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.movie-card {
  background-color: #3d7b22;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  width: 200px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}

.movie-card:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
}

.movie-poster {
  width: 100%;
  height: auto;
  border-bottom: 3px solid #24b14a;
}

.movie-title {
  padding: 10px;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
}

select {
  background-color: #3d7b22;
  color: white;
  padding: 10px;
  border: 2px solid #24b14a;
  border-radius: 5px;
  font-size: 1rem;
  width: 200px;
  margin: 15px 0;
  transition: border-color 0.2s;
}

select:focus {
  border-color: white;
  outline: none;
}

select option {
  background-color: #3d7b22;
  color: white;
}

.buy {
  background-color: #24b14a;
  color: white;
  border: none;
  padding: 8px 15px;
  margin: 10px;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.buy:hover {
  background-color: #3d7b22;
  transform: scale(1.05);
}

.buy:active {
  transform: scale(1);
}
</style>
