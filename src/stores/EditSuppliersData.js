import { reactive } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useSuppliersStore } from "../stores/SuppliersData.js"


export const useEditSuppliersStore = defineStore("EditSuppliersData", () => {
    const SuppliersData = useSuppliersStore();
    const user = reactive({
        name: "",
        phone: '',
        email: '',
        address: '',
    })

    const EditSuppliers = async () => {
        try {
            const response = await axios.get(`https://localhost:7073/api/Suppliers/id?id=${SuppliersData.id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${SuppliersData.token}`,
                    },
                })
            Object.assign(SUser, response, { name: "new-obj物件" })
            //   console.log(user.data);
            //   console.log("name", user.data.name);
            SUser.name = SUser.data.name,
                SUser.phone = SUser.data.phone,
                SUser.email = SUser.data.email
            console.log(SUser.name, SUser.phone, SUser.email);
        } catch (error) {
            console.log(error);
        }
    }
    return { EditSuppliers, SUser }
})