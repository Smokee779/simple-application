//const API_STR = "https://simple-application-api-production.up.railway.app";
const API_STR = "http://localhost:3000/";

export const loginUser = async (
  login: string,
  password: string
): Promise<{ access_token: string }> => {
  const raw = await fetch(API_STR + "login", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login,
      password,
    }),
  });
  const data = (await raw.json()) as { access_token: string };
  console.log(data);
  return data;
};

export const getCurrentUserLogin = async (
  accesToken: string
): Promise<string> => {
  console.log(1, accesToken);
  const token = "Bearer " + accesToken;
  const raw = await fetch(API_STR + "login", {
    method: "GET",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      authorization: token,
    },
  });
  const data: { username: string } = await raw.json();
  return data.username;
};
