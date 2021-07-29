<template>
  <div class="container chatroom">
    <Navbar />
    <ChatWindow :isMessageSending="isMessageSending" />
    <NewChatForm @isMessageSending="isMessageSending = $event" />
  </div>
</template>

<script>
import { ref, watch } from "vue";
import Navbar from "../components/Navbar.vue";
import getUser from "../composables/getUser";
import { useRouter } from "vue-router";
import NewChatForm from "../components/NewChatForm.vue";
import ChatWindow from "../components/ChatWindow.vue";

export default {
  components: {
    Navbar,
    NewChatForm,
    ChatWindow,
  },
  setup() {
    const { user } = getUser();
    const router = useRouter();
    const isMessageSending = ref(false);

    watch(user, () => {
      if (!user.value) {
        router.push({ name: "Welcome" });
      }
    });

    return { isMessageSending };
  },
};
</script>

<style>
nav {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav p {
  margin: 2px auto;
  font-size: 16px;
  color: #444;
}

nav p.email {
  font-size: 14px;
  color: #999;
}
.container.chatroom {
  padding-bottom: 2px;
}
</style>
