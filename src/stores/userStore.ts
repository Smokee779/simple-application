import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";
import { getCurrentUserLogin, loginUser } from "@/api/SignIn";

export const useUserStore = defineStore("user-store", () => {
  const user: Ref<IUser> = ref({
    login: "",
    role: "",
  } as IUser);
  const accesToken: Ref<string> = ref(getCookie("access_token"));

  const getUserName = async () => {
    user.value.login = await getCurrentUserLogin(accesToken.value);
  };

  const signIn = async (name: string, password: string) => {
    accesToken.value = (await loginUser(name, password)).access_token;
    document.cookie = "access_token=" + accesToken.value;
  };

  return { user, accesToken, getUserName, signIn };
});

interface IUser {
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
