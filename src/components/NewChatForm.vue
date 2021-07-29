<template>
  <form @submit.prevent="handleSubmit">
    <textarea
      :maxlength="messageLimit"
      placeholder="Type a message and press enter to send..."
      v-model="message"
      @keydown.enter.prevent="handleSubmit"
    ></textarea>

    <button class="sendMessage">
      <img src="../assets/send.png" />
    </button>
  </form>
  <div class="messageWarningContainer">
    <div class="icon warning" v-if="message.length >= messageLimit">
      Reached the limit of characters
    </div>
    <div class="icon warning" v-if="onlySpacesInMessage">
      Please enter the text to send
    </div>
    <div class="icon error" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { ref } from "vue";
import getUser from "../composables/getUser";
import useCollection from "../composables/useCollection";
import { timestamp } from "../firebase/config";

export default {
  setup(props, context) {
    const message = ref("");
    const { user } = getUser();
    const { addDoc, error } = useCollection("messages");
    const messageLimit = ref(90);
    const onlySpacesInMessage = ref(false);

    const handleSubmit = async () => {
      const chat = {
        message: message.value,
        name: user.value.displayName,
        createdAt: timestamp(),
      };

      // Check if there are not spaces in message input
      if (message.value.replace(/\s/g, "").length) {
        context.emit("isMessageSending", true);
        await addDoc(chat).then(() => {
          context.emit("isMessageSending", false);
        });

        onlySpacesInMessage.value = false;
      } else {
        onlySpacesInMessage.value = true;
      }

      if (!error.value) {
        message.value = "";
      }
    };

    return {
      message,
      handleSubmit,
      error,
      messageLimit,
      onlySpacesInMessage,
    };
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
}

.messageWarningContainer {
  margin-left: 20px;
}

.messageWarningContainer .warning {
  margin-bottom: 10px;
}

.messageWarningContainer .error {
  margin-bottom: 20px;
}
</style>
