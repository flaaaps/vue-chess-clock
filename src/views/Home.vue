<template>
    <div class="home">
        <div
            :key="player.id"
            v-for="player in players"
            @click="changePlayer"
            :class="['player-' + player.id.toString(), activePlayer === player.id && 'active']"
        >
            <Clock
                @game-over="handleGameOver"
                :running="running && activePlayer === player.id"
                :duration="10"
                :name="player.name"
            />
        </div>
        <br />
        <button @click="start" v-if="!running">Start</button>
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
    methods: {
        start: function () {
            this.running = true
            this.started = true
        },
        changePlayer: function () {
            console.log(this.started)
            if (this.running || !this.started)
                this.activePlayer === 1 ? (this.activePlayer = 2) : (this.activePlayer = 1)
            console.log("CHANGED")
        },
        updateClock: function () {
            if (!this.started) {
                this.started = true
            } else {
                this.activePlayer === 1 ? (this.activePlayer = 2) : (this.activePlayer = 1)
            }
        },
        handleGameOver: function () {
            console.log("GAME IS OVER!!")
            this.running = false
        },
    },
    data() {
        return {
            started: false,
            running: false,
            text: "hello",
            activePlayer: 1,
            players: [
                { name: "Detlef", id: 1 },
                { name: "Joshi", id: 2 },
            ],
        }
    },
}
</script>

<style>
.active {
    color: green;
}
</style>
