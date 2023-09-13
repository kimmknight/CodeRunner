<template>
    <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-interval="false" data-bs-ride="carousel">
        <div class="w-100 d-flex justify-content-between mb-3">
            <button class="btn btn-outline-danger" data-bs-target="#carouselExampleDark" data-bs-slide="prev"><b>&lt; Previous</b></button>
            <button class="btn btn-outline-primary" data-bs-target="#carouselExampleDark" data-bs-slide="next"><b>Next &gt;</b></button>
        </div>
        <div class="carousel-inner p-md-2 p-2">
            <div class="carousel-item" v-for="(page, index) in tutorialData">
                <div>
                    <h4>
                        {{ index + 1 }}. {{ page.title }}
                    </h4>
                    <div v-html="page.contentHtml"></div>
                </div>
            </div>
        </div>
    </div>

</template>


<script>

import importedTutorialData from '/src/assets/tutorial.js'

export default {
    name: "Tutorial",

    data() {
        return {
            tutorialData: importedTutorialData
        }
    },

    mounted() {
        document.getElementsByClassName("carousel-item")[0].classList.add("active")
    }
}

</script>


<style scoped>
h4 {
    margin-top: 0.5em;
    margin-bottom: 1em;
}
</style>
<style>
pre {
    display: block;
    margin-left: 1em;
    margin-right: 1em;
    padding: 1em;
    max-width: 100%;
    overflow-x: auto;
    border: 1px solid lightgrey;
    border-radius: 0.25em;
}
</style>