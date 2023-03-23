import { defineStore } from 'pinia'
import { reactive, ref } from "vue";
import axios from "axios";

export const useSuppliersDataStore = defineStore('SuppliersData', () => {
    const name = ref('');
    const phone = ref('');
    const email = ref('');
    const password = ref('');
    const siteAndRoom = reactive([]);
    const orderBySite = [];
    const currentSiteId = ref(null);
    const currentProductId = ref(3);
    const allCategory = reactive([]);

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
            orderBySite.splice(0);
            const res = await axios.get(`https://localhost:7073/api/Products/${currentProductId.value}`);
            res.data.psite.forEach(site => {
                siteAndRoom.push(site);
                orderBySite.push(`${site.siteId}`);
            });
            // console.log(siteAndRoom);
        }
        catch (error) {
            console.log(error)
        }
    }
    const getCategory = async () => {
        try {
            allCategory.splice(0);
            const res = await axios.get(`https://localhost:7073/api/PsiteRooms/Category`);
            res.data.forEach(category => {
                allCategory.push(category)
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    return { name, phone, email, password, siteAndRoom, currentSiteId, currentProductId, orderBySite, allCategory, SupplierRegister, getProduct, getCategory }
})