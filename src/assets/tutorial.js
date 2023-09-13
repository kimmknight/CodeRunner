export default [
    {
        title: `Welcome to Code Runner!`,
        contentHtml: `<p>Code Runner is a horse race betting game where you write JavaScript code to bet on horses and win cash.</p>
        
        <p>Your aim is make as much cash as possible by writing the best code possible to win.</p>
        
        <p>Various projects/upgrades will become available as you progress.</p>
        
        <p>Click <b class="text-primary">Next &gt;</b> to get started!</p>`
    },
    {
        title: `Your first bet`,
        contentHtml: `<p>Which horse do you think will win?</p>
        <p>Check out the odds listed to the left of each horse. The smaller the number, the greater chance the horse has of winning, but the lower the payout. You can also click on the name of a horse to see more detailed stats.</p>
        <p>You will need to know the number of the horse. Horses are numbered from 0 to 7 (top to bottom, as they appear on the screen). The first horse in the list is 0, the last is 7.</p>
        <p>In this example code, we place a bet of <strong>$10</strong> on horse <strong>#3</strong> <em><strong>to win</strong></em>:</p>
        <pre><code>betToWin( horses[3], 10 );</code></pre>
        <p>Copy this example into the Code Editor. Insert the number of your chosen horse in place of the <strong>3</strong>. Click <strong>Start Race</strong>.</p>
        <p><strong>Note:</strong> In the next race, a different horse will occupy position #3, so you will want to choose a new horse and update the number.</p>`,
    },
    {
        title: `Betting to place`,
        contentHtml: `<p>You now know how to place on a bet for a horse to win first place in the race.</p>

        <p>You can also make a place bet. In this case, if the horse places 1st, 2nd, or 3rd in the race, you win. The payout in this case is 1/3 of the amount you would receive on a <b><i>to win</i></b> bet.</p>

        <p>In this example code, we place a bet of $10 on horse #3 to place:</p>

        <pre><code>betToPlace( horses[3], 10 );</code></pre>
        
        <p>Beware: To Place bets only pay one third of the cash that a win would. A winning bet on a horse with 2:1 odds would pay less than the bet cost.</p>`
    },
    {
        title: `Sorting the horses`,
        contentHtml: `<p>Changing <b>betToWin</b> and <b>betToPlace</b> values manually for each race will quickly get tiresome.</p>

        <p>How can you make your code automatically choose the best horse to bet on?</p>

        <p>To start, you can sort the horses from best to worst based on their attributes.</p>

        <p>In this example, we sort all of the horses based on their speed value:</p>

<pre><code>horses.sort( ( a, b ) => {
    if ( a.speed &lt; b.speed ) return 1;
    if ( a.speed &gt; b.speed ) return -1;
    return 0;
} )</code></pre>

        <p>This uses the JavaScript array .sort() function. You can learn more about it here.</p>

        <p>Now the horses array is sorted by speed, with the fastest horse occupying position 0, and the slowest in position 7.</p>

        <p>If you now place a bet on horse #0, it will place a bet on the horse with the highest speed in each race:</p>

<pre><code>horses.sort( ( a, b ) => {
    if ( a.speed &lt; b.speed ) return 1;
    if ( a.speed &gt; b.speed ) return -1;
    return 0;
} )

betToWin( horses[0], 10 );</code></pre>

        <p>This might seem like a sure way to succeed in this game, however, there is more to a horse's success than just speed. It is a good starting point, however.</p>

        <p>Perhaps you could sort the horses by the number of wins they have had, or by a combination of their speed and luck.</p>

        <p>Try the example above. Can you modify it to compare the combined speed <i>and</i> luck of each horse?</p>`
    },
    {
        title: `Bet proportionally`,
        contentHtml: `<p>In each of the previous examples, each time, we bet $10.</p>

        <p>As you start to earn more money, you should increase your bets.</p>

        <p>Instead of $10, how about you bet 20% of your available cash each time?</p>

        <p>You can access your cash balance in the code from the variable called cash. If you multiply it by 0.2 then you get 20% of your available cash:</p>

        <pre><code>betToWin( horses[0], cash * 0.2 );</code></pre>`
    },
    {
        title: `Avoid bad bets`,
        contentHtml: `<p>In some cases, the potential return on a bet might be equal or less than what it cost to place the bet. These bets are undesirable.</p>

        <p>For example, if you bet $10 on a horse with 2:1 odds to place, the most it can pay is $7 (less than the bet). Or occasionally a horse will have 1:1 odds in a race and the most it can pay on a win is the bet amount.</p>

        <p>To avoid this issue, only place To Win bets on horses with odds of 2:1 or greater:</p>

<pre><code>if ( horses[0].odds >= 2 ) {
    betToWin( horses[0], cash * 0.2 );
}</code></pre>

        <p>And only put Place bets on horses with odds of 4:1 or greater:</p>

<pre><code>if ( horses[0].odds >= 4 ) {
    betToWin( horses[0], cash * 0.2 );
}</code></pre>

        <p>There is also a calculatePayout function you can use to check the payout amount of a potential bet in the current race. It return the cash that would be paid if the bet won. Here is an example of how to call it:</p>

        <pre><code>calculatePayout(horses[0], cash * 0.2, "To Win");</code></pre>`
    },
    {
        title: `Shuffling horses`,
        contentHtml: `<p>Even with some good betting code/logic, your results can vary significantly depending on the horses racing.</p>
        
        <p>Each race, the eight horses racing are selected from your local pool of 20 horses.</p>
        
        <p>Every 100 races, your pool of horses is swapped with a random selection of horses from a larger pool of 50 horses in the area. This is called <i>shuffling the horses</i>.</p>
        
        <p>If your code is not performing well with the current set of horses, you may wish to shuffle the horses sooner.</p>
        
        <p>It will cost 20% of your current cash, so use wisely.</p>
        
        <p>You can shuffle the horses by clicking the <b>Shuffle Horses</b> button in the <b>Actions</b> pane.</p>
        
        <p>You can also shuffle them in your code by calling:</p>
        
        <pre><code>shuffleHorses()</code></pre>
        
        <p>Be careful using this code with AutoRace switched on! If you use it without any <i>if</i> statements, each race will deplete your cash by 20%.</p>
        
        <p>For example: If this is the 25th race (or a multiple of), then if you have lost more than 80% of the past 25 races, then shuffle horses.</p>`
    },
    // {
    //     title: ``,
    //     contentHtml: ``
    // },
]