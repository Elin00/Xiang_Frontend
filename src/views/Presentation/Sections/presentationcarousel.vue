<script setup>
const props = defineProps({
    action: {
        default: () => ({
            class: "d-block w-100 fixed-size-image",
        })
    },
});
</script>

<template>
    <section class="pt-3 pb-4 " id="count-stats">
        <div class="container">
            <div class="row">
                <div class="col-lg-9 z-index-2 border-radius-xl mx-auto py-3">
                    <div class="row">
                        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0"
                                    class="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                                aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                                    aria-label="Slide 3"></button>
                            </div>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src="../../../assets/img/CounterCard1.jpg" :class="action.class" alt="..."
                                        style="height: 400px;width: 400px;">
                                    <div class="carousel-caption d-none d-md-block">
                                        <!-- <h5>First slide label</h5>
                                                                                        <p>Some representative placeholder content for the first slide.</p> -->
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <img src="../../../assets/img/CounterCard2.jpg" :class="action.class" alt=".."
                                        style="height: 400px;width: 400px;">
                                    <div class="carousel-caption d-none d-md-block">
                                    </div>
                                </div>
                                <div class="carousel-item">
                                    <img src="../../../assets/img/CounterCard3.jpg" :class="action.class" alt="..."
                                        style="height: 400px;width: 400px;">
                                    <div class="carousel-caption d-none d-md-block">

                                    </div>
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                                data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                                data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template> 
