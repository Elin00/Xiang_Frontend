import { reactive } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import { useSuppliersDataStore } from "../stores/SuppliersData.js"

export const useEditSuppliersStore = defineStore("EditSuppliersData", () => {
    const storeSuppliersData = useSuppliersDataStore();
    const SUser = reactive({
        // id: "",
        name: "",
        phone: "",
        email: "",
        address: "",
    });

    const getSuppliers = async () => {
        try {
            const response = await axios.get(`https://localhost:7073/api/TSuppliers/${storeSuppliersData.id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${storeSuppliersData.token}`,
                    },
                })
            // Object.assign(SUser, response.data);
            console.log('response.data', response.data);
            storeSuppliersData.name = response.data.name;
            storeSuppliersData.address = response.data.address;
            storeSuppliersData.email = response.data.email;
            storeSuppliersData.phone = response.data.phone;
        } catch (error) {
            console.log(error);
        }
    }
    return { getSuppliers, SUser }
})
