<template>
    <div class="login-page">
      <h1 class="heading">Chat With Buddy</h1>
      <div class="card">
        <div class="tabs">
          <button @click="activeTab = 'login'" :class="{ active: activeTab === 'login' }">Login</button>
          <button @click="activeTab = 'signup'" :class="{ active: activeTab === 'signup' }">Sign Up</button>
        </div>
        <form v-if="activeTab === 'login'" @submit.prevent="login" class="form">
          <div class="title">Login</div>
          <input placeholder="Username" type="text" v-model="username" />
          <input placeholder="Password" type="password" v-model="password" />
          <button type="submit">Login</button>
        </form>
        <form v-else @submit.prevent="signup" class="form">
          <div class="title">Sign Up</div>
          <input placeholder="Username" type="text" v-model="username" />
          <input placeholder="Password" type="password" v-model="password" />
          <input placeholder="Email" type="email" v-model="email" />
          <input placeholder="First name" type="text" v-model="first_name" />
          <input placeholder="Last name" type="text" v-model="last_name" />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { loginRest, signupRest } from "./api";
  
  export default {
    data() {
      return {
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
        activeTab: "login",
      };
    },
    methods: {
      login() {
        loginRest(this.username, this.password)
          .then((response) =>
            this.$emit("onAuth", { ...response.data, secret: this.password })
          )
          .catch((error) => console.log("Login error", error));
      },
      signup() {
        signupRest(
          this.username,
          this.password,
          this.email,
          this.first_name,
          this.last_name
        )
          .then((response) =>
            this.$emit("onAuth", { ...response.data, secret: this.password })
          )
          .catch((error) => console.log("Sign up error", error));
      },
    },
  };
  </script>
  
  <style scoped>
  .login-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    font-family: 'Arial', sans-serif;
  }
  
  .heading {
    position: absolute;
    top: 100px;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: #ffffff;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }
  
  .card {
    background: rgba(255, 255, 255, 0.9);
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    animation: fadeIn 1s ease-in-out, float 6s ease-in-out infinite;
    width: 100%;
    max-width: 400px;
    text-align: center;
  }
  
  .tabs {
    display: flex;
    margin-bottom: 20px;
  }
  
  .tabs button {
    flex: 1;
    background: none;
    border: none;
    padding: 10px;
    font-size: 1rem;
    color: #666;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .tabs button.active {
    color: #667eea;
    border-bottom: 2px solid #667eea;
  }
  
  .title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #333;
    font-weight: bold;
  }
  
  .form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
  }
  
  input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
  }
  
  button[type="submit"] {
    width: 100%;
    padding: 12px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  button[type="submit"]:hover {
    background: #764ba2;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 600px) {
    .heading {
      font-size: 2rem;
    }
    
    .card {
      padding: 1.5rem;
    }
    
    .title {
      font-size: 1.5rem;
    }
    
    input, button[type="submit"] {
      padding: 10px;
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  </style>
