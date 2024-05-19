<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <div class="title-center">
        <img src="D:\SimpleApplication\simple-application\public\vertikalnyj-logo.png" alt="vertikalnyj-logo" height="110" width="202" class="title-center">
      </div>
        <ion-title> Simple Application</ion-title>
      </ion-toolbar>
      
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Simple Application</ion-title>
        </ion-toolbar>
      </ion-header>
      <div id="container" class="fl">
        <div v-if="role === 'admin'">
          <div
            v-for="(post, idx) in posts"
            :key="idx"
            style="background-color: "
          >
          <ion-card>
    <ion-card-header>
      <ion-card-title>Название: <b>{{ post.name }}</b></ion-card-title>
      <ion-card-subtitle>Статус: <b>{{ post.status }}</b></ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      Id: <b>{{ post.id }}</b>
      <div></div>
      Дата и время: <b>{{ post.createdAt }}</b>
      <div></div>
      Описание: <b>{{ post.description }}</b>
      <div></div>
      Адрес: <b>{{ post.location }}</b>
      <div></div>
      Тип: <b>{{ post.type }}</b>
      <div></div>
      userId: <b>{{ post.userId }}</b>
    </ion-card-content>
  </ion-card>
            
          </div>
        </div>
        <div class="Indentation" v-else>
          <ion-input
            type="text"
            placeholder="Id пользователя"
            v-model="currentPost.id"
          />
          <ion-input placeholder="Имя" v-model="currentPost.name" />
          <ion-input placeholder="Описание" v-model="currentPost.description" />
          <ion-select placeholder="Тип" v-model="currentPost.type">
            <ion-select-option value="Ремонт">Ремонт</ion-select-option>
            <ion-select-option value="Обслуживание">Обслуживание</ion-select-option
            >
          </ion-select>
          <ion-input placeholder="Место" v-model="currentPost.location" />
          <ion-button @click="sendPost">Отправить</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
userId?: number; name: string; description: string; type: string; status: "open"
| "close" | "inProcess"; location: string;
<script setup lang="ts">
import { IPost, addPost, getPosts } from "@/api/Posts";
import { useUserStore } from "@/stores/userStore";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonInfiniteScroll,
  IonFab, 
  IonFabButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle,
} from "@ionic/vue";
import { ComputedRef, Ref, computed, ref } from "vue";
import { onMounted } from "vue";
import { add } from 'ionicons/icons';

const store = useUserStore();
onMounted(async () => await store.getUser());

const posts: Ref<IPost[]> = ref([]);
const currentPost: Ref<IPost> = ref({
  userId: Number.NaN,
  name: "",
  description: "",
  type: "",
  location: "",
});

const role: ComputedRef<string> = computed(() => store.user.role);

onMounted(async () => {
  posts.value = await getPosts(store.accesToken);
});

const sendPost = async () => {
  console.log(currentPost.value);
  await addPost(currentPost.value, store.accesToken);
};
</script>

<style scoped>
.Indentation{
  margin-left: 10px;
}

.title-center{
  text-align: center;
  align-items: center;
  display:flex;
  align-items:center;
  justify-content: center;
}
#container {

  position: absolute;
  left: 0;
  right: 0;
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
}
</style>
