<template>
    <div class="chart-container w-100">
        <div class="label text-end"><b>${{ toWord(max) }}</b></div>
        <div class="d-flex w-100 justify-content-end align-items-end overflow-hidden">
            <div class="bar-col overflow-hidden" v-for="bet in chartData">
                <div :class="[bet.won ? 'bg-success' : 'bg-danger']" class="bar text-light text-center w-100"
                :style="{height: Math.round(Number(bet.cashBalance) / Number(max) * 100) + '%'}"
                :title="'Race #' + bet.raceNumber + '\n$' + toWord(BigInt(bet.cashBalance))">
                <!-- :title="'Race #' + bet.raceNumber + '\n$' + BigInt(bet.cashBalance).toLocaleString('en-US')"> -->
                    &nbsp;
                </div>
            </div>
        </div>
        <div class="d-flex justify-content-between small">
            <span>Past</span>
            <!-- <div class="label"><b>$0</b></div> -->
            <span>Recent</span>
        </div>
    </div>
</template>

<script>
import numberCruncher from '/src/assets/numbercruncher.js'

export default {

    name: "Chart",

    props: ["chartData"],

    methods: {
        toWord(number, decimals = 1) {
            return numberCruncher(number, decimals)
        }
    },

    computed: {
        max() {
            let arr = [...this.chartData]

            arr.sort( ( a, b ) => {
                if (BigInt(a.cashBalance) > BigInt(b.cashBalance)) return 1;
                if (BigInt(a.cashBalance) < BigInt(b.cashBalance)) return -1;
                return 0;
            } )

            return BigInt(arr[arr.length - 1].cashBalance);
        },
    }

}
</script>

<style>
.bar-col {
    width: 4%;
    height: 6em;
    display: flex;
    align-items: flex-end;
    opacity: 90%;
    border-bottom: 2px solid rgb(182 182 182)
}
.bar {
    margin-left: 3px;
    margin-right: 4px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    box-shadow: 2px 2px 5px 1px rgba(255,255,255,0.15) inset;
}
.label {
    font-size: 0.8em;
}
</style>