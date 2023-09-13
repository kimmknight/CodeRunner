export default [
    {
        title: "Bailout",
        description: "Pawn some belongings to support your gambling addiction.",
        requirementsText: "Be poor",
        requirements: function(game) {
            return true;
        },
        showRequirements: function(game) {
            return game.cash <= 1n;
        },
        effect: function(game) {
            game.cash += 150n;
        }
    },
    {
        title: "Automate",
        description: "Installs the AutoRace feature. When one race finishes, another starts automatically.",
        requirementsText: "100 races completed",
        requirements: function(game) {
            return game.history.raceCount >= 100;
        },
        showRequirements: function(game) {
            return !game.story.autoRaceAvailable && (game.history.raceCount >= 10);
        },
        effect: function(game) {
            game.story.autoRaceAvailable = true;
        }
    },
    {
        title: "Smart Soil",
        description: "Wi-Fi connected track. Allows full control of track conditions.",
        requirementsText: "50 bets placed",
        requirements: function(game) {
            return game.history.betCount >= 50;
        },
        showRequirements: function(game) {
            return !game.story.smartSoil && game.history.betCount >= 11;
        },
        effect: function(game) {
            game.story.smartSoil = true;
        }
    },
    {
        title: "Titanium Horseshoes",
        description: "Legit thing. Gives horses a speed boost.",
        requirementsText: "25 bets placed",
        requirements: function(game) {
            return game.history.betCount >= 25;
        },
        showRequirements: function(game) {
            return !game.story.titaniumHorseshoes && game.history.betCount >= 13;
        },
        effect: function(game) {
            game.story.titaniumHorseshoes = true;
            game.settings.raceIntervalMs -= 4;
        }
    },
    {
        title: "High Altitude Training",
        description: "More red blood cells. Gives horses a speed boost.",
        requirementsText: "100 bets placed",
        requirements: function(game) {
            return game.history.betCount >= 100;
        },
        showRequirements: function(game) {
            return !game.story.highAltitudeTraining && game.history.betCount >= 50;
        },
        effect: function(game) {
            game.story.highAltitudeTraining = true;
            game.settings.raceIntervalMs -= 2;
        }
    },
    {
        title: "Horse Speed",
        description: "Get off, you're high, horse. Gives horses a speed boost.",
        requirementsText: "200 bets placed",
        requirements: function(game) {
            return game.history.betCount >= 200;
        },
        showRequirements: function(game) {
            return !game.story.horseSpeed && game.history.betCount >= 120;
        },
        effect: function(game) {
            game.story.horseSpeed = true;
            game.settings.raceIntervalMs -= 2
        }
    },
    {
        title: "Jockey Weight Loss Program",
        description: "Better power-to-weight ratios. Gives horses a speed boost.",
        requirementsText: "300 bets placed",
        requirements: function(game) {
            return game.history.betCount >= 300;
        },
        showRequirements: function(game) {
            return !game.story.jockeyWeightLossProgram && game.history.betCount >= 220;
        },
        effect: function(game) {
            game.story.jockeyWeightLossProgram = true;
            game.settings.raceIntervalMs -= 2;
        }
    },
    {
        title: "Horseshoe Spring Mod",
        description: "Propelled horses. Gives horses a speed boost.",
        requirementsText: "500 bets placed",
        requirements: function(game) {
            return game.history.betCount >= 300;
        },
        showRequirements: function(game) {
            return !game.story.horseshoeSprings && game.history.betCount >= 220;
        },
        effect: function(game) {
            game.story.horseshoeSprings = true;
            game.settings.raceIntervalMs -= 2;
        }
    },
    {
        title: "Skip Drug Testing",
        description: "Save time. Reduce the delay between races by 25%.",
        requirementsText: "80 races completed",
        requirements: function(game) {
            return game.history.raceCount >= 80;
        },
        showRequirements: function(game) {
            return !game.story.skipDrugTesting && game.history.raceCount >= 40;
        },
        effect: function(game) {
            game.story.skipDrugTesting = true;
            game.autoRace.timeout -= 500;
        }
    },
    {
        title: "Giddy Up",
        description: "Hurry along now. Reduce the delay between races by an additional 25%.",
        requirementsText: "160 races completed",
        requirements: function(game) {
            return game.history.raceCount >= 160;
        },
        showRequirements: function(game) {
            return !game.story.giddyUp && game.history.raceCount >= 125;
        },
        effect: function(game) {
            game.story.giddyUp = true; game.autoRace.timeout -= 500;
        }
    },
    {
        title: "Conveyor Belt System",
        description: "Get them in. Get them out. Reduce the delay between races by an additional 25%.",
        requirementsText: "320 races completed",
        requirements: function(game) {
            return game.history.raceCount >= 320;
        },
        showRequirements: function(game) {
            return !game.story.conveyorBeltSystem && game.history.raceCount >= 180;
        },
        effect: function(game) {
            game.story.conveyorBeltSystem = true; game.autoRace.timeout -= 500;
        }
    },
    {
        title: "Protein Shakes",
        description: "Horses recover faster. Reduce the delay between races by an additional 25%.",
        requirementsText: "500 races completed",
        requirements: function(game) {
            return game.history.raceCount >= 500;
        },
        showRequirements: function(game) {
            return !game.story.proteinShakes && game.history.raceCount >= 305;
        },
        effect: function(game) {
            game.story.proteinShakes = true;
            game.autoRace.timeout -= 500;
        }
    },
    {
        title: "⭐ First Bet Placed",
        description: "Well done. Have some cash.",
        requirementsText: "",
        requirements: function(game) {
            return game.history.betCount >= 1;
        },
        showRequirements: function(game) {
            return !game.story.rewardFirstBetPlaced && game.cash < 1000n && game.history.betCount >= 1;
        },
        effect: function(game) {
            game.story.rewardFirstBetPlaced = true;
            game.cash *= 2n;
        }
    },
    {
        title: "Shuffle Horses",
        description: "Swap out some horses with others in the local area.",
        requirementsText: "20% of available cash",
        requirements: function(game) {
            return game.cash >= 5 && !game.race.shuffleNext;
        },
        showRequirements: function(game) {
            return game.history.raceCount >= 10;
        },
        effect: function(game) {
            game.race.shuffleNext = true;
        }
    },
    // {
    //     title: "XXXXXXXX",
    //     description: "XXXXXXXX",
    //     requirementsText: "XXXXXXXX",
    //     requirements: function(game) {
    //         return XXXXXXXX;
    //     },
    //     showRequirements: function(game) {
    //         return !game.story.STORYSHORTNAME && XXXXXXXX;
    //     },
    //     effect: function(game) {
    //         game.story.STORYSHORTNAME = true;
    //     }
    // },
]
