import { reactive, ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import jwt_decode from "jwt-decode"; // 引入解碼JWT檔案的庫

export const useCustomerStore = defineStore("CustomerData", () => {
  const id = ref("")
  const Email = ref("");
  const Name = ref("");
  const Phone = ref("");
  const Password = ref("");
  const loggedIn = ref(false);

  //登入
  const Login = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7073/api/Client",
        { Email: Email.value, Password: Password.value },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // 解碼JWT檔案
      const decodedToken = jwt_decode(response.data);
      // 設置Email的值
      Name.value = decodedToken.Name;
      id.value = decodedToken.sub;
      loggedIn.value = true; // 登入成功

      localStorage.setItem(
        "user",
        JSON.stringify({
          token: response.data, // 存储 JWT
          id: decodedToken.sub,
          Name: decodedToken.Name,
        })
      );
      return true; // 登录成功
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  //登出
  const logout = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      const response = await axios.post(
        "https://localhost:7073/api/Client/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // 清除用戶資訊
      localStorage.removeItem("user");
      Name.value = "";
      loggedIn.value = false;
      window.location.href = 'http://localhost:3000/'
    } catch (error) {
      console.log(error);
    }
  };
  const registerCustomer = reactive({
    Name: "",
    Email: "",
    Phone: "",
    Password: "",
  });
  //註冊
  const register = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7073/api/Client/Register",
        {
          Name: registerCustomer.Name,
          Email: registerCustomer.Email,
          Phone: registerCustomer.Phone,
          Password: registerCustomer.Password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const token = computed(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      return user.token;
    } else {
      return null;
    }
  });

  return {
    Email, id,
    Password,
    Name,
    Phone,
    Login,
    token,
    loggedIn,
    logout,
    register, registerCustomer
  };
});
