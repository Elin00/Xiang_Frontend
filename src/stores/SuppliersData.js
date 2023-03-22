import { defineStore } from 'pinia';
import { ref, reactive } from "vue";
import axios from "axios";
// import jwt_decode from "jwt-decode"; // 引入解碼JWT檔案的庫


export const useSuppliersDataStore = defineStore('SuppliersData', () => {
  const name = ref('');
  const SName = ref('')
  const phone = ref('');
  const email = ref('');
  const password = ref('');
  const address = ref('');
  const loggedIn = ref(false);
  //登入
  const SLogin = async () => {
    try {
      const response = await axios.post(
        "https://localhost:7073/api/TSuppliers",
        { email: email.value, password: password.value },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // 解碼JWT檔案
      // const decodedToken = jwt_decode(response.data);
      // 設置Email的值
      name.value = decodedToken.Name;
      loggedIn.value = true; // 登入成功

      localStorage.setItem(
        "SUser",
        JSON.stringify({
          token: response.data, // 存储 JWT
          name: decodedToken.Name,
        })
      );
      return true; // 登录成功
    }
    catch (error) {
      console.log(error);
      return false;
    }
  };
  //登出
  const SLogout = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("SUser")).token;
      const response = await axios.post(
        "https://localhost:7073/api/TSuppliers/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // 清除用戶資訊
      localStorage.removeItem("er");
      name.value = "";
      loggedIn.value = false;
    } catch (error) {
      console.log(error);
    }
  };
  const registerSupplier = reactive({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  });
  //註冊
  const SupplierRegister = async () => {
    try {
      const response = await axios.post('https://localhost:7073/api/TSuppliers/PostTSuppliers',

        {
          name: registerSupplier.name,
          phone: registerSupplier.phone,
          email: registerSupplier.email,
          password: registerSupplier.password,
          address: registerSupplier.address,
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response);
      return true;
    }
    catch (error) {
      console.log(error);
      return false;
    }

  }



  return { name, phone, email, password, SupplierRegister, SLogin, loggedIn, SLogout, registerSupplier, address };
});