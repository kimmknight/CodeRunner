export default function crunch(number, decimals = 2) {
    number = Number(number)
    var suffix = "";
    var precision = decimals;



    if (number >= (10 ** 3003)) {
        number = number / (10 ** 3003);
        suffix = "millinillion";
    } else if (number >= (10 ** 2703)) {
        number = number / (10 ** 2703);
        suffix = "nongentillion";
    } else if (number >= (10 ** 2403)) {
        number = number / (10 ** 2403);
        suffix = "octingentillion";
    } else if (number >= (10 ** 2103)) {
        number = number / (10 ** 2103);
        suffix = "septingentillion";
    } else if (number >= (10 ** 1803)) {
        number = number / (10 ** 1803);
        suffix = "sescentillion";
    } else if (number >= (10 ** 1503)) {
        number = number / (10 ** 1503);
        suffix = "quingentillion";
    } else if (number >= (10 ** 1203)) {
        number = number / (10 ** 1203);
        suffix = "quadringentillion";
    } else if (number >= (10 ** 903)) {
        number = number / (10 ** 903);
        suffix = "trecentillion";
    } else if (number >= (10 ** 603)) {
        number = number / (10 ** 603);
        suffix = "ducentillion";
    } else if (number >= (10 ** 573)) {
        number = number / (10 ** 573);
        suffix = "nonagintacentillion";
    } else if (number >= (10 ** 543)) {
        number = number / (10 ** 543);
        suffix = "octogintacentillion";
    } else if (number >= (10 ** 513)) {
        number = number / (10 ** 513);
        suffix = "septuagintacentillion";
    } else if (number >= (10 ** 483)) {
        number = number / (10 ** 483);
        suffix = "sexagintacentillion";
    } else if (number >= (10 ** 453)) {
        number = number / (10 ** 453);
        suffix = "quinqua­gintacent­illion";
    } else if (number >= (10 ** 423)) {
        number = number / (10 ** 423);
        suffix = "quadra­gintacent­illion";
    } else if (number >= (10 ** 393)) {
        number = number / (10 ** 393);
        suffix = "trigintacentillion";
    } else if (number >= (10 ** 366)) {
        number = number / (10 ** 366);
        suffix = "unviginticentillion";
    } else if (number >= (10 ** 363)) {
        number = number / (10 ** 363);
        suffix = "viginticentillion";
    } else if (number >= (10 ** 336)) {
        number = number / (10 ** 336);
        suffix = "undecicentillion";
    } else if (number >= (10 ** 333)) {
        number = number / (10 ** 333);
        suffix = "decicentillion";
    } else if (number >= (10 ** 306)) {
        number = number / (10 ** 306);
        suffix = "uncentillion";
    } else if (number >= (10 ** 303)) {
        number = number / (10 ** 303);
        suffix = "centillion";
    } else if (number >= (10 ** 273)) {
        number = number / (10 ** 273);
        suffix = "nonagintillion";
    } else if (number >= (10 ** 243)) {
        number = number / (10 ** 243);
        suffix = "octogintillion";
    } else if (number >= (10 ** 213)) {
        number = number / (10 ** 213);
        suffix = "septuagintillion";
    } else if (number >= (10 ** 183)) {
        number = number / (10 ** 183);
        suffix = "sexagintillion";
    } else if (number >= (10 ** 153)) {
        number = number / (10 ** 153);
        suffix = "quinquagintillion";
    } else if (number >= (10 ** 123)) {
        number = number / (10 ** 123);
        suffix = "quadragintillion";
    } else if (number >= (10 ** 120)) {
        number = number / (10 ** 120);
        suffix = "noventrigintillion";
    } else if (number >= (10 ** 117)) {
        number = number / (10 ** 117);
        suffix = "octotrigintillion";
    } else if (number >= (10 ** 114)) {
        number = number / (10 ** 114);
        suffix = "septentrigintillion";
    } else if (number >= (10 ** 111)) {
        number = number / (10 ** 111);
        suffix = "sestrigintillion";
    } else if (number >= (10 ** 108)) {
        number = number / (10 ** 108);
        suffix = "quintrigintillion";
    } else if (number >= (10 ** 105)) {
        number = number / (10 ** 105);
        suffix = "quattuor­trigint­illion";
    } else if (number >= (10 ** 102)) {
        number = number / (10 ** 102);
        suffix = "trestrigintillion";
    } else if (number >= (10 ** 99)) {
        number = number / (10 ** 99);
        suffix = "duotrigintillion";
    } else if (number >= (10 ** 96)) {
        number = number / (10 ** 96);
        suffix = "untrigintillion";
    } else if (number >= (10 ** 93)) {
        number = number / (10 ** 93);
        suffix = "trigintillion";
    } else if (number >= (10 ** 90)) {
        number = number / (10 ** 90);
        suffix = "novemvigintillion";
    } else if (number >= (10 ** 87)) {
        number = number / (10 ** 87);
        suffix = "octovigintillion";
    } else if (number >= (10 ** 84)) {
        number = number / (10 ** 84);
        suffix = "septemvigintillion";
    } else if (number >= (10 ** 81)) {
        number = number / (10 ** 81);
        suffix = "sesvigintillion";
    } else if (number >= (10 ** 78)) {
        number = number / (10 ** 78);
        suffix = "quinvigintillion";
    } else if (number >= (10 ** 75)) {
        number = number / (10 ** 75);
        suffix = "quattuor­vigint­illion";
    } else if (number >= (10 ** 72)) {
        number = number / (10 ** 72);
        suffix = "tresvigintillion";
    } else if (number >= (10 ** 69)) {
        number = number / (10 ** 69);
        suffix = "duovigintillion";
    } else if (number >= (10 ** 66)) {
        number = number / (10 ** 66);
        suffix = "unvigintillion";
    } else if (number >= (10 ** 63)) {
        number = number / (10 ** 63);
        suffix = "vigintillion";
    } else if (number >= (10 ** 60)) {
        number = number / (10 ** 60);
        suffix = "novendecillion";
    } else if (number >= (10 ** 57)) {
        number = number / (10 ** 57);
        suffix = "octodecillion";
    } else if (number >= (10 ** 54)) {
        number = number / (10 ** 54);
        suffix = "septendecillion";
    } else if (number >= (10 ** 51)) {
        number = number / (10 ** 51);
        suffix = "sedecillion";
    } else if (number >= (10 ** 48)) {
        number = number / (10 ** 48);
        suffix = "quindecillion";
    } else if (number >= (10 ** 45)) {
        number = number / (10 ** 45);
        suffix = "quattuordecillion";
    } else if (number >= (10 ** 42)) {
        number = number / (10 ** 42);
        suffix = "tredecillion";
    } else if (number >= (10 ** 39)) {
        number = number / (10 ** 39);
        suffix = "duodecillion";
    } else if (number >= (10 ** 36)) {
        number = number / (10 ** 36);
        suffix = "undecillion";
    } else if (number >= (10 ** 33)) {
        number = number / (10 ** 33);
        suffix = "decillion";
    } else if (number >= (10 ** 30)) {
        number = number / (10 ** 30);
        suffix = "nonillion";
    } else if (number >= (10 ** 27)) {
        number = number / (10 ** 27);
        suffix = "octillion";
    } else if (number >= (10 ** 24)) {
        number = number / (10 ** 24);
        suffix = "septillion";
    } else if (number >= (10 ** 21)) {
        number = number / (10 ** 21);
        suffix = "sextillion";
    } else if (number >= (10 ** 18)) {
        number = number / (10 ** 18);
        suffix = "quintillion";
    } else if (number >= (10 ** 15)) {
        number = number / (10 ** 15);
        suffix = "quadrillion";
    } else if (number >= (10 ** 12)) {
        number = number / (10 ** 12);
        suffix = "trillion";
    } else if (number >= (10 ** 9)) {
        number = number / (10 ** 9);
        suffix = "billion";
    } else if (number >= (10 ** 6)) {
        number = number / (10 ** 6);
        suffix = "million";
    } else if (number < (10 ** 6)) {
        precision = 0;
    }

    const numberTrimmed = Number(number.toFixed(precision))
    return numberTrimmed.toLocaleString("en-US") + " " + suffix;
}