import { defineStore } from 'pinia'
import { reactive, ref } from "vue";
import axios from "axios";


export const useSuppliersDataStore = defineStore('SuppliersData', () => {
    const name = ref('');
    const phone = ref('');
    const email = ref('');
    const password = ref('');
    const siteAndRoom = reactive([]);
    const path = '../../../assets/img/PSite'


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

    const getProduct = async () => {
        try {
            const res = await axios.get('https://localhost:7073/api/Products/3');
            res.data.psite.forEach(site => {
                site.image = path + site.image
                siteAndRoom.push(site)
            });
        }
        catch (error) {
            console.log(error)
        }
    }
    return { name, phone, email, password, siteAndRoom, SupplierRegister, getProduct }
})