<template>
    <div class="home">
        <div
            :key="player.id"
            v-for="player in players"
            @click="changePlayer(player.id)"
            :class="['player-' + player.id.toString(), activePlayerId === player.id && 'active']"
        >
            <Clock :name="player.name" :text="player.text" />
        </div>
        <br />
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
        updateCounter: function (player) {
            let timer = player.left,
                minutes,
                seconds
            if (this.interval) clearInterval(this.interval)
            console.log(timer)
            const foo = () => {
                minutes = parseInt(timer / 60, 10)
                seconds = parseInt(timer % 60, 10)

                minutes = minutes < 10 ? "0" + minutes : minutes
                seconds = seconds < 10 ? "0" + seconds : seconds

                player.text = minutes + ":" + seconds
                player.left = --timer

                if (timer < 0) {
                    player.text = "Game Over"
                    this.gameOver = true
                    this.running = false
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
                seconds
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10)

            minutes = minutes < 10 ? "0" + minutes : minutes
            seconds = seconds < 10 ? "0" + seconds : seconds

            return minutes + ":" + seconds
        },
        changePlayer: function (playerId) {
            if (playerId !== this.activePlayerId && this.running) return

            if (!this.running) {
                this.activePlayerId = playerId
            } else {
                this.activePlayerId = playerId === 1 ? 2 : 1
            }
            this.start()
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
        },
    },
    mounted() {
        this.players.forEach(player => {
            player.text = this.parseTime(player.left)
        })
    },
    data() {
        return {
            interval: null,
            running: false,
            gameOver: false,
            players: [
                { name: "Moritz", id: 1, duration: 100, left: 100 },
                { name: "Joshi", id: 2, duration: 5, left: 5 },
            ],
            activePlayerId: 0,
        }
    },
}
</script>

<style>
.active {
    color: green;
}
</style>
