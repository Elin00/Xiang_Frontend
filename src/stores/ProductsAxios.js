import { defineStore } from 'pinia'
import axios from 'axios';
import { reactive,ref,computed } from "vue";



export const useProductStore = defineStore('ProductsAxios', () => {
    const productPAndS = reactive([]);
    const productRoom = reactive([]);
    const markers = reactive([]);
    const cardinfo = reactive([]);
    const roominfo = reactive({
        roomId: 0,
        datePrice: "",
        hourPrice:"",
        image: "",
        openTime: "",
        ping: "",
        categoryname:"",
        iframe:"",
        categoryId: 0,
        productId: 0,
        
    })
    

    //建立class
    class PAndS {
        constructor(pName, sName, sImage, sOpenTime, sLatitude, sLongitude, sAddress, sDescription, rNum) {
            this.pName = pName;
            this.sName = sName;
            this.sImage = sImage;
            this.sOpenTime = sOpenTime;
            this.sLatitude = sLatitude;
            this.sLongitude = sLongitude;
            this.sAddress = sAddress;
            this.sDescription = sDescription;
            this.rNum = rNum;
        }
    }
    class Room {
        constructor(roomId, pName, sName, rCategoryId, rHourPrice, rDatePrice, rPing, rImage, rStatus, rDescription) {
            this.roomId = roomId
            this.pName = pName;
            this.sName = sName;
            this.rCategoryId = rCategoryId;
            this.rHourPrice = rHourPrice;
            this.rDatePrice = rDatePrice;
            this.rPing = rPing;
            this.rImage = rImage;
            this.rStatus = rStatus;
            this.rDescription = rDescription;
        }
    }
    //axios 取資料
    const axiosInit = async () => {
        try {
            const res = await axios.get("https://localhost:7073/api/Products");
            res.data.forEach((product, pidx) => {

                //抓PAndS資料
                product.psite.forEach((site, sidx) => {
                    const tpands = new PAndS(product.name, site.name, site.image, site.openTime, site.latitude, site.longitude, site.address, site.siteDescription, site.psiteRoom.length)
                    productPAndS.push(tpands);

                    //抓Room資料
                    site.psiteRoom.forEach((room, ridx) => {
                        const troom = new Room(room.roomId, product.name, site.name, room.categoryId, room.hourPrice, room.datePrice, room.ping, room.image, room.status, room.roomDescription);
                        productRoom.push(troom);
                    })
                })
            });

            // console.log(productPAndS);
            // console.log(productRoom);
            //加載資料到marker中
            productPAndS.forEach((pands) => {
                const marker = {
                    lat: parseFloat(pands.sLatitude),
                    lng: parseFloat(pands.sLongitude),
                    name: pands.sName,
                    description: pands.sDescription
                };
                markers.push(marker);
            });
            // console.log(markers);

            const path = "/src/assets/img/"
            // 加入資料到cardinfo
            productRoom.forEach((room) => {
                const carditem = {
                    icon: "touch_app",
                    title: room.sName,

                    image: path + room.rImage,
                    description: room.rDescription,
                    action: [
                        {
                            route: `/views/rentroomview/${room.roomId}`,
                            label: "現在就訂房",
                        },
                    ],
                }
                cardinfo.push(carditem)
            })
            // console.log(cardinfo)
        } catch (error) {
            console.log(error.message);
        }
    }
   
    //axios get{id} ${productId}
    const axiosKey = async (id) => {
        try {
            const { data } = await axios.get(`https://localhost:7073/api/PsiteRooms/${id}`)
            const product = data;
            // 抓Room資料
            // console.log(product)
            // console.log(product.image)
            roominfo.roomId = product.roomId
            roominfo.image = product.image
            roominfo.openTime = product.openTime
            roominfo.ping = product.ping
            roominfo.categoryId = product.categoryId
            roominfo.datePrice = product.datePrice
            roominfo.hourPrice = product.hourPrice
            roominfo.productId = product.productId
            roominfo.categoryname = product.categoryName
            roominfo.iframe = product.iframe
            console.log(roominfo)
        }
        catch (error) {
            console.log(error.message)
        }
    }
    return {
        axiosInit, axiosKey, productRoom, markers, cardinfo, roominfo
    }
});

