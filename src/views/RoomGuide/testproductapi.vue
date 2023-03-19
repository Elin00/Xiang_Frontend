<script setup>
import { reactive, onMounted } from 'vue';
import axios from 'axios';

</script>
<template>
    <div>
      <ul>
        <li v-for="product in products" :key="product.productId">
          {{ product.name }}
        </li>
      </ul>
    </div>
  </template>
  
 
 <script>
  export default {
    name: 'ProductList',
    setup() {
      const state = reactive({
        products: []
      });
  
      onMounted(() => {
        axios.get('https://localhost:7073/api/Products')
          .then(response => {
            state.products = response.data;
          })
          .catch(error => {
            console.log(error);
          });
      });
  
      return { state };
    }
  }
</script>