import { reactive, ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import jwt_decode from "jwt-decode"; // 引入解碼JWT檔案的庫
import { googleTokenLogin } from 'vue3-google-login'
import { useModalStore } from "../stores/ModalData.js"


export const useCustomerStore = defineStore("CustomerData", () => {
  const ModalData = useModalStore();  //引用modalData
  const id = ref("")
  const Email = ref("");
  const Name = ref("");
  const Phone = ref("");
  const Password = ref("");
  const loggedIn = ref(false);

  //登入
  // const Login = async () => {
  //   try {
  //     const response = await axios.post(
  //       "https://localhost:7073/api/Client",
  //       { Email: Email.value, Password: Password.value },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     // 解碼JWT檔案
  //     const decodedToken = jwt_decode(response.data);
  //     // 設置Email的值
  //     Name.value = decodedToken.Name;
  //     id.value = decodedToken.sub;
  //     loggedIn.value = true; // 登入成功

  //     localStorage.setItem(
  //       "user",
  //       JSON.stringify({
  //         token: response.data, // 存储 JWT
  //         id: decodedToken.sub,
  //         Name: decodedToken.Name,
  //       })
  //     );
  //     return true; // 登录成功
  //   } catch (error) {
  //     console.log(error);
  //     return false;
  //   }
  // };
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
      localStorage.removeItem('myCoupons');
      localStorage.removeItem('usedCoupons');
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
      ModalData.RegisterModalHide();
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

  

  //google登入 目前可以拿到google的access_token
  const GOOGLE_CLIENT_ID = '791286941146-n77r23cg1g2is104lbldn5f2qdjidvja.apps.googleusercontent.com'
  const data = ref()
  //   const handleGoogleAccessTokenLogin = async () => {
  //     try {
  //       const response = await googleTokenLogin({ clientId: GOOGLE_CLIENT_ID });
  //       console.log(response);
  //       data.value = response;
  //       console.log(data.value);

  //       try {
  //         const apiResponse = await axios.post("https://localhost:7073/api/Google", {
  //             accessToken: data.value.access_token,
  //           },{
  //             headers: {
  //               'Content-Type': 'application/json',
  //             },
  //           });
  //         console.log("API response:", apiResponse);
  //       } catch (apiError) {
  //         console.error("API error:", apiError);
  //       }
  //     } catch (googleLoginError) {
  //       console.error("Google login error:", googleLoginError);
  //     }
  //   };
  // Google 登入
  const handleGoogleAccessTokenLogin = async () => {
    try {
      const response = await googleTokenLogin({ clientId: GOOGLE_CLIENT_ID });
      data.value = response;

      const apiResponse = await axios.post("https://localhost:7073/api/Google", {
        accessToken: data.value.access_token,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      handleLoginResponse(apiResponse);
      ModalData.LoginModalHide();

    } catch (googleLoginError) {
      console.error("Google login error:", googleLoginError);
    }
  };

  // 把登入資料在拿過來做解析的方法（通用）
  const handleLoginResponse = async (response) => {
    try {
      const decodedToken = jwt_decode(response.data);
      Name.value = decodedToken.Name;
      id.value = decodedToken.sub;
      loggedIn.value = true; // 登入成功

      localStorage.setItem(
        "user",
        JSON.stringify({
          token: response.data, // 存儲 JWT
          id: decodedToken.sub,
          Name: decodedToken.Name,
        })
      );
    } catch (error) {
      console.error("Error handling login response:", error);
    }
  };

  // 一般登入
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
      handleLoginResponse(response); // 使用共用的處理登入回應函數
      ModalData.LoginModalHide();

    } catch (error) {
      console.error("Login error:", error);
    }
  };
  // 當 Facebook SDK 載入完成後，會自動呼叫 window.fbAsyncInit
  const FacebookOnmouned = () => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '635289395101701',
        cookie: true,
        xfbml: true,
        version: 'v12.0'
      });
    };
    window.fbAsyncInit();
  }

  const checkLoginState = () => {
    return new Promise((resolve, reject) => {
      FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          resolve(response.authResponse.accessToken);
        } else {
          reject('User not logged in.');
        }
      });
    });
  };
  
  const loginWithFacebook = () => {
    return new Promise((resolve, reject) => {
      FB.login(
        (response) => {
          if (response.authResponse) {
            resolve(response.authResponse.accessToken);
          } else {
            reject('Failed to log in with Facebook.');
          }
        },
        { scope: 'email' }
      );
    });
  };
  
  async function facebookLogin() {
    try {
      let accessToken;
      try {
        accessToken = await checkLoginState();
      } catch (error) {
        console.log('User not logged in, trying to log in with Facebook...');
        accessToken = await loginWithFacebook();
      }
  
      console.log('Facebook access token:', accessToken);
      await sendFacebookAccessTokenToBackend(accessToken);
    } catch (error) {
      console.error('Error during Facebook login:', error);
    }
  }
  
  async function sendFacebookAccessTokenToBackend(accessToken) {
    try {
      const response = await axios.post('https://localhost:7073/api/Google/FacebookLogin',
        {
          accessToken: accessToken,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });
      console.log('Response from backend:', response.data);
    }
    catch (error) {
      console.error('Error sending Facebook access token to backend:', error);
    }
  }

  return {
    Email, id,
    Password,
    Name,
    Phone,
    Login,
    token,
    loggedIn,
    logout,
    register, registerCustomer, handleGoogleAccessTokenLogin,sendFacebookAccessTokenToBackend,
    FacebookOnmouned, loginWithFacebook
  };
});
