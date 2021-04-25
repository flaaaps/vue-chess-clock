<template>
    <div :class="['flex', 'flex-col', reverse ? 'flex-col-reverse mt-6' : 'flex-col']">
        <div class="my-3 flex items-center">
            <input class="bg-gray-200 border-r-2 border-white" :id="playerId" type="text" v-model="displayName" />
            <div class="mx-auto bg-gray-200" style="height: 45px" v-if="!started">
                <label :for="playerId" class="mx-4 flex items-center">
                    <font-awesome-icon icon="pen" />
                </label>
            </div>
        </div>
        <p class="mt-5 text-7xl">{{ text }}</p>
    </div>
</template>

<script>
export default {
    name: "Clock",
    props: {
        name: String,
        text: String,
        started: Boolean,
        playerId: Number,
        reverse: Boolean,
    },
    data() {
        return {
            disabled: true,
            displayName: this.name,
        }
    },
    watch: {
        displayName: function (newVal) {
            this.$emit("user-name", { name: newVal, id: this.playerId })
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
svg {
    font-size: 25px;
}
label {
    height: 100%;
}
</style>
