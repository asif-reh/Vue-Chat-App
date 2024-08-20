import axios from "axios";

const loginRest = async (username: string, secret: any) => {
  return await axios.get("https://api.chatengine.io/users/me/", {
    headers: {
      "Project-ID": import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID,
      "User-Name": username,
      "User-Secret": secret,
    },
  });
};

const signupRest = async (username: string, secret: any, email: string) => {
  const first_name = ""; // Declare the variable first_name
  const last_name = ""; // Declare the variable last_name
  return await axios.post(
    "https://api.chatengine.io/users/",
    { username, secret, email, first_name, last_name },
    { headers: { "Private-Key": import.meta.env.VITE_CHAT_ENGINE_PRIVATE_KEY } }
  );
};

export { loginRest, signupRest };