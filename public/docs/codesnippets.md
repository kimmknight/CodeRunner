# Code Runner - Code Snippets

**Sort horses by their combined speed/luck. Best horse takes array position 0.**

```
horses.sort( ( a, b ) => {
  if (a.speed + a.luck < b.speed + b.luck) return 1;
  if (a.speed + a.luck > b.speed + b.luck) return -1;
  return 0;
} )
```

**If horse 0's attributes are more than 20% better than the next best horse then bet 20% of your cash on horse 0 to win.**

```
if ( horses[0].odds > 1 && (horses[0].speed + horses[0].luck) > (horses[1].speed + horses[1].luck) * 1.2 ) betToWin( horses[0], cash * 0.2 )
```


**If horse 0's odds are greater than 3, bet 20% of available cash. If you bet **to place** on a horse with odds < 4, you will lose money even if the horse wins.**


```
if ( horses[0].odds >= 4 ) betToPlace( horses[0], cash * 0.2 )
```
