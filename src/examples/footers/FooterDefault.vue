<script setup>
import { RouterLink, RouterView, useRouter } from "vue-router";
import logoDark from "@/assets/img/logo-ct-dark.png";
const router = useRouter();

const navigateTo = (path) => {
  router.push(path);
};

defineProps({
  brand: {
    type: Object,
    name: String,
    logo: String,
    route: "",
    default: () => ({
      name: "Material Kit 2",
      logo: logoDark,
      route: "/"
    })
  },
  socials: {
    type: Array,
    icon: String,
    link: String,
    default: () => [
      {
        icon: '<i class="fab fa-facebook text-lg opacity-8"></i>',
        link: "https://www.facebook.com/CreativeTim/"
      },
      {
        icon: '<i class="fab fa-twitter text-lg opacity-8"></i>',
        link: "https://twitter.com/creativetim"
      },
      {
        icon: '<i class="fab fa-dribbble text-lg opacity-8"></i>',
        link: "https://dribbble.com/creativetim"
      },
      {
        icon: '<i class="fab fa-github text-lg opacity-8"></i>',
        link: "https://github.com/creativetimofficial"
      },
      {
        icon: '<i class="fab fa-youtube text-lg opacity-8"></i>',
        link: "https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w"
      }
    ]
  },
  menus: {
    type: Array,
    name: String,
    items: {
      type: Array,
      name: String,
      href: String
    },
    default: () => [
      {
        name: "認識Xiang",
        items: [
          {
            name: "關於我們",
            path: "/pages/landing-pages/about-us"
          },
        ]
      },
      {
        name: "攜手Xiang",
        items: [
          { name: "供應商登入",
            path: "/cooperation" },
          {
            name: "合作夥伴",
            path: "/cooperation"
          },
        ]
      },
      {
        name: "使用條款",
        items: [
          { name: "使用條款",
            path: "/userview/userterms" },
          {
            name: "隱私政策",
            path: "/userview/privacy"
          },
        ]
      },
      // ...
    ]
  }
});
</script>
<template>
  <footer class="footer py-5">
    <div class="container p-0">
      <div class="row">
        <div class="col-4  ">
          <div>
            <img src="../../assets/img/logo100x60.png">
            <h3 class="fw-bold" style="font-size: 24px;">讓每次推開門都是一段絕無僅有的美好時光</h3>
            <p style="font-size: 16px; line-height: 1.5; margin-top: 20px;">
              Happ. 小樹屋想帶給你的不僅僅是空間，更是一段絕無僅有的時光；獻給每個「實現此刻」的你，讓美好的事物與回憶就此發生。
            </p>
          </div>
        </div>
        <div class="col-lg-1 col-sm-6 col-md-2 mb-4 offset-1" v-for="{ name, items } of menus" :key="name">
          <h6 class="text-sm">{{ name }}</h6>
          <ul class="flex-column ms-n3 nav">
            <li id="link" class="nav-item" v-for="item of items" :key="item.name">
              <a class="nav-link" @click="navigateTo(item.path)">{{ item.name }}</a>
            </li>
          </ul>
        </div>
        <div class="col-lg-1 col-sm-6 col-md-2 mb-4 offset-1">
          <h6 class="text-sm">付款方式</h6>
          <ul class="flex-column ms-n3 nav">
            <li class="nav-item">
              <span class="nav-link" href="#">
                <img src="../../assets/img/logo100x60.png" alt="綠界信用卡支付" style="max-height: 30px;"></span>
            </li>
          </ul>
        </div>
        <div class="col-12">
          <hr style="border-color: #ddd;">
          <div class="text-center">
            <p class="text-dark my-4 text-sm font-weight-normal">
              僅作FUEN23第四組專題使用 &copy; {{ new Date().getFullYear() }} 台南全端班 All rights reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style>
#link :hover{
background-color: #ccc;
 cursor: pointer;
}

</style>