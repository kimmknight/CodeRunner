<template>
    <div>
        <p class="small"><b>Variables:</b></p>
        <div class="small ms-3 mb-4">
            <p><b>horses</b> is an array containing details about each horse in the current race of {{
                game.settings.horsesPerRace }} horses. It looks like this:</p>

            <code>
            <pre>
[
{
"name": "Jack",
"speed": 9,
"luck": 5,
"wins": 55,
"places": 145,
"raceCount": 188,
"number": 26,
"odds": 3
},
...
]
</pre
            >
        </code>

            <p><b>cash</b> is a variable containing the current amount of cash available. Modifying it will not give you
                more cash.</p>

            <p><b>history</b> provides some betting statistics and a log of the last {{ game.settings.betHistorySize }}
                bets. It looks like this:</p>
            <code>
            <pre>
{
"recent": [
{
"type": "To Win",
"horses": [
36
],
"bet": 84136,
"won": false,
"payout": 252408,
"outcome": -84136,
"raceNumber": 341
},
...
],
"betCount": 83,
"raceCount": 101,
"totalRacesWon": 47,
"totalRacesLost": 36,
"totalCashWon": 5858867,
"totalCashLost": 5831552
}
</pre
            >
        </code>
        </div>

        <p class="small"><b>Functions:</b></p>
        <div class="small ms-3">
            <div class="me-1">
                <p><b>betToWin</b>(horse, amount)</p>
                <p class="ms-2">Place a bet on a horse to win the race. Horse should be given in the format: horses[n].</p>
                <p class="ms-2"><b>Example:</b> <code>betToWin( horses[0], 30 )</code></p>
            </div>
            <div class="me-1">
                <p><b>betToPlace</b>(horse, amount)</p>
                <p class="ms-2">
                    Place a bet on a horse to place (1st, 2nd, or 3rd) in the race. Horse should be given in the format:
                    horses[n].
                </p>
                <p class="ms-2"><b>Example:</b> <code>betToPlace( horses[0], 30 )</code></p>
            </div>
            <div class="me-1">
                <p><b>shuffleHorses</b>()</p>
                <p class="ms-2">
                    Draw a new random set of horses to participate in the race. Costs 20% of your cash each time you use it.
                    Exercise caution if using AutoRace.
                </p>
            </div>
            <div class="me-1">
                <p><b>calculatePayout</b>(horse, amount, betType = "To Win")</p>
                <p class="ms-2">
                    Returns the payout that would be paid if you won a given bet in this race. Use it to check if a given bet is
                    worth making before making it.
                </p>
            </div>
            <div class="me-1">
                <p><b>getStore()</b> and <b>setStore(data)</b></p>
                <p class="ms-2">
                    The <b><i>store</i></b> allows you to store data between races. You can save into the store using
                    <b><i>setStore(data)</i></b> replace <b><i>data</i></b> with the information you wish to store. Each time
                    you use <b><i>setStore(data)</i></b> it will overwrite the previous contents of the store. You can retrieve
                    stored data using <b><i>getStore()</i></b>. The stored data can be any type. If you wish to store more than
                    one piece of data, store an object or an array with multiple values.
                </p>
            </div>
            <div class="me-1">
                <p><b>toggleAutoRace(state)</b></p>
                <p class="ms-2">
                    Switches AutoRace on or off. You can use it (in combination with some <i>if</i> statements) to stop AutoRace
                    if you are losing too much cash. Can be used as follows:
                </p>
                <p class="ms-2">
                    <code>toggleAutoRace()</code> - Switches AutoRace off if it is currently on and vice versa.
                    <br />
                    <code>toggleAutoRace(true)</code> - Switches AutoRace on.
                    <br />
                    <code>toggleAutoRace(false)</code> - Switches AutoRace off.
                </p>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "QuickReference",
    props: ["game"]
}
</script>

<style></style>