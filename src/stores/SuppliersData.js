import { defineStore } from 'pinia'
import { ref } from "vue";
import axios from "axios";


export const useSuppliersDataStore = defineStore('SuppliersData', () => {
    const name = ref('');
    const phone = ref('');
    const email = ref('');
    const password = ref('');

    const SupplierRegister = async () => {
        try {
            const response =
                await axios.post('https://localhost:7073/api/TSuppliers', { name: name.value, phone: phone.value, email: email.value, password: password.value }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
        }
        catch (error) {
            console.log(error)
        }

    }



    return { name, phone, email, password, SupplierRegister }
})