<template>
    <div :class="[!show ? 'hidden' : 'fixed', 'w-full h-full top-10']">
        <div
            class="wrapper z-50 m-auto bg-white border-4 border-blue-500 bg-opacity-50 w-11/12 sm:w-8/12 h-2/3 md:w-8/12 px-3"
        >
            <nav class="text-right">
                <button class="mt-2" @click="$emit('close-modal')"><font-awesome-icon icon="times" /></button>
            </nav>
            <h1 class="my-3 text-3xl font-bold">Configure</h1>
            <div v-for="(player, index) in players" :key="index" class="text-left">
                <h2 class="font-medium text-xl">{{ player.name }}</h2>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "TimerConfig",
    props: {
        show: Boolean,
        players: [Object],
    },
}
</script>
<style scoped>
.wrapper {
    backdrop-filter: blur(5px);
}
</style>
