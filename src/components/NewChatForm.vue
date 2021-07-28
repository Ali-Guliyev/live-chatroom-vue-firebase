<template>
  <form @submit.prevent="handleSubmit">
    <textarea
      maxlength="90"
      placeholder="Type a message and press enter to send..."
      v-model="message"
      @keydown.enter.prevent="handleSubmit"
    ></textarea>
    <button class="sendMessage">
      <img src="../assets/send.png" />
    </button>
    <div class="error"></div>
  </form>
</template>

<script>
import { ref } from "vue";
import getUser from "../composables/getUser";
import useCollection from "../composables/useCollection";
import { timestamp } from "../firebase/config";

export default {
  setup() {
    const message = ref("");
    const { user } = getUser();
    const { addDoc, error } = useCollection("messages");

    const handleSubmit = async () => {
      const chat = {
        message: message.value,
        name: user.value.displayName,
        createdAt: timestamp(),
      };

      await addDoc(chat);
      if (!error.value) {
        message.value = "";
      }
    };

    return { message, handleSubmit, error };
  },
};
</script>

<style scoped>
form {
  margin: 10px;
  display: flex;
}
textarea {
  width: 100%;
  max-width: 100%;
  margin-bottom: 6px;
  padding: 10px;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  font-family: inherit;
  outline: none;
  resize: none;
}

button.sendMessage img {
  width: 30px;
  height: 25px;
}

button.sendMessage img::selection {
  background: none;
}

button.sendMessage {
  padding: 10px 5px 10px 12px;
  border-radius: 50%;
  height: 100%;
}
</style>
