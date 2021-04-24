<template>
    <h2 class="text-3xl">{{ name }}</h2>
    <p>{{ text }}</p>
</template>

<script>
export default {
    name: "Clock",
    props: {
        name: String,
        text: String,
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
