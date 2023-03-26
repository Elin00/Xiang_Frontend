<script setup>
import axios from "axios";
import datepickerDesign from "../RoomGuide/datepickerDailyrentalDesign.vue";
import datepickerDesign2 from "../RoomGuide/datepickerhourlyrentalDesign.vue";
import Evaluation from "../Suppliers/ProductsmessageView.vue"
import { ref, onMounted, watchEffect, reactive, computed } from "vue";
import { Navigation, Pagination, Autoplay, EffectCube } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cube";
// import photo1 from "../../assets/img/4.jpg";
import photo2 from "../../assets/img/5.jpg";
import photo3 from "../../assets/img/6.jpg";
import photo4 from "../../assets/img/7.jpg";

import { useEvaluationDataStore } from '../../stores/EvaluationData.js';
import { useProductStore } from "../../stores/ProductsAxios.js"
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';


const evaluationStore = useEvaluationDataStore();
const Productspinia = useProductStore();

const store = useStore();



//取得房間資訊
const route = useRoute();
const roomId = ref(route.params.id);
//iframe url取得
const mapUrl = ref('');
const iframeSrc = computed(() => mapUrl.value);

watchEffect(() => {
  if (Productspinia.roominfo.iframe) {
    mapUrl.value = Productspinia.roominfo.iframe;
  }
});


const getRoomInfo = async () => {
  try {
    const response = await store.dispatch('fetchRoomInfo', roomId.value);
    room.value = response.data;
  } catch (error) {
    console.log(error);
  }
};
//設備資訊
const devices = ref([
  [
    { icon: "flutter_dash", name: "白板", description: "150*90cm/附白板筆、板擦" },
    { icon: "add_box", name: "投影機", description: "附投影機遙控器" },
    { icon: "movie_filter", name: "布幕", description: "200*200cm" },
    { icon: "local_printshop", name: "印表機", description: "黑白A4尺寸/每張5元" },
    { icon: "mouse", name: "滑鼠", description: "USB接口" },
    { icon: "keyboard", name: "鍵盤", description: "USB接口" },
  ],
  [
    { icon: "local_drink", name: "飲水機", description: "熱/冰水皆可" },
    { icon: "speaker_notes", name: "會議桌", description: "附白板筆、板擦" },
    { icon: "add_box", name: "投影機", description: "附投影機遙控器" },
    { icon: "computer", name: "電腦", description: "i7/8G/27吋螢幕" },
    { icon: "keyboard", name: "鍵盤", description: "USB接口" },
    { icon: "mouse", name: "滑鼠", description: "USB接口" },
  ],
  [
    { icon: "local_drink", name: "飲水機", description: "熱/冰水皆可" },
    { icon: "brush", name: "畫架", description: "附畫板和畫筆" },
    { icon: "lightbulb", name: "燈具", description: "可調節亮度" },
    { icon: "photo_camera", name: "照相機", description: "單反相機/50mm鏡頭" },
    { icon: "local_printshop", name: "印表機", description: "黑白A4尺寸/每張5元" },
    { icon: "palette", name: "調色盤", description: "附調色板和調色劑" },
  ],
  [
    { icon: "music_note", name: "音響", description: "可播放CD和MP3" },
    { icon: "mic", name: "麥克風", description: "可調式有線麥克風" },
    { icon: "videocam", name: "攝影機", description: "高清攝影機/附三腳架" },
    { icon: "movie_filter", name: "投影機", description: "附投影機遙控器" },
    { icon: "photo_camera", name: "照相機", description: "附三腳架和快門遙控器" },
    { icon: "art_track", name: "展示架", description: "4層展示架" },
  ],
  [
    { icon: "local_dining", name: "烤箱", description: "30L" },
    { icon: "kitchen", name: "洗碗機", description: "附洗碗機乾燥劑" },
    { icon: "kitchen", name: "冰箱", description: "200L" },
    { icon: "microwave", name: "微波爐", description: "20L" },
    { icon: "local_drink", name: "飲水機", description: "可冷熱" },
    { icon: "local_cafe", name: "咖啡機", description: "自動研磨咖啡機" },
  ],
])
const categoryId = ref(0)
//將圖片資料註傳入這裡
const swiperPoperty = {
  Title: "",
  Address: "",
  img: "",
}
const pingSet = reactive({
  ping: "",
})

const swiperTextBase = [

  { Title: "這是第二間房", Address: "高雄市內湖區", img: photo2 },
  swiperPoperty,
  { Title: "這是第三間房", Address: "高雄市內湖區", img: photo3 },
  { Title: "這是第四間房", Address: "高雄市內湖區", img: photo4 },
];
const path = `/src/assets/img/`

const view = ref(1);
const changview = (Index) => {
  view.value = Index;
};
const modules = [EffectCube, Autoplay, Pagination, Navigation];
const showModal = ref(false);

//天數計算
const startDate = ref("");
const endDate = ref("");
const handleValuesUpdate = ({ value1, value2 }) => {
  startDate.value = value1;
  endDate.value = value2;
};
const dateDifference = computed(() => {
  if (!startDate.value || !endDate.value) {
    return 0;
  }

  const start = new Date(startDate.value);
  const end = new Date(endDate.value);
  const diffInMilliseconds = end.getTime() - start.getTime();
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);


  return Math.ceil(diffInDays);
});
const totalcost = computed(() => {
  if (!startDate.value || !endDate.value) {
    return 0;
  }
  const price = parseInt(Productspinia.roominfo.datePrice)
  if (isNaN(price)) {
    console.error("無法解析 Productspinia.roominfo.datePrice 的值為整數");
    return "無法解析";
  }
  const total = price * parseInt(dateDifference.value, 10);

  return total
})

//送出訂單
const user = JSON.parse(localStorage.getItem('user'));
const userid = ref(user ? user.id : null);

//日租版
const submitBooking = async () => {
  // 確保所有需要的數據都可用
  if (!startDate.value || !endDate.value || !totalcost.value) {
    alert('請確保所有必填信息都已填寫。');
    return;
  }

  // 在送出訂單之前彈出確定購買的提示
  const confirmed = window.confirm('確定要購買嗎？');
  if (!confirmed) {
    return;
  }

  //日期設定
  const endDate1 = new Date(endDate.value);
  endDate1.setHours(20);
  endDate1.setMinutes(0);
  endDate1.setSeconds(0);
  endDate1.setMilliseconds(0);
  const startDate1 = new Date(startDate.value)
  startDate1.setHours(8);
  startDate1.setMinutes(0);
  startDate1.setSeconds(0);
  startDate1.setMilliseconds(0);
  // 組裝要發送的數據
  const bookingData = {
    customerId: parseInt(userid.value),
    productId: parseInt(Productspinia.roominfo.productId),
    orderDate: new Date().toISOString(),
    startDate: new Date(startDate1).toISOString(),
    endDate: endDate1.toISOString(),
    roomId: parseInt(Productspinia.roominfo.roomId),
    price: parseInt(totalcost.value),
    itemName: Productspinia.roominfo.categoryname,
  };
  const jsonbd = JSON.stringify(bookingData)
  console.log(jsonbd)
  try {
    // 發送 POST 請求
    const response = await axios.post('https://localhost:7073/api/Orders/payform', bookingData, {
      headers: {
        'Content-Type': 'application/json'
      },
      // body: jsonbd
    });
    console.log(response);
    if (response.status === 200) {
      // 請求成功，處理響應（如導航到其他頁面、顯示消息等）
      document.getElementById('divContent').innerHTML = response.data;
      document.getElementById('payForm').submit();
    } else {
      // 請求失敗，處理錯誤
      const errorData = await response.json();
      alert(`預訂失敗：${errorData.message}`);
    }
  } catch (error) {
    // 網絡錯誤或其他問題，處理異常
    alert(`預訂過程中出現錯誤：${error.message}`);
  }
};
//計算時數
const ChooseDate = ref("");
const StartHour = ref("");
const EndHour = ref("");
const handleValuesUpdateHours = ({ value1, value2, value3 }) => {
  ChooseDate.value = value1;
  StartHour.value = value2;
  EndHour.value = value3;
};
const hourDifference = computed(() => {
  if (!StartHour.value || !EndHour.value) {
    return 0;
  }

  const startHoursMinutes = StartHour.value.split(':');
  const endHoursMinutes = EndHour.value.split(':');

  const startDate = new Date(ChooseDate.value);
  startDate.setHours(parseInt(startHoursMinutes[0]), parseInt(startHoursMinutes[1]));

  const endDate = new Date(ChooseDate.value);
  endDate.setHours(parseInt(endHoursMinutes[0]), parseInt(endHoursMinutes[1]));

  const diffInMilliseconds = endDate.getTime() - startDate.getTime();
  const diffInHours = diffInMilliseconds / (1000 * 60 * 60);

  return diffInHours;
});
const totalcostforhour = computed(() => {
  if (!ChooseDate || !StartHour.value || !EndHour.value) {
    return 0;
  }
  const price = parseInt(Productspinia.roominfo.hourPrice)
  if (isNaN(price)) {
    console.error("無法解析 Productspinia.roominfo.datePrice 的值為整數");
    return 0;
  }
  const total = price * parseFloat(hourDifference.value)

  return total
})
//時租版
const submitBookingHour = async () => {
  // 確保所有需要的數據都可用
  if (!ChooseDate.value || !StartHour.value || !EndHour.value || !totalcostforhour.value) {
    alert('請確保所有必填信息都已填寫。');
    return;
  }

  // 在送出訂單之前彈出確定購買的提示
  const confirmed = window.confirm('確定要購買嗎？');
  if (!confirmed) {
    return;
  }

  //日期設定
  const startDate1 = new Date(ChooseDate.value)
  const sh = StartHour.value
  const [hours1, minutes1] = sh.split(":").map(Number);
  startDate1.setHours(hours1, minutes1);

  const endDate1 = new Date(ChooseDate.value);
  const eh = EndHour.value
  const [hours, minutes] = eh.split(":").map(Number);
  endDate1.setHours(hours, minutes);


  // 組裝要發送的數據
  const bookingData = {
    customerId: parseInt(userid.value),
    productId: parseInt(Productspinia.roominfo.productId),
    orderDate: new Date().toISOString(),
    startDate: new Date(startDate1).toISOString(),
    endDate: endDate1.toISOString(),
    roomId: parseInt(Productspinia.roominfo.roomId),
    price: parseInt(totalcostforhour.value),
    itemName: Productspinia.roominfo.categoryname,
  };
  const jsonbd = JSON.stringify(bookingData)
  console.log(jsonbd)
  try {
    // 發送 POST 請求
    const response = await axios.post('https://localhost:7073/api/Orders/payform', bookingData, {
      headers: {
        'Content-Type': 'application/json'
      },
      // body: jsonbd
    });
    console.log('status', response.status);
    if (response.status === 200) {
      // 請求成功，處理響應（如導航到其他頁面、顯示消息等）
      document.getElementById('divContent').innerHTML = response.data;
      document.getElementById('payForm').submit();
    } else {
      // 請求失敗，處理錯誤
      const errorData = await response.json();
      alert(`預訂失敗：${errorData.message}`);
    }
  } catch (error) {
    // 網絡錯誤或其他問題，處理異常
    alert(`預訂過程中出現錯誤：${error.message}`);
  }
};
//loading
onMounted(async () => {
  await getRoomInfo().then(async () => {
    await Productspinia.axiosKey(roomId.value)
    swiperPoperty.img = `${path}${Productspinia.roominfo.image}`
    swiperPoperty.Address = `${Productspinia.roominfo.Address}`
    pingSet.ping = `${Productspinia.roominfo.ping}`
    categoryId.value = Productspinia.roominfo.categoryId - 1
    console.log(categoryId.value)
  });
});
</script>

<template>
  <!-- 跑馬燈 -->
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <swiper :modules="modules" effect="cube" :space-between="20" :loop="true" :pagination="{ clickable: true }"
          navigation :autoplay="{
            delay: 7000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }" :cube-effect="{
  shadow: false,
  slideShadows: false,
  shadowOffset: 20,
  shadowScale: 0.94,
}">
          <swiper-slide v-for="(text, index) in swiperTextBase" :key="index">
            <div class="image-wrapper">
              <img :src=text.img alt="img" class="object-fit-cover" style="height: 400px; width: 600px" />
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
  <!-- 評論 -->
  <section>
    <div class="container-wrapper">
      <div class="locationTitle">
        <div class="locationTitleLeft">
          <div class="locationTitleComment">
            <h3 class="title">{{ `${Productspinia.roominfo.siteName}&nbsp${Productspinia.roominfo.categoryname}` }}</h3>
            <div class="locationComment">
              <div class="material-icons">feedback</div>
              <div class="text">
                <p>{{ evaluationStore.numberOfReviews }}則評論</p>
              </div>
            </div>
          </div>
          <p class="material-icons">
            location_on{{ swiperTextBase[0].Address }}
          </p>
        </div>
      </div>
    </div>
  </section>
  <!-- 出租規則 -->
  <section class="border-bottom">
    <div class="container">
      <div class="row">
        <div class="col"></div>
        <div class="col-8 type-button d-flex justify-content-center">
          <ul>
            <li><button @click="changview(1)">顯示時租</button></li>
            <li><button @click="changview(2)">顯示日租</button></li>
          </ul>
        </div>
        <div class="col"></div>
        <!-- 這邊是顯示日租內容 -->
        <div class="row" v-if="view === 2">
          <ul class="price-list mt-3 col-8 d-flex justify-content-center">
            <li class="price-list-item clearfix">
              <span class="day-of-week" style="margin-right: 20px">周一 ~ 周五</span>
              <span class="hours">{{ Productspinia.roominfo.openTime }}</span>
            </li>
          </ul>
          <div class="col-4 mt-3"><span class="price">${{ Productspinia.roominfo.datePrice }}/天</span></div>

          <ul class="price-list col-8 d-flex justify-content-center">
            <li class="price-list-item clearfix">
              <span class="day-of-week" style="margin-right: 20px">週六 ~ 周日</span>
              <span class="hours">{{ Productspinia.roominfo.openTime }}</span>
            </li>
          </ul>
          <div class="col-4">
            <span class="price d-flex mt-2 justify-content-start">${{ Productspinia.roominfo.datePrice }}/天<span
                class="price-tag">假日收費</span></span>
          </div>
          <div class="time-choose clearfix d-flex justify-content-center mt-5">
            <!-- 這邊顯示日租的時間 -->
            <datepickerDesign @update-values="handleValuesUpdate" />

          </div>
          <div class="actionBtn mb-5">
            <span>產品編號: {{ Productspinia.roominfo.productId }}</span>
            <hr>
            <span>起始日期: {{ startDate }}</span>
            <hr>
            <span>結束日期: {{ endDate }}</span>
            <hr>
            <span>選取的天數: {{ dateDifference }}</span>
            <hr>
            <span>租金: {{ totalcost }}元</span>
            <hr>
            <button class="fullBtn" @click="submitBooking">${{ totalcost }} | 立即預訂</button>

          </div>
        </div>

        <!-- 這邊是顯示時租內容 -->
        <div class="row" v-if="view === 1">
          <div class="time-choose mt-5 col-8 clearfix d-flex justify-content-end">
            <label for="start-date" style="color: black; font-size: larger">選擇日期:</label>
            <datepickerDesign2 @update-values-hours="handleValuesUpdateHours" />


          </div>
          <div class="col-4 mt-5">
            <span class="price" style="color: black; font-size: larger">${{ Productspinia.roominfo.hourPrice }}/小時</span>
          </div>

          <div class="actionBtn mb-5">
            <span>選擇日期: {{ ChooseDate }}</span>
            <hr>
            <span>起始時間: {{ StartHour }}</span>
            <hr>
            <span>結束時間: {{ EndHour }}</span>
            <hr>
            <span>選取的時數: {{ hourDifference }}</span>
            <hr>
            <span>租金: {{ totalcostforhour }}元</span>
            <hr>
            <button class="fullBtn" @click="submitBookingHour">${{ totalcostforhour }} | 立即預訂</button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- 房型內容 -->
  <section>
    <div class="container mt-5">
      <div class="row">
        <div class="locationInfo">
          <!-- 簡介 -->
          <div class="infoSection d-flex justify-content-center js-daily-rule">
            <div class="infoTitle" style="padding: 0px 20px">簡介</div>
            <div class="infoDetail rules">
              是以時計價的出租空間，線上付款，即訂即用，適合各類課程、會議、聚會、談話等活動。
            </div>
          </div>
          <!-- 租用流程 -->
          <div class="infoSection d-flex justify-content-center js-daily-rule mt-3">
            <div class="infoTitle" style="padding: 0px 20px">租用流程</div>
            <div class="infoDetail rules">
              <ul>
                <li class="material-icons step step1">
                  calendar_month 選擇租用的日期、時間，點擊立即預訂。
                </li>
                <li class="material-icons step step2" style="padding-top: 15px">
                  payment 使用線上信用卡
                </li>
                <li class="material-icons step step3" style="padding-top: 15px">
                  qr_code_scanner
                  付款後，請閱讀訂單密碼頁的使用須知，並至信箱收取預訂成功通知Email。
                </li>
              </ul>
            </div>
          </div>
          <!-- 空間容納 -->
          <div class="infoSection d-flex justify-content-center js-daily-rule mt-3">
            <div class="infoTitle" style="padding: 0px 20px">空間容納</div>
            <div class="infoDetail rules">
              <ul>
                <li class="step step1">
                  <span class="material-icons">groups 建議人數 七人</span>
                </li>
                <li class="step step1" style="padding-top: 15px">
                  <span class="material-icons">accessible 場地大小約為 </span>
                  <a class="floorplanBtn" style="font-size: 20px;" @click="showModal = true">{{ pingSet.ping }}坪</a>
                  <span style="font-size: 20px;"> | 此據點</span>
                  <a class="floorplanBtn" style="font-size: 20px;" @click="showModal = true">樓層平面圖</a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 設備 -->
          <div class="infoSection d-flex justify-content-center js-daily-rule mt-3">
            <div class="infoTitle" style="padding: 0px 20px">設備</div>
            <div class="infoDetail">
              <ul class="deviceServe" v-for="device in devices[categoryId]">
                <li>
                  <i class="material-icons-round">{{ device.icon }}</i>
                  <p style="display: inline-block; font-size: 30px">{{ device.name }}</p>
                  <small>{{ device.description }}</small>
                </li>
              </ul>
              <br>
              <p class="material-icons-round" style="font-size: small">
                warning
                場地未提供且禁止使用麥克風設備。使用電視時，請保持適當音量，以不影響其他空間使用者為原則。
              </p>
            </div>
          </div>
          <!-- 適合活動-->
          <div class="infoSection d-flex justify-content-center js-daily-rule mt-3">
            <div class="infoTitle" style="padding: 0px 20px">適合活動</div>
            <div class="infoDetail rules">
              <ul class="evtType">
                <li>家教</li>
                <li>心靈談話</li>
                <li>心靈談話</li>
                <li>面試</li>
                <li>鄭寶見面會</li>
                <li class="linote">為確保安全，房內、公共區設有監視器。</li>
              </ul>
            </div>
          </div>
          <!-- 開放時段-->
          <div class="infoSection d-flex justify-content-center js-daily-rule mt-3">
            <div class="infoTitle" style="padding: 0px 20px">開放時段</div>
            <div class="infoDetail rules">
              <p style="color:black">週一 - 週日 08:00 - 22:00</p>
            </div>
          </div>
          <!-- 近期評價(先Pass)-->
          <div class="infoSection d-flex justify-content-center js-daily-rule mt-3">
            <div class="infoTitle" style="padding: 0px 20px">近期評價</div>
            <div class="infoDetail rules">
              <Evaluation />
            </div>
          </div>
          <!-- 使用規範-->
          <div class="infoSection d-flex justify-content-center js-daily-rule mt-3">
            <div class="infoTitle" style="padding: 0px 20px">使用規範</div>
            <div class="infoDetail">
              <ul class="use">
                <li style=" text-align: left; list-style-type: decimal; display: list-item;">
                  遵守大樓規範，公共區域應保持輕聲細語，請勿大聲喧嘩。
                </li>
                <li style=" text-align: left; list-style-type: decimal; display: list-item;">
                  自行清潔環境，愛惜空間內所有裝潢設備，
                  Happ.小樹屋
                  不收取額外清潔、水電費，但若您留下髒亂的環境或造成家具損毀，需額外支付清潔維護費用。</li>
                <li style=" text-align: left; list-style-type: decimal; display: list-item; ">
                  請配合準時離場，不得提早進入或超時使用。
                </li>
                <li style=" text-align: left; list-style-type: decimal; display: list-item;">
                  其他使用規範與罰則，請參考<a href="#" style="color: red;">使用者條款</a>。
                </li>

              </ul>
            </div>
          </div>
          <!-- 地圖 -->
          <div class="infoSection d-flex justify-content-center js-daily-rule mt-3">
            <div class="infoTitle" style="padding: 0px 20px">地圖</div>
            <div class="infoDetail rules">
              <P>捷運府中站 1 號出口，步行 7 分鐘</P>
              <iframe :src="iframeSrc" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 秀出圖片檔案 -->
  <div v-if="showModal" class="floor-mask" @click.self="showModal = false">
    <div class="floor-container floor">
      <span class="close" @click="showModal = false">&times;</span>
      <img class="floor-container-main" src="../../assets/img/房間坪數格局/product-1.png" alt="image description" />
    </div>
  </div>

  <!-- 裝準備submit的ecpayform -->
  <div id="divContent"></div>
</template>

<style>
.swiper {
  width: 100%;
  height: 100%;
  overflow: visibles;
}

.locationComment {
  display: inline-block;
}

.container-wrapper {
  max-width: 760px;
  width: 100%;
  height: auto;
  margin: 0 auto 40px;
}

.container-wrapper .locationTitle {
  margin: 15px 0 20px;
  padding: 0;
}

.container-wrapper .locationTitle .locationTitleLeft .locationTitleComment {
  padding: 0 0 18px;
}

.container-wrapper .locationTitle .locationTitleLeft .locationTitleComment .locationComment {
  display: inline-block;
  cursor: pointer;
}

.container-wrapper .locationTitle .locationTitleLeft .locationTitleComment h3 {
  vertical-align: middle;
  display: inline-block;
  padding: 0 16px 0 0;
}

.container-wrapper .locationTitle .locationTitleLeft .locationTitleComment .locationComment .text {
  vertical-align: middle;
  display: inline-block;
}

.type-button ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.type-button li {
  display: inline-block;
}

.type-button button {
  background-color: transparent;
  border: none;
  color: #000;
  cursor: pointer;
  font-size: 16px;
  margin: 0 10px;
  padding: 10px 20px;
}

.type-button button:hover {
  background-color: #eee;
}

.type-button button:focus {
  background-color: rgb(52, 220, 100);
  outline: none;
}

.price-tag {
  border: solid 1px #ed5958;
  border-radius: 3px;
  padding: 4px 7px;
  color: #ed5958 !important;
  font-size: 10px !important;
  margin-left: 12px;
  line-height: 1 !important;
}

.actionBtn {
  padding-top: 20px;
  text-align: center;
  font-size: 18px;
}

.fullBtn {
  z-index: 99;
  cursor: pointer;
  color: #fff;
  border: 1px solid transparent;
  border-radius: 50px;
  padding: 10px 20px;
  background-color: #ed5959;
  letter-spacing: 0.1em;
}

.infoTitle {
  width: 10%;
  min-width: 90px;
  display: inline-block;
  color: #a59476;
  text-align: right;
  font-size: large;
}

.infoDetail {
  max-width: 765px;
  line-height: 1.5em;
  width: 80%;
  border-bottom: 1px solid #d2d2d2;
  padding-bottom: 10px;
}

.step {
  width: 100% !important;
  position: relative;
}

.floorplanBtn {
  color: #42996d;
  cursor: pointer;
  margin: 0;
  text-decoration: underline;
}

.floor-mask {
  position: fixed;
  z-index: 99999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000000b3;
  display: block;
  transition: opacity 0.3s ease;
}

.p {
  font-weight: 400;
}

.floor-container {
  position: absolute;
  display: block;
  max-width: 800px;
  margin: 30px auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.floor-container-main {
  max-width: 100%;
  max-height: 680px;
  display: block;
  margin: 0 auto;
}

.locationInfo {
  color: #666;
  max-width: 995px;
  width: 100%;
  margin: 0 auto;
  font-size: .9em;
}

.locationInfo .infoSection .infoDetail ul li {
  display: inline-block;
  margin: 0 0 20px;
  width: auto;
  vertical-align: middle;
}

.infoDetail ul small {
  font-size: 0.7em;
  display: block;
  margin-top: -25px;
}

.deviceServe {
  display: inline-block;
}

.locationInfo .infoSection .infoDetail .evtType li {
  list-style: disc;
  float: left;
  margin: 0 3% 0 25px;
  display: list-item;
  width: auto;
}

.linote {
  list-style: none !important;
  font-size: 0.9em;
  padding: 10px 0 0;
  clear: both;
  color: #999;
}
</style>
