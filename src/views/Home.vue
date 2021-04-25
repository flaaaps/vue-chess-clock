<template>
    <div class="home flex justify-center flex-col items-center h-screen">
        <TimerConfig v-if="!started" :show="showConfig" @close-modal="showConfig = false" :players="players" />
        <div
            :key="player.id"
            v-for="player in players"
            @click="changePlayer(player.id)"
            @dblclick="reset()"
            :class="['player-' + player.id.toString(), activePlayerId === player.id && 'active']"
        >
            <Clock
                :name="player.name"
                :playerId="player.id"
                @user-name="changeUsername"
                :reverse="player.id === 2"
                :text="player.text"
                :started="started"
            />
        </div>
        <br />
        <font-awesome-icon icon="stopwatch" v-if="!started" class="mb-3 text-3xl" @click="showConfig = !showConfig" />
        <button class="bg-blue-600 text-white px-5 rounded-sm text-lg" v-if="!running" @click="start()">Start</button>
    </div>
</template>

<script>
// @ is an alias to /src
import Clock from "@/components/Clock.vue"
import TimerConfig from "@/components/TimerConfig.vue"

export default {
    name: "Home",
    components: {
        Clock,
        TimerConfig,
    },
    methods: {
        changeUsername: function (userObj) {
            this.players.map(player => (player.id === userObj.id ? (player.name = userObj.name) : null))
        },
        updateCounter: function (player) {
            let timer = player.left
            // minutes,
            // seconds
            if (this.interval) clearInterval(this.interval)
            console.log(timer)
            const foo = () => {
                player.text = this.parseTime(timer)
                player.left = --timer

                if (timer < 0) {
                    player.text = "Game Over"
                    this.gameOver = true
                    this.running = false
                    this.started = false
                }
            }
            foo()
            this.interval = setInterval(function () {
                foo()
            }, 1000)
        },
        parseTime: function (duration) {
            let timer = duration,
                minutes,
                seconds,
                hours

            hours = parseInt(timer / 3600, 10)
            minutes = parseInt((timer % 3600) / 60, 10)
            seconds = parseInt(timer % 60, 10)

            hours = hours < 10 ? "0" + hours : hours
            minutes = minutes < 10 ? "0" + minutes : minutes
            seconds = seconds < 10 ? "0" + seconds : seconds
            return hours + ":" + minutes + ":" + seconds
        },
        changePlayer: function (playerId) {
            if (playerId !== this.activePlayerId && this.running) return

            if (!this.running) {
                this.activePlayerId = playerId
            } else {
                this.activePlayerId = playerId === 1 ? 2 : 1
            }
            if (this.started) this.start()
            // if (this.running && !this.gameOver) this.updateCounter(this.players[this.activePlayerId - 1])
        },
        start: function () {
            if (this.gameOver) {
                this.players = this.players.map(player => ({
                    ...player,
                    left: player.duration,
                }))
                this.players.forEach(player => (player.text = this.parseTime(player.duration)))
            }
            this.updateCounter(this.players[this.activePlayerId - 1])
            this.running = true
            this.started = true
        },
        reset: function () {
            this.players = this.players.map(player => ({
                ...player,
                left: player.duration,
            }))
            this.players.forEach(player => (player.text = this.parseTime(player.duration)))
            this.running = false
            this.started = false
            this.gameOver = false
        },
    },
    mounted() {
        this.reset()
    },
    data() {
        return {
            interval: null,
            running: false,
            gameOver: false,
            started: false,
            showConfig: false,
            config: {
                alwaysShowHours: true,
            },
            players: [
                { name: "Player 1", id: 1, duration: 32410, left: 100 },
                { name: "Player 2", id: 2, duration: 100, left: 100 },
            ],
            activePlayerId: 1,
        }
    },
}
</script>

<style>
* {
    user-select: none;
}
#home {
}
.active {
    color: rgb(37, 99, 235);
}
input {
    text-align: center;
    height: 45px;
    font-family: Arial !important;
}
</style>
