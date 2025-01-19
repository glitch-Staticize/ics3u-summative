<script setup>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import { useStore } from '../store';

const store = useStore();

function removeFromCart(movie) {
    store.cart.delete(movie);
    localStorage.setItem(
        `cart_${store.user.email}`,
        JSON.stringify(Object.fromEntries(store.cart))
    );
}

function checkout() {
    store.cart.clear()
    localStorage.setItem(
        `cart_${store.user.email}`,
        JSON.stringify(Object.fromEntries(store.cart))
    )
    alert("Purchase Successful!")
}
</script>

<template>
<Header />
  <div class="cart">
    <h1>Shopping Cart</h1>
    <div class="item" v-for="([key, value]) in store.cart">
      <img :src="`https://image.tmdb.org/t/p/w500${value.title.url}`" />
      <h1>{{ value.title.title }}</h1>
      <button @click="removeFromCart(key)">Remove</button>
    </div>
    <button class="btn btn-success" @click="checkout">Checkout</button>
  </div>
<Footer />
</template>

<style scoped>
.cart {
    margin-top: 80px;
    padding: 20px;
    background-color: #000000;
    color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.cart h1 {
    font-size: 40px;
    margin-bottom: 20px;
    color: #24b14a;
    font-weight: bold;
}

.item {
    display: flex;
    background-color: white;
    color: black;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 15px;
    margin: 10px 0;
    width: 100%;
    max-width: 600px;
    transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.item:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.item img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 15px;
}

.item h1 {
    flex: 1;
    font-size: 20px;
    margin: 0;
}

.item button {
    background-color: #24b14a;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out, transform 0.2s ease;
}

.item button:hover {
    background-color: #3d7b22;
}

.item button:active {
    background-color: black;
    transform: scale(0.95);
}
</style>
