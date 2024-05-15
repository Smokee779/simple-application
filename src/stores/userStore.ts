import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";
import { getUserInfo, loginUser } from "@/api/SignIn";

export const useUserStore = defineStore("user-store", () => {
  const user: Ref<IUser> = ref({
    login: "",
    role: "",
  } as IUser);
  const accesToken: Ref<string> = ref(getCookie("access_token") || "");

  const getUser = async () => {
    user.value = await getUserInfo(accesToken.value);
  };

  const signIn = async (name: string, password: string): Promise<boolean> => {
    accesToken.value = (await loginUser(name, password)).access_token;
    document.cookie = "access_token=" + accesToken.value;
    return !!accesToken.value;
  };

  return { user, accesToken, getUser, signIn };
});

export interface IUser {
  login: string;
  role: string;
}

const getCookie = (value: string): string | null => {
  return (
    (
      document.cookie.match(
        "(^|; )" + encodeURIComponent(value) + "=([^;]+)"
      ) || []
    ).pop() || null
  );
};
