<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <!-- 這邊要改中間內容 -->
<!-- <Header>
        <div class="page-header min-vh-75" :style="`background-image: url(${vueMkHeader})`" loading="lazy">
            <div class="container">
                <div class="row">
                    <div class="col-lg-7 text-center mx-auto position-relative">
                        <h1 class="text-white pt-3 mt-n5 me-2" :style="{ display: 'inline-block ' }">
                            Material Kit 2
                        </h1>
                        <p class="lead text-white px-5 mt-3" :style="{ fontWeight: '500' }">
                            Start the Development With Bootstrap 5 Design System inspired by
                            Material Design.
                        </p>
                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Header> -->

    <div class="container">
        <div class="row">
            <aside class="menu col-4 d-flex flex-wrap justify-content-center" style="margin-top: 30px;">
                <ul style="display: inline-block;">
                    <li>
                        <RouterLink :to="{ name: 'userview-userterms' }">使用條款</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/aaa">隱私政策a</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/bbb">Cookie好吃b</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/ccc">技術問題c</RouterLink>
                    </li>
                </ul>
            </aside>
            <RouterView />
            <!-- <div class="col-8"></div> -->
        </div>
    </div>
</template>
      
<style>
.menu {
    width: 16.67%;
    position: fixed;
    top: 10%;
    padding-right: 15px;
    margin-bottom: 50px;
}
</style>