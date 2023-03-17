import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import jwt_decode from 'jwt-decode' // 引入解碼JWT檔案的庫

export const useCustomerStore = defineStore("CustomerData",()=>{
    const Email = ref('')
    const Name = ref('')
    const Password = ref('')
    const loggedIn = ref(false)
    
      const Login = async () => {
        try 
        {
          const response = 
          await axios.post('https://localhost:7073/api/Client',  { Email: Email.value, Password: Password.value }, {
            headers: {
              'Content-Type': 'application/json'
            }
          }) 
           // 解碼JWT檔案
           const decodedToken = jwt_decode(response.data)
           console.log(decodedToken);
           // 設置Email的值
           Name.value = decodedToken.Name // 假設Email資訊在JWT檔案中的key是email
           loggedIn.value = true // 登入成功

        } catch (error) {
          console.log(error)
        }
      }
      return { Email, Password,Name, Login,loggedIn}
}) 