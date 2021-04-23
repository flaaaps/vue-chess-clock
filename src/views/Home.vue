<template>
    <div class="home">
        <Clock msg="Welcome to Your Vue.js App" />
    </div>
</template>

<script>
// @ is an alias to /src
import Clock from "@/components/Clock.vue"

export default {
    name: "Home",
    components: {
        Clock,
    },
}
</script>
