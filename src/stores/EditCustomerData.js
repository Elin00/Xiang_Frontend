import { reactive } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useCustomerStore } from "../stores/CustomerData.js"


export const useEditCustomerStore = defineStore("EditCustomerData", () => {
    const CustomerData = useCustomerStore();  //引用customerData
    const user = reactive({
        name: "",
        phone: '',
        email: ''
      })
    
    const EditCustomerres = async () => {
        try {
          const response = await axios.get(`https://localhost:7073/api/Client/id?id=${CustomerData.id}`,
            {
              headers: {
                'Authorization': `Bearer ${CustomerData.token}`,
              },
            })
          Object.assign(user, response, { name: "new-obj物件" })
        //   console.log(user.data);
        //   console.log("name", user.data.name);
          user.name = user.data.name,
            user.phone = user.data.phone,
            user.email = user.data.email
        //   console.log(user.name, user.phone, user.email);
        } catch (error) {
          console.log(error);
        }
      }
    return { EditCustomerres, user }
})