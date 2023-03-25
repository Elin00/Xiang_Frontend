import { reactive } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useSuppliersDataStore } from "../stores/SuppliersData.js"

export const useEditSuppliersStore = defineStore("EditSuppliersData", () => {
    const SuppliersData = useSuppliersDataStore();
    const SUser = reactive({
        // id: "",
        name: "",
        phone: "",
        email: "",
        address: "",
    });

    const EditSuppliers = async () => {
        try {
            const response = await axios.get(`https://localhost:7073/api/TSuppliers/id?id=${SuppliersData.id}`, {
                headers: {
                    'Authorization': `Bearer ${SuppliersData.token}`,
                },
            });
            console.log(response);
            console.log(response.data);
            Object.assign(SUser, response.data);
            SUser.name = response.data.name;
            SUser.phone = response.data.phone;
            SUser.email = response.data.email;
            console.log(SUser.name, SUser.phone, SUser.email);
        } catch (error) {
            console.log(error);
        }
    }
    return { EditSuppliers, SUser }
})
