<template>
    <div class="container-fluid container-lg d-flex flex-column align-items-center align-items-md-start pb-3">

        <header class="p-3 d-flex align-items-center">
            <img src="/src/assets/horse.png" class="logo">
            <h4 class="m-0 mt-1">Code Runner</h4>
        </header>

        <div id="stickybox" class="w-100 sticky-top d-flex flex-column bg-white">
            <div class="container-fluid border bg-white rounded py-2 mt-2 mb-4 d-flex flex-column">
                <div class="d-flex justify-content-between align-items-center">

                    <span class="">Cash: <b>${{ toWord(game.cash) }}</b></span>

                    <div class="" v-if="!game.autoRace.enabled">
                        <button type="button" class="btn btn-sm btn-outline-secondary shadow-none me-2" @click="initRace"
                            v-if="!game.autoRace.enabled && game.race.status > 0"
                            :disabled="game.autoRace.enabled || game.race.status == 1">Next race</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary shadow-none me-2" @click="startRace"
                            v-if="!game.autoRace.enabled && game.race.status == 0">Start
                            race</button>
                    </div>

                    <div class="d-flex" v-if="game.story.autoRaceAvailable">
                        <span>AutoRace:</span>
                        <div class="form-check form-switch ms-2">
                            <input class="form-check-input" type="checkbox" v-model="game.autoRace.enabled"
                                @click="autoRaceToggled" />
                        </div>
                    </div>

                    <span class="text-end">Race <b>#{{ game.history.raceCount }}</b></span>

                </div>
            </div>
        </div>


        <div class="container-fluid p-0">
            <div class="row">
                <div class="col">
                    <div
                        class="p-3 border bg-dark text-light rounded mb-4 w-100 log-container d-flex flex-column-reverse overflow-hidden">
                        <span v-for="logItem in game.logArray.toReversed()">
                            {{ logItem }}
                            <br>
                        </span>
                    </div>
                </div>
            </div>
            <div class="row masonry">
                <div class="col-lg-6">
                    <div class="p-3 border bg-white rounded mb-4 w-100 position-relative">
                        <span class="position-absolute end-0 mx-2 h4" v-if="game.race.bets.length > 0 && game.race.status == 1">🤍</span>
                        <h4>Racetrack:</h4>
                        <div v-for="(horseNumber, index) in game.race.racingHorses" class="d-flex align-items-center">
                            <div class="me-3 text-dark" style="font-size: x-small">{{ index }}</div>
                            <div style="width: 3em;">
                                <span class="badge bg-dark" style="width: 3.2em">{{ getHorseOdds(horseNumber) }}:1</span>
                            </div>
                            <div class="d-flex align-items-center" style="width: 8em">
                                <div data-bs-toggle="popover" tabindex="0" data-bs-trigger="focus"
                                    :title="game.horses[horseNumber].name + ' stats'" :data-bs-content="'Wins: ' + game.horses[horseNumber].wins + ', ' +
                                        'Places: ' + game.horses[horseNumber].places + ', ' +
                                        'Races: ' + game.horses[horseNumber].raceCount + ', ' +
                                        'Speed: ' + game.horses[horseNumber].speed + ', ' +
                                        'Luck: ' + game.horses[horseNumber].luck
                                        ">
                                    <span>{{ game.horses[horseNumber].name }}</span>
                                </div>
                            </div>
                            <div class="position-relative flex-grow-1">
                                <input class="racetrack w-100"
                                    :class="{ running: game.race.status == 1 && !game.horses[horseNumber].finished }"
                                    type="range" min="0" :max="game.settings.trackLength"
                                    v-model="game.horses[horseNumber].position" disabled>

                                <span v-if="game.horses[horseNumber].placing"
                                    class="badge text-light m-2 position-absolute start-0"
                                    :class="{ 'bg-success': game.horses[horseNumber].placing < 4, 'bg-secondary': game.horses[horseNumber].placing >= 4 }">
                                    #{{ game.horses[horseNumber].placing }}</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="col-lg-6">
                    <div class="w-100 border bg-white rounded p-3 position-relative mb-4">
                        <h5 class="me-2">History:</h5>
                        <div class="d-flex justify-content-between flex-wrap" v-if="game.history.betCount != 0">

                            <span class="small text-center">Won: <b>{{ game.history.totalRacesWon }}</b></span>
                            <span class="small text-center">Lost: <b>{{ game.history.totalRacesLost }}</b></span>
                            <span class="small text-center">Total: <b>{{ game.history.betCount }}</b></span>
                            <span class="small text-center">Win rate: <b>{{ getWinRate() }}%</b></span>
                            <span class="small text-center">Races/Bets: <b>{{ +parseFloat(game.history.raceCount /
                                game.history.betCount).toFixed(1) }}</b></span>
                        </div>

                        <Chart :chart-data="game.history.recent.slice(-25)" v-if="game.history.betCount != 0"
                            class="mt-3" />

                        <div class="accordion accordion-flush mt-3" id="historyAccordion" v-if="game.history.betCount != 0">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-heading">
                                    <button class="accordion-button collapsed bg-white text-dark" type="button"
                                        data-bs-toggle="collapse" data-bs-target="#flush-collapse" aria-expanded="true"
                                        aria-controls="flush-collapseOne">
                                        Details
                                    </button>
                                </h2>
                                <div id="flush-collapse" class="accordion-collapse collapse"
                                    aria-labelledby="flush-heading" data-bs-parent="#historyAccordion">
                                    <div class="accordion-body p-0">
                                        <div class="history-container rounded border font-monospace p-1 small my-2">
                                            <div v-for="bet in game.history.recent.slice().reverse()"
                                                class="d-flex align-items-center border my-1 px-1 bg-light">

                                                <span class="me-3">Race #{{ bet.raceNumber }}</span>
                                                <!-- <span class="me-3"
                                                    :class="{ 'text-danger': (!bet.won), 'text-success': bet.won }"><b>{{
                                                        bet.won ? "WIN" : "LOSS" }}</b></span> -->

                                                <span class="badge rounded-pill me-3"
                                                    :class="{ 'bg-danger': (!bet.won), 'bg-success': bet.won }"><b>{{
                                                        bet.won ? "WIN" : "LOSS" }}</b></span>

                                                <div class="d-flex flex-column">
                                                    <div>
                                                        <span class="me-3" v-if="!bet.type.includes('Trifecta')"><b>{{
                                                            game.horses[bet.horses[0]].name }}</b></span>
                                                        <!-- <span v-if="bet.type.includes('Trifecta')" class="trifecta-names me-2">{{
                                                            game.horses[bet.horses[0]].name }}<br>{{ game.horses[bet.horses[1]].name }}<br>{{ game.horses[bet.horses[2]].name }}</span> -->
                                                            <span class="badge rounded-pill border text-dark bg-white">{{ Number((bet.payout / bet.bet).toFixed(1)) }}:1</span>

                                                    </div>

                                                    <div class="small">
                                                        <span class="me-2">${{ toWord(bet.bet) }}</span>

                                                        <span class="me-3"><b>{{ bet.type }}</b></span>

                                                        <span class="me-2"
                                                            :class="{ 'text-danger': (bet.outcome < 0), 'text-success': (bet.outcome > 0) }">{{
                                                                bet.outcome < 0 ? '-$' : '+$' }}{{ toWord(Math.abs(bet.outcome))
    }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p class="text-center" v-if="game.history.betCount == 0">No bets have been placed yet.</p>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="w-100 border bg-white rounded p-3 d-flex flex-column mb-4">
                        <h5>Projects:</h5>

                        <div class="my-1 text-dark d-flex flex-column item-container">
                            <div v-for="project in projects" class=" w-100">
                                <button
                                    class="btn border rounded p-2 my-1 d-flex flex-column align-items-center bg-light w-100"
                                    v-if="project.showRequirements(game)" :disabled="!project.requirements(game)"
                                    @click="project.effect(game)">
                                    <span>
                                        <b>{{ project.title }}</b>
                                        <span v-if="project.requirementsText"> ({{ project.requirementsText }})</span>
                                    </span>
                                    <span>{{ project.description }}</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="p-3 border bg-white rounded w-100 position-relative mb-4">
                        <h5>Options:</h5>
                        <div v-if="game.story.smartSoil">
                            <span><b>Track Conditions</b></span>
                            <div class="d-flex justify-content-between small">
                                <span>Slower/More certain</span>
                                <span>Faster/Less predictable</span>
                            </div>
                            <input class="w-100" type="range" min="0" max="1" step="0.1"
                                v-model="game.settings.randomInfluenceBonus" />
                        </div>
                        <div class="mt-3">
                            <!-- <span><b>Horses</b></span> -->

                        </div>
                    </div>
                </div>

                <!-- <div class="col-lg-6">
                    <div class="p-3 border bg-white rounded w-100 position-relative mb-4">
                        <h5>Actions:</h5>
                        <div>
                            <button type="button"
                                class="btn border rounded p-2 my-1 d-flex flex-column bg-light align-items-center w-100"
                                v-if="game.history.raceCount > 10 || game.history.betCount >= 1" @click="shuffleHorses"
                                :disabled="game.race.shuffleNext">
                                <span>
                                    <b>Shuffle Horses</b>
                                    (20% of available cash)
                                </span>
                                <span>A new set of horses to race.</span>
                            </button>
                        </div>
                    </div>
                </div> -->
            </div>

            <div class="row">
                <div class="col">
                    <div class="d-flex flex-wrap w-100">
                        <div class="p-3 border bg-white rounded w-100 position-relative mb-4">
                            <div class="w-100 d-flex justify-content-between mb-2">
                                <h5>Code Editor:</h5>
                                <div>

                                    <div class="btn-group me-2" role="group" aria-label="">
                                        <div class="btn-group" role="group">
                                            <button id="dropdownId" type="button" class="editor-button btn btn-sm border mb-1 dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" data-bs-auto-close="outside"
                                                    aria-expanded="false">
                                                    <img class="editor-button-image" src="/src/assets/themes.svg" />
                                            </button>
                                            <div class="dropdown-menu" aria-labelledby="dropdownId" style="max-height: 50vh; overflow-y: scroll;">
                                                <div v-for="theme in themeList">
                                                    
                                                    <a class="dropdown-item" href="#" @click="changeTheme(theme)" :class="{'active': theme == game.editor.theme}">
                                                    <!-- <a class="dropdown-item" href="#" @click="game.editor.theme = theme" :class="{'active': theme == game.editor.theme}"> -->
                                                        <span>{{ theme }}</span>
                                                        <!-- <span v-if="theme == game.editor.theme"> ✔ </span> -->
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="btn-group me-2" role="group">
                                        <button type="button" class="editor-button btn btn-sm border mb-1" title="Copy"
                                            @click="copyCodeToClipboard"><img class="editor-button-image"
                                                src="/src/assets/copy.svg" /></button>
                                        <button type="button" class="editor-button btn btn-sm border mb-1" title="Paste"
                                            @click="pasteCodeFromClipboard"><img class="editor-button-image"
                                                src="/src/assets/paste.svg" /></button>
                                    </div>
                                    <div class="btn-group me-2" role="group">
                                        <button type="button" class="editor-button btn btn-sm border mb-1" title="Wrap"
                                            @click="game.editor.wrap = !game.editor.wrap"><img class="editor-button-image"
                                                src="/src/assets/wrap.svg"
                                                :class="{ 'opacity-25': !game.editor.wrap }" /></button>
                                    </div>
                                    <div class="btn-group me-2" role="group">
                                        <button type="button" class="editor-button btn btn-sm border mb-1" title="Export"
                                            @click="downloadInBrowser"><img class="editor-button-image"
                                                src="/src/assets/export.svg" /></button>
                                        <button type="button" class="editor-button btn btn-sm border mb-1"
                                            :disabled="game.code == game.newCode" title="Revert"
                                            @click="game.newCode = game.code"><img class="editor-button-image"
                                                src="/src/assets/revert.svg" /></button>
                                        <button type="button" class="editor-button btn btn-sm mb-1"
                                            :class="[game.code != game.newCode ? 'btn-outline-danger' : 'border']"
                                            :disabled="game.code == game.newCode" title="Save" @click="codeEditorSave"><img
                                                :class="[game.code != game.newCode ? 'make-red' : '']"
                                                class="editor-button-image" src="/src/assets/save.svg" /></button>
                                    </div>
                                </div>
                            </div>

                            <!-- <p>
                                <b>
                                    <textarea id="console" class="form-control border font-monospace bg-dark text-success"
                                        :class="[game.code != game.newCode ? 'unsaved' : '']" v-model="game.newCode"
                                        style="height: 25em;" @keydown.ctrl.s.prevent="codeEditorSave"
                                        spellcheck=”false”></textarea>
                                </b>
                            </p> -->

                            <p>
                                <CodeEditor class="w-100" v-model="game.newCode" :tab-spaces="4"
                                    :copy-code="false" height="24em" :theme="game.editor.theme" :header="false" :line-nums="true" :wrap="game.editor.wrap">
                                </CodeEditor>
                            </p>


                            <div class="accordion accordion-flush" id="docsAccordion">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingOne">
                                        <button class="accordion-button collapsed bg-white text-dark" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#flush-collapseOne"
                                            aria-expanded="false" aria-controls="flush-collapseOne">
                                            Getting Started Guide
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne" class="accordion-collapse collapse"
                                        aria-labelledby="flush-headingOne" data-bs-parent="#docsAccordion">
                                        <div class="accordion-body position-relative pt-0">
                                            <Tutorial />
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingTwo">
                                        <button class="accordion-button collapsed bg-white text-dark" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo"
                                            aria-expanded="false" aria-controls="flush-collapseTwo">
                                            Links
                                        </button>
                                    </h2>
                                    <div id="flush-collapseTwo" class="accordion-collapse collapse"
                                        aria-labelledby="flush-headingTwo" data-bs-parent="#docsAccordion">
                                        <div class="accordion-body">
                                            <Links />
                                        </div>
                                    </div>
                                </div>
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="flush-headingThree">
                                        <button class="accordion-button collapsed bg-white text-dark" type="button"
                                            data-bs-toggle="collapse" data-bs-target="#flush-collapseThree"
                                            aria-expanded="false" aria-controls="flush-collapseThree">
                                            Quick Reference
                                        </button>
                                    </h2>
                                    <div id="flush-collapseThree" class="accordion-collapse collapse"
                                        aria-labelledby="flush-headingThree" data-bs-parent="#docsAccordion">
                                        <div class="accordion-body">
                                            <QuickReference :game="game" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>





        <div class="w-100 my-2 border bg-white rounded p-3 position-relative" v-if="debug">
            <h5>Debug:</h5>

            <div class="d-flex flex-wrap">
                <div class="mb-3 m-1">
                    <label class="form-label">horsesPerRace</label>
                    <input type="number" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
                        v-model="game.settings.horsesPerRace">
                </div>
    
                <div class="mb-3 m-1">
                    <label class="form-label">trackLength</label>
                    <input type="number" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
                        v-model="game.settings.trackLength">
                </div>
    
                <div class="mb-3 m-1">
                    <label class="form-label">randomInfluence (+ {{ game.settings.randomInfluenceBonus }})</label>
                    <input type="number" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
                        v-model="game.settings.randomInfluence">
                </div>
    
                <div class="mb-3 m-1">
                    <label class="form-label">moveConstant</label>
                    <input type="number" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
                        v-model="game.settings.moveConstant">
                </div>
    
                <div class="mb-3 m-1">
                    <label class="form-label">raceIntervalMs</label>
                    <input type="number" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
                        v-model="game.settings.raceIntervalMs">
                </div>
    
                <div class="mb-3 m-1">
                    <label class="form-label">autoRace.timeout</label>
                    <input type="number" class="form-control" name="" id="" aria-describedby="helpId" placeholder=""
                        v-model="game.autoRace.timeout">
                </div>
            </div>

            <div class="d-flex flex-wrap">
                <button class="btn btn-sm btn-outline-secondary fs-5 shadow-none m-1"
                    @click="game.story.autoRaceAvailable = true">AutoRace Available</button>
                <button class="btn btn-sm btn-outline-secondary fs-5 shadow-none m-1"
                    @click="game.story.smartSoil = true">Smart Soil Available</button>
                <button class="btn btn-sm btn-outline-secondary fs-5 shadow-none m-1"
                    @click="game.settings.raceIntervalMs = 0; game.autoRace.timeout = 0">Full Speed Horses</button>
                <button class="btn btn-sm btn-outline-secondary fs-5 shadow-none m-1"
                    @click="game.history.raceCount += 10000; game.history.betCount += 10000">High Race and Bet Count</button>
                <button class="btn btn-sm btn-outline-secondary fs-5 shadow-none m-1"
                    @click="game.history.raceCount -= 10000; game.history.betCount -= 10000">Low Race and Bet Count</button>
                <button class="btn btn-sm btn-outline-secondary fs-5 shadow-none m-1" @click="resetGame()">Reset
                    Game</button>
                <button class="btn btn-sm btn-outline-secondary fs-5 shadow-none m-1"
                    @click="game.story = {}">Reset Story</button>
            </div>

            <div class="mt-3">
                <p><b>Story:</b></p>
                <pre class="mx-0">{{ JSON.stringify(game.story, null, 4) }}</pre>
            </div>
            
        </div>

        <footer class="w-100 d-flex justify-content-center">
            <span class="small">By <b><a href="https://github.com/kimmknight" class="text-dark">kimmknight</a></b>.</span>
        </footer>
    </div>
</template>

<script>
BigInt.prototype.toJSON = function () { return this.toString() } // Extend JSON to store a BigInt. It stores it as a string.

import horseList from "/src/assets/horses.js"
import projectsSource from "/src/assets/projects.js"
import numberCruncher from "/src/assets/numbercruncher.js"
import editorThemes from "/src/assets/editorthemes.js"

import Chart from './Chart.vue'
import Tutorial from './Tutorial.vue'
import QuickReference from './QuickReference.vue'
import Links from './Links.vue'

import hljs from 'highlight.js';
import CodeEditor from 'simple-code-editor';

export default {

    name: "Interface",

    components: { Chart, CodeEditor, Tutorial, QuickReference, Links },

    data() {
        return {
            game: {
                cash: 150n,
                
                editor: {
                    wrap: false,
                    theme: "devibeans"
                },
                code: "",
                newCode: "",
                codeEnabled: true,
                logArray: ["Welcome to Code Runner."],
                autoRace: {
                    enabled: false,
                    timeout: 2000
                },
                history: {
                    recent: [],
                    raceCount: 0,
                    betCount: 0,
                    totalRacesWon: 0,
                    totalRacesLost: 0,
                    totalCashWon: 0,
                    totalCashLost: 0
                },
                horses: horseList,
                horsesPool: [], // horsesPool: an array of all horses available to participate in races
                race: {
                    bets: []
                }, // race: an object representing the current race, including information about the horses and the results
                settings: {
                    maxHorsesPool: 20, // maxHorsesPool: the maximum number of horses that can be available in the pool of horses that can participate in races
                    horsesPerRace: 8, // horsesPerRace: the number of horses that can participate in a single race
                    trackLength: 1600, // trackLength: the length of the track in meters
                    raceIntervalMs: 12, // raceIntervalMs: the interval between each movement in milliseconds (1 = Fast, 15= Medium, 40=Slow)
                    moveConstant: 1, // moveConstant: a constant that determines how much each horse moves during each interval of a race
                    speedInfluence: 0.035, // speedInfluence: a decimal value that represents the influence of a horse's speed on its performance in a race (where a higher value means more influence)
                    luckInfluence: 0.025, // luckInfluence: a decimal value that represents the influence of luck on a horse's performance in a race (where a higher value means more influence)
                    randomInfluence: 5, // randomInfluence: a constant that determines the amount of randomness in a horse's performance in a race (where a higher value means more randomness)
                    randomInfluenceBonus: 0,
                    betHistorySize: 25
                },
                log: ["Welcome to Code Runner.", "Get coding!", "Another thing...", "Yep, more...", "Even more"],
                story: {
                },
                userStore: undefined,
                // userState: {}
            },

            themeList: editorThemes,

            msnry: null,

            projects: projectsSource,

            betTypes: ["To Win", "To Place"], //, "Trifecta","Box Trifecta"]

            debug: false

        }
    },

    methods: {
        toggleDebug(status = "toggle") {
            if (status == "toggle") {
                this.debug = !this.debug
            } else if (status == true || status == false) {
                this.debug = status
            }

        },

        // Returns a deep copy of the given array
        deepCopy(arr) {
            return JSON.parse(JSON.stringify(arr))
        },


        // Returns an array of random, unique positions in the given array
        getRandomArrayPositions(arr, size) {
            // Get the maximum position in the array
            const positionMax = arr.length - 1

            let positions = []
            // Generate an array of unique random positions in the given array
            for (let i = 0; i < size; i++) {
                let newPosition = Math.round(Math.random() * positionMax)

                // Keep generating new positions until we get a unique one
                while (positions.includes(newPosition)) {
                    newPosition = Math.round(Math.random() * positionMax)
                }

                positions.push(newPosition)
            }

            return positions
        },


        // Initializes the pool of horses that can participate in races
        initHorsesPool() {
            // Get a random selection of horses from the full list of horses
            this.game.horsesPool = this.getRandomArrayPositions(this.game.horses, this.game.settings.maxHorsesPool)

            // Initialize the attributes of each horse in the pool
            for (let horseNumber of this.game.horsesPool) {
                if (!this.game.horses[horseNumber].speed) {
                    this.game.horses[horseNumber].speed = Math.floor(Math.random() * 9) + 1 // 1 to 10
                    this.game.horses[horseNumber].luck = Math.floor(Math.random() * 9) + 1 // 1 to 10
                    this.game.horses[horseNumber].wins = 0
                    this.game.horses[horseNumber].places = 0
                    this.game.horses[horseNumber].raceCount = 0
                    this.game.horses[horseNumber].position = 0
                }
            }
        },


        shuffleHorses() {
            this.game.race.shuffleNext = true
            this.game.cash = this.game.cash * 8n / 10n
        },


        // Initializes a new race
        initRace() {
            // Increment the race count
            this.game.history.raceCount++

            this.shuffleOnSchedule()

            if (this.game.race.shuffleNext == true) {
                this.log(this.game.history.raceCount + " races completed. Shuffling horses...")
                this.initHorsesPool()
                this.game.race.shuffleNext = false
            }

            // Reset the race object
            this.game.race = {}
            // The race has not started yet
            this.game.race.status = 0
            // No horses have finished yet
            this.game.race.finishedCount = 0
            // The array of horses participating in this race
            this.game.race.racingHorses = []
            // The array of bets placed on this race
            this.game.race.bets = []

            // Reset the attributes of each horse
            for (let horse of this.game.horses) {
                horse.position = 0
                horse.placing = 0
                horse.finished = false
            }

            // Select a random group of horses from the pool to participate in this race
            const randomArray = this.getRandomArrayPositions(this.game.horsesPool, this.game.settings.horsesPerRace)
            for (let position of randomArray) {
                this.game.race.racingHorses.push(this.game.horsesPool[position])
            }

            // Calculate the total odds of all horses participating in this race
            this.game.race.oddsTotal = 0
            for (let position of this.game.race.racingHorses) {
                this.game.race.oddsTotal += this.game.horses[position].speed * 2 + this.game.horses[position].luck
            }

            // Init the Horse Stats popovers
            setTimeout(() => {
                this.initPopovers()
            }, 200)

        },


        // Starts the race
        startRace() {
            this.pruneHistory()

            // Place autoRaces if required
            if (this.game.codeEnabled) {
                this.runCode()
            }

            // Set the race status to "in progress"
            this.game.race.status = 1

            // Start an interval to move the horses and check if the race is finished
            let raceInterval = setInterval(() => {
                // Move the horses
                this.moveHorses()

                // If all horses have finished the race, end the race and pay out the bets
                if (this.game.race.finishedCount == this.game.settings.horsesPerRace) {
                    this.game.race.status = 2 // Set the race status to "finished"
                    this.payoutBets() // Pay out the bets
                    this.recordHorsesHistory() // Record the wins
                    this.recordBetHistory()
                    this.localStorageSave()
                    this.raceAgain()
                    clearInterval(raceInterval) // Stop the interval
                }
            }, this.game.settings.raceIntervalMs) // Run the interval every `raceIntervalMs` milliseconds
        },


        shuffleOnSchedule() {
            if (this.game.history.raceCount > 0 && this.game.history.raceCount % 100 == 0) {
                this.game.race.shuffleNext = true
            }
        },


        // Moves each horse in the race
        moveHorses() {
            // Move each horse in the race
            for (let horseNumber of this.game.race.racingHorses) {
                this.moveHorse(horseNumber)
            }
        },


        // Moves a single horse in the race
        moveHorse(horseNumber) {
            // Only move the horse if it has not finished the race yet
            if (!this.game.horses[horseNumber].finished) {
                // Calculate the factors that will affect the horse's movement
                const randomFactor = (parseFloat(this.game.settings.randomInfluence) + parseFloat(this.game.settings.randomInfluenceBonus)) * Math.random()
                const horseSpeedFactor = this.game.settings.speedInfluence * this.game.horses[horseNumber].speed
                const horseLuckFactor = this.game.settings.luckInfluence * this.game.horses[horseNumber].luck
                // Move the horse
                this.game.horses[horseNumber].position += this.game.settings.moveConstant + randomFactor +
                    horseSpeedFactor + horseLuckFactor
                // If the horse has reached the end of the track, mark it as finished and update its placing
                if (this.game.horses[horseNumber].position >= this.game.settings.trackLength) {
                    this.game.horses[horseNumber].finished = true
                    this.game.race.finishedCount += 1
                    this.game.horses[horseNumber].placing = this.game.race.finishedCount
                }
            }
        },


        // Record if the horse won or placed in the current race
        recordHorsesHistory() {
            for (let horse of this.game.race.racingHorses) {
                this.game.horses[horse].raceCount += 1
                // If the horse won, increment wins by 1
                if (this.game.horses[horse].placing == 1) {
                    this.game.horses[horse].wins += 1
                }
                // If the horse placed, increment places by 1
                if (this.game.horses[horse].placing <= 3) {
                    this.game.horses[horse].places += 1
                }
            }
        },


        // Calculates the odds for a horse in the current race
        getHorseOdds(horseNumber) {
            // Calculate the odds by dividing the total odds of all other horses by the odds of the specified horse and subtracting 1
            return Math.floor((this.game.race.oddsTotal - (this.game.horses[horseNumber].speed * 2 + this.game.horses[
                horseNumber].luck)) / (this.game.horses[horseNumber].speed * 2 + this.game.horses[horseNumber]
                    .luck)) - 1
        },


        payoutBets() {
            let payout = 0

            // Iterate over all bets in the current race
            for (let bet of this.game.race.bets) {
                // Assume the bet will win
                bet.won = true

                // Check if the bet type and horse placings match the conditions for a win
                if (bet.type == "To Win" &&
                    this.game.horses[bet.horses[0]].placing == 1) {
                    payout += this.calculatePayoutForBet(bet)

                } else if (bet.type == "To Place" &&
                    this.game.horses[bet.horses[0]].placing <= 3) {
                    payout += this.calculatePayoutForBet(bet)

                } else if (bet.type == "Trifecta" &&
                    this.game.horses[bet.horses[0]].placing == 1 &&
                    this.game.horses[bet.horses[1]].placing == 2 &&
                    this.game.horses[bet.horses[2]].placing == 3) {
                    payout += this.calculatePayoutForBet(bet)

                } else if (bet.type == "Box Trifecta" &&
                    this.game.horses[bet.horses[0]].placing <= 3 &&
                    this.game.horses[bet.horses[1]].placing <= 3 &&
                    this.game.horses[bet.horses[2]].placing <= 3) {
                    payout += this.calculatePayoutForBet(bet)

                } else {
                    // If the bet did not meet the conditions for a win, mark it as lost
                    bet.won = false
                }
            }

            // Add the total payout for all bets to the player's cash balance
            this.game.cash += BigInt(payout)
            return payout
        },


        // A wrapper for the in-game function
        calculatePayout(horse, amount, betType = "To Win") {
            let bet = {}

            let horses = [horse.number]
            bet.horses = horses

            bet.bet = Math.round(amount)
            bet.type = betType

            return this.calculatePayoutForBet(bet)
        },


        // Calculate the potential payout for a given bet (if it were successful)
        calculatePayoutForBet(bet) {

            // Start with a payout of $0
            let payout = 0

            if (bet.type == "To Win") {
                // To Win: Horse odds * Bet amount
                payout = this.getHorseOdds(bet.horses[0]) * bet.bet

            } else if (bet.type == "To Place") {
                // Place: ( Horse odds * Bet amount ) / 3
                payout = Math.round((this.getHorseOdds(bet.horses[0]) * bet.bet) / 3)

            } // else if (bet.type == "Trifecta") {
            //     // Trifecta: ( ( Horse 1 odds * Bet amount ) + ( Horse 2 odds * Bet amount ) + ( Horse 3 odds * Bet amount ) ) * 6
            //     payout = Math.round((this.getHorseOdds(bet.horses[0]) * bet.bet +
            //         this.getHorseOdds(bet.horses[1]) * bet.bet +
            //         this.getHorseOdds(bet.horses[2]) * bet.bet) * 6)
            // } else if (bet.type == "Box Trifecta") {
            //     // Box Trifecta: ( ( Horse 1 odds * Bet amount/3 ) + ( Horse 2 odds * Bet amount/3 ) + ( Horse 3 odds * Bet amount/3 ) ) * 6
            //     payout = Math.round((this.getHorseOdds(bet.horses[0]) * (bet.bet / 3) +
            //         this.getHorseOdds(bet.horses[1]) * (bet.bet / 3) +
            //         this.getHorseOdds(bet.horses[2]) * (bet.bet / 3)) * 6)
            // }

            // Return the calculated payout amount
            return payout
        },


        toWord(value) {
            return numberCruncher(value, 1)
        },


        raceAgain() {
            if (this.game.autoRace.enabled) {
                setTimeout(() => {
                    this.initRace()
                    this.startRace()
                },
                    this.game.autoRace.timeout
                )
            }
        },


        recordBetHistory() {
            for (let bet of this.game.race.bets) {
                // Record the bet payout
                let payout = this.calculatePayoutForBet(bet)
                bet.payout = payout
                // Record the financial outcome of the bet
                bet.outcome = (bet.won ? bet.payout - bet.bet : bet.bet * -1)
                bet.cashBalance = this.game.cash
                this.recordBet(bet)
                // Record the race #
                bet.raceNumber = this.game.history.raceCount
                // Store this bet in the race history
                this.game.history.recent.push(bet)
            }
        },


        recordBet(bet) {
            this.game.history.betCount += 1
            if (bet.outcome < 0) {
                this.game.history.totalCashLost -= bet.outcome
            } else {
                this.game.history.totalCashWon += bet.outcome
            }

            if (!bet.won) {
                this.game.history.totalRacesLost += 1
            } else {
                this.game.history.totalRacesWon += 1
            }

        },


        // Ensure the amount bet is valid
        validateNewBetAmount() {
            if (this.newBet.bet < 1) {
                // If the betting amount entered is zero or less, change it back to 1.
                this.newBet.bet = 1
            } else if (this.newBet.bet > this.game.cash) {
                // if the betting amount entered is greater than available cash, change it back to the amount of available cash
                this.newBet.bet = this.game.cash
            }
        },

        initCode() {
            // Put all racing horse details into the *horses* array
            let horses = []
            for (let horseNumber of this.game.race.racingHorses) {
                let currentHorse = this.deepCopy(this.game.horses[horseNumber])
                currentHorse.number = horseNumber
                currentHorse.odds = this.getHorseOdds(horseNumber)
                delete currentHorse.placing
                delete currentHorse.position
                delete currentHorse.finished
                horses.push(currentHorse)
            }

            let initCode = ""
            initCode += "const horses = " + JSON.stringify(horses) + ";\n"
            initCode += "const history = " + JSON.stringify(this.game.history) + ";\n"
            initCode += "const cash = " + this.game.cash + ";\n"
            initCode += "const bigCash = " + this.game.cash + "n;\n"
            return initCode
        },

        processCode() {
            let code = this.game.code

            let allowedFunctions = ["betToWin", "betToPlace", "shuffleHorses", "toggleDebug", "toggleAutoRace", "calculatePayout", "getStore", "setStore", "log"]

            for (const functionName of allowedFunctions) {
                const regex = new RegExp(`(?<!\\.)${functionName}\\(`, "gm");
                code = code.replace(regex, "scope." + functionName + "(")
            }

            return code

        },

        runCode() {
            var scriptText = this.initCode() + this.processCode()

            const codeFunction = new Function("scope", scriptText)

            try {
                codeFunction(this)
            } catch (error) {
                alert(error)
            }

        },


        betToWin(horse, amount) {
            // Guard clause to cancel bet if the player has insufficent cash
            if (amount > this.game.cash) return false

            const horseNumber = horse.number

            if (typeof (amount) != "bigint") {
                amount = Math.round(amount)
            }

            let bet = {
                type: "To Win",
                horses: [horseNumber],
                bet: amount
            }
            // Deduct the bet amount from the player's cash
            this.game.cash -= BigInt(amount)
            // Add the new bet to the list of bets for the current race
            this.game.race.bets.push(this.deepCopy(bet))
        },

        betToPlace(horse, amount) {
            // Guard clause to cancel bet if the player has insufficent cash
            if (amount > this.game.cash) return false

            const horseNumber = horse.number

            if (typeof (amount) != "bigint") {
                amount = Math.round(amount)
            }

            let bet = {
                type: "To Place",
                horses: [horseNumber],
                bet: amount
            }
            // Deduct the bet amount from the player's cash
            this.game.cash -= BigInt(amount)
            // Add the new bet to the list of bets for the current race
            this.game.race.bets.push(this.deepCopy(bet))
        },


        autoRaceToggled() {
            if (!this.game.autoRace.enabled && this.game.race.status != 1) {
                if (this.game.race.status == 2) this.initRace()
                this.startRace()
            }
        },

        // Init Bootstrap 5 Popovers
        initPopovers() {
            var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
            var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
                return new bootstrap.Popover(popoverTriggerEl)
            })
        },

        codeEditorSave() {
            this.game.code = this.game.newCode
            this.localStorageSave()
        },

        localStorageLoad() {
            const gameState = JSON.parse(localStorage.getItem("coderunner-game"))
            if (gameState) {
                gameState.autoRace.enabled = false
                gameState.newCode = gameState.code
                gameState.cash = BigInt(gameState.cash)
                this.game = gameState
            }
        },

        localStorageSave() {
            localStorage.setItem("coderunner-game", JSON.stringify(this.game))
        },

        resetGame() {
            localStorage.removeItem("coderunner-game")
            location.reload()
        },

        pruneHistory() {
            this.game.history.recent = this.game.history.recent.slice(this.game.settings.betHistorySize * -1)
        },

        // controlTrackConditions(number, relative = false) {
        //     number /= 2
        //     if (number >= 0 ) {

        //     }
        //     if (relative) {
        //         this.game.settings.randomInfluenceBonus += number % 11
        //     } else {
        //         this.game.settings.randomInfluenceBonus = number
        //     }
        // }

        copyCodeToClipboard() {
            navigator.clipboard.writeText(this.game.newCode)
        },

        pasteCodeFromClipboard() {
            navigator.clipboard
                .readText()
                .then(
                    cliptext => { this.game.newCode = cliptext; },
                    err => console.log(err)
                );
        },

        downloadInBrowser() {
            let filename = "Code Runner Code.txt"
            let text = this.game.newCode
            let element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        },

        getStore() {
            return this.game.userStore
        },

        setStore(data) {
            if (data) {
                this.game.userStore = data
            }
        },

        getWinRate() {
            const rate = (this.game.history.totalRacesWon / this.game.history.betCount * 100).toFixed(0)
            return !isNaN(rate) ? rate : 0
        },

        initMasonry() {
            this.msnry = new Masonry('.masonry', {})
            setInterval(() => this.updateMasonry(), 500)
        },

        updateMasonry() {
            this.msnry.layout()
        },

        log(message) {
            this.game.logArray.push(message)
        },

        toggleAutoRace(status = "toggle") {
            if (status == "toggle") {
                this.game.autoRace.enabled = !this.game.autoRace.enabled
            } else if (status == true || status == false) {
                this.game.autoRace.enabled = status
            }

        },

        changeTheme(theme) {
            const x = window.scrollX
            const y = window.scrollY
            
            this.game.editor.theme = theme

            this.localStorageSave()

            setTimeout(() => {
                window.scrollTo(x,y)
            },5)
            
        }

    },

    mounted() {
        // Initialize the subset of horses that can participate in races
        this.initHorsesPool()
        // Initializes a new race
        this.initRace()
        // Load code from localStorage
        this.localStorageLoad()
        // Initialize Masonry
        this.initMasonry()
        // this.updateMasonry()
    },

}
</script>

<style>
.logo {
    margin-right: 1em;
    height: 2em;
}

.strikeout {
    text-decoration: line-through;
}

.racetrack {
    -webkit-appearance: none;
    height: 34px;
    border-bottom: 1px solid;
}

.racetrack::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 32px;
    height: 32px;
    background: url('/src/assets/horse.png');
}

.racetrack.running::-webkit-slider-thumb {
    background: url('/src/assets/horserun.gif')
}

.racetrack::-moz-range-thumb {
    width: 32px;
    height: 32px;
    background: url('/src/assets/horse.png');
}

.trifecta-names {
    font-size: 0.7em;
    line-height: 1em;
}

.popover-header {
    background-color: #000000;
    color: white;
}

.form-switch {
    filter: grayscale(100%);
}

.accordion-button {
    box-shadow: none !important;
}

.history-container {
    max-height: 285px;
    overflow-y: scroll
}

.item-container {
    overflow-y: auto;
}

.editor-button-image {
    height: 24px;
    opacity: 60%;
}

.editor-button:hover .editor-button-image {
    opacity: 25%;
}

.unsaved {
    border: 2px solid #ff5050 !important;
}

.btn:focus,
.btn:active {
    outline: none;
    box-shadow: none;
}

.form-control:focus {
    box-shadow: none !important;
}

.make-red {
    filter: invert(19%) sepia(84%) saturate(7486%) hue-rotate(2deg) brightness(92%) contrast(121%);
}

.log-container {
    max-height: 6em;
    /* overflow-y: scroll; */
}</style>