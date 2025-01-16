import { ref } from "vue";
import { defineStore } from "pinia";

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
  }; 
});