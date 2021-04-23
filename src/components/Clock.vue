<template>
    <h2 class="text-3xl">{{ name }}</h2>
    <p class="text-7xl">{{ text ?? "Game over" }}</p>
</template>

<script>
export default {
    name: "HelloWorld",
    props: {
        running: Boolean,
        duration: Number,
        name: String,
    },
    watch: {
        running: function (newVal) {
            if (this.gameOver) {
                console.log("NO! Game over")
            } else {
                if (newVal) {
                    this.startTimer()
                } else {
                    this.stopTimer()
                }
            }
            this.started = true
        },
    },
    data() {
        return {
            interval: null,
            text: this.parseDuration(this.duration),
            left: this.duration,
            started: false,
            gameOver: false,
        }
    },
    emits: ["game-over"],
    methods: {
        startTimer: function () {
            let timer = this.left,
                minutes,
                seconds
            if (this.interval) clearInterval(this.interval)
            const foo = () => {
                minutes = parseInt(timer / 60, 10)
                seconds = parseInt(timer % 60, 10)

                minutes = minutes < 10 ? "0" + minutes : minutes
                seconds = seconds < 10 ? "0" + seconds : seconds

                this.text = minutes + ":" + seconds
                this.left = --timer

                if (timer < 0) {
                    clearInterval(this.interval)
                    this.text = null
                    this.gameOver = true
                    this.$emit("game-over")
                }
            }
            if (!this.started) foo()
            // foo()
            this.interval = setInterval(function () {
                foo()
            }, 1000)
        },
        stopTimer: function () {
            clearInterval(this.interval)
            this.interval = null
        },
        parseDuration: function (duration) {
            let timer = duration,
                minutes,
                seconds
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10)

            minutes = minutes < 10 ? "0" + minutes : minutes
            seconds = seconds < 10 ? "0" + seconds : seconds

            return minutes + ":" + seconds
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
