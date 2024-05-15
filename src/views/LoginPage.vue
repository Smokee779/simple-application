<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button></ion-back-button>
        </ion-buttons>
        <ion-title>Вход</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Вход</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container" class="fl">
        <ion-input placeholder="Логин" v-model="login"></ion-input>
        <ion-input
          type="password"
          placeholder="Пароль"
          v-model="password"
        ></ion-input>
        <ion-button @click="signIn()">Войти</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
  IonButtons,
  IonBackButton,
} from "@ionic/vue";
import { ref } from "vue";
import { useUserStore } from "../stores/userStore";
import { useIonRouter } from "@ionic/vue";

const login = ref("");
const password = ref("");

const store = useUserStore();
const router = useIonRouter();

const signIn = async () => {
  const result = await store.signIn(login.value, password.value);
  if (result) router.push("/home");
};
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
