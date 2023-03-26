<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <div class="container">
        <div class="row">
            <aside class="menu col-3 justify-content-center mt-5">
                <ul style="display: inline-block;">
                    <li style="list-style-type: none;">
                        <img src="../../../assets/img/search.png" />
                        <RouterLink :to="{ name: 'userview-userterms' }">使用條款</RouterLink>
                    </li>
                    <li style="list-style-type: none;">
                    <img src="../../../assets/img/search.png" />
                    <RouterLink :to="{ name: 'userview-privacy' }">隱私政策</RouterLink>
                </li>
                    <!-- <li style="list-style-type: none;">
                        <img src="../../../assets/img/pornhub_official_logo_icon.png" />
                        <RouterLink :to="{ name: 'userview-cookiepolicy' }">Cookie政策</RouterLink>
                    </li> -->
                    <!-- <li style="list-style-type: none;">
                        <img src="../../../assets/img/pornhub_official_logo_icon.png" />
                        <RouterLink to="/ccc">技術問題c</RouterLink>
                    </li> -->
                </ul>
            </aside>
            <!-- <div class="col-8"></div> -->
        </div>
        <div class="go-left mt-2">
            <RouterView />
        </div>
    </div>
</template>
      
<style>
/* li {
    list-style-type: none;
} */

.menu {
    width: 16.67%;
    position: fixed;
    top: 10%;
    padding-right: 15px;
    margin-bottom: 50px;
}

.go-left {
    margin-left: 20%;
}
</style>