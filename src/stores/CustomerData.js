import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import jwt_decode from "jwt-decode"; // 引入解碼JWT檔案的庫

export const useCustomerStore = defineStore("CustomerData", () => {
  const Email = ref("");
  const Name = ref("");
  const Password = ref("");
  const loggedIn = ref(false);
  const showModal = ref(false); // 新增的响应式变量

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
      loggedIn.value = true; // 登入成功
      showModal.value = true;
      localStorage.setItem("user", JSON.stringify({
        token: response.data, // 存储 JWT
        Name: decodedToken.Name
      }));
      const user = JSON.parse(localStorage.getItem("user")); // 定义 user 变量存储 localStorage 中的值
      console.log(user.token); // 打印 token 值
      console.log(user.Name); // 打印 Name 值
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      console.log(token);
      const response = await axios.post(
        "https://localhost:7073/api/Client/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      // 清除用戶資訊
      localStorage.removeItem("user");
      Name.value = "";
      loggedIn.value = false;

      console.log(Name);
      console.log(loggedIn);
    } catch (error) {
      console.log(error);
    }
  };

  return { Email, Password, Name, Login, loggedIn, showModal, logout };
});
