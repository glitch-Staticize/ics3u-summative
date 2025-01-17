import { ref } from "vue";
import { defineStore } from "pinia";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const useStore = defineStore('store', () => {
  const cart = ref(new Map());
  const currentUserEmail = ref('');
  const accounts = ref(new Map());

  const setRegistrationData = (data) => {
    const userAccount = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    };
    accounts.value.set(data.email, userAccount);
  };

  function addToCart(id, movieData) {
    cart.value.set(id, movieData);
  }

  function removeFromCart(id) {
    cart.value.delete(id);
  }

  
  return {
    cart,
    currentUserEmail,
    accounts,
    addToCart,
    removeFromCart,
    setRegistrationData,
    user,
  }; 
});

export const userAuthorized = new Promise((resolve, reject) => {
  onAuthStateChanged(auth, user => {
    try {
      const store = useStore();
      store.user = user;
      const storedCart = localStorage.getItem(`cart_${store.user.email}`);

      store.cart = storedCart ? new Map(Object.entries(JSON.parse(storedCart))) : new Map();
      resolve();
    } catch (error) {
      reject();
    }
  })
})