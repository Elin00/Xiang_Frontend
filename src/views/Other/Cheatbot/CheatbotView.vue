<script setup>
  import { ref, reactive } from 'vue';
  import axios from 'axios';
  
  const userMessage = ref('');
  const messages = reactive([]);
  const isChatWindowOpen = ref(false);
  
  const toggleChatWindow = () => {
    isChatWindowOpen.value = !isChatWindowOpen.value;
  };
  
  const submitMessage = async () => {
    if (userMessage.value.trim() === '') return;
  
    messages.push({ sender: 'user', text: userMessage.value });
  
    try {
      const response = await axios.post('https://localhost:7073/getanswer', {
        Text: userMessage.value,
      });
  
      messages.push({ sender: 'ai', text: response.data });
    } catch (error) {
      console.error(error);
      messages.push({ sender: 'ai', text: 'Sorry, I am unable to process your request at the moment.' });
    } finally {
      userMessage.value = '';
    }
  };
  </script>
<template>
    <div class="chatbot">
        <div class="chatbot-toggle" @click="toggleChatWindow">
      <i class="material-icons">chat</i>
    </div>
      <div v-show="isChatWindowOpen" class="chatbot-window">
        <div class="messages">
          <div v-for="(message, index) in messages" :key="index" :class="['message', message.sender]">
            {{ message.text }}
          </div>
        </div>
        <form @submit.prevent="submitMessage">
          <input type="text" v-model="userMessage" placeholder="Type your message..." />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  </template>
  
  
  
  <style scoped>
  .chatbot {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 100;
  }
  
  .chatbot-toggle {
  background-color: #2196f3;
  color: white;
  padding: 10px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.material-icons {
  font-size: 1.5rem;
}
  .chatbot-window {
    width: 300px;
    height: 500px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
  }
  
  .messages {
    height: calc(100% - 60px);
    overflow-y: auto;
    padding: 10px;
  }
  
  .message {
    margin-bottom: 10px;
  }
  
  .message.user {
    text-align: right;
  }
  
  .message.ai {
    text-align: left;
  }
  
  form {
    display: flex;
    padding: 10px;
    border-top: 1px solid #ccc;
  }
  
  input {
    flex-grow: 1;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 6px 12px;
  }
  
  button {
    background-color: #2196f3;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 6px 12px;
    margin-left: 10px;
    cursor: pointer;
  }
  </style>