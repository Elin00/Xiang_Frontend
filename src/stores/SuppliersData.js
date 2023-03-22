import { defineStore } from 'pinia'
import { reactive, ref } from "vue";
import axios from "axios";


export const useSuppliersDataStore = defineStore('SuppliersData', () => {
    const name = ref('');
    const phone = ref('');
    const email = ref('');
    const password = ref('');
    const siteAndRoom = reactive([]);
    const orderBy = [];
    const currentSiteId = ref(null);
    const currentProductId = ref(3);

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
            siteAndRoom.splice(0);
            orderBy.splice(0);
            const res = await axios.get(`https://localhost:7073/api/Products/${currentProductId.value}`);
            res.data.psite.forEach(site => {
                siteAndRoom.push(site);
                orderBy.push(`${site.siteId}`);
            });
            // console.log(siteAndRoom);
        }
        catch (error) {
            console.log(error)
        }
    }

    return { name, phone, email, password, siteAndRoom, currentSiteId, currentProductId, orderBy, SupplierRegister, getProduct }
})