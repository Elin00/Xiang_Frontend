import { defineStore } from 'pinia';
import { ref, reactive, computed } from "vue";
import axios from "axios";
// import jwt_decode from "jwt-decode"; // 引入解碼JWT檔案的庫

export const useSuppliersDataStore = defineStore('SuppliersData', () => {
    const id = ref("");
    const name = ref("");
    const phone = ref("");
    const email = ref("");
    const password = ref("");
    const address = ref("");
    const loggedIn = ref(false);
    const siteAndRoom = reactive([]);
    const allCategory = reactive([]);
    const currentSiteId = ref(null);
    const currentProductId = ref(3);
    const orderBySite = [];
    const registerSupplier = reactive({
        name: "",
        email: "",
        phone: "",
        password: "",
        address: "",
    });

    //function
    //登入
    const SLogin = async () => {
        try {
            const response = await axios.post(
                "https://localhost:7073/api/TSuppliers",
                { email: email.value, password: password.value },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            // 解碼JWT檔案
            const decodedToken = jwt_decode(response.data);
            // 設置Email的值
            name.value = decodedToken.Name;
            id.value = decodedToken.sub;
            loggedIn.value = true; // 登入成功

            localStorage.setItem(
                "SUser",
                JSON.stringify({
                    token: response.data, // 存储 JWT
                    name: decodedToken.Name,
                    id: decodedToken.sub,
                })
            );
            console.log(name.value);
            return true; // 登录成功
        } catch (error) {
            console.log(error);
            return false;
        }
    };
    //登出
    const SLogout = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("SUser")).token;
            const response = await axios.post(
                "https://localhost:7073/api/TSuppliers/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // 清除用戶資訊
            localStorage.removeItem("SUser");
            name.value = "";
            loggedIn.value = false;
            window.location.href = 'http://localhost:3000/'

        } catch (error) {
            console.log(error);
        }
    };

    //註冊
    const SupplierRegister = async () => {
        try {
            console.log(registerSupplier);
            const response = await axios.post('https://localhost:7073/api/TSuppliers',
                {
                    name: registerSupplier.name,
                    phone: registerSupplier.phone,
                    email: registerSupplier.email,
                    password: registerSupplier.password,
                    address: registerSupplier.address,
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            //console.log(response);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }

    };
    const token = computed(() => {
        const SUser = JSON.parse(localStorage.getItem("SUser"));
        if (SUser) {
            return SUser.token;
        } else {
            return null;
        }
    });

    //產品相關
    const getProduct = async () => {
        try {
            siteAndRoom.splice(0);
            orderBySite.splice(0);
            const res = await axios.get(`https://localhost:7073/api/Products/${currentProductId.value}`);
            res.data.psite.forEach(site => {
                siteAndRoom.push(site);
                orderBySite.push(site.siteId.toString());
            });
            // console.log('siteAndRoom', siteAndRoom);
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


    return { name, phone, email, password, address, id, loggedIn, registerSupplier, token, siteAndRoom, currentSiteId, currentProductId, orderBySite, allCategory, SupplierRegister, SLogin, SLogout, getProduct, getCategory };
});
