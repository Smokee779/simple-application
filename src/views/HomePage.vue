<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Simple Application</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Simple Application</ion-title>
        </ion-toolbar>
      </ion-header>
      <div id="container" class="fl">Ваш логин: {{ name }}</div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { computed } from "vue";
import { onMounted } from "vue";

const store = useUserStore();
onMounted(async () => await store.getUserName());

const name = computed<string>(() => {
  return store.user.login;
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}

.fl {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
