<template>
<div>
    <link src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js " integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM " crossorigin="anonymous ">
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
  />
  <!-- Title -->
  <header id="main-header" class="pt-4">
    <div class="container">
      <h1 id="header-title">Games</h1>
    </div>
  </header>

  <section class="bg-light">
    <div class="container" style="width: 100%">
      <!--Dropdown Menu for Team Selection-->
      <form class="bg-light">
        <div class="container px-0 pt-3" id="form-container">
          <select
            id="selectTeam"
            class="form-control mb-4"
            style="width: 300px"
            v-on:change="setCurrentTeam(), pageNum = 1"
          >
            <option :selected="currentTeam === 'all' ? true : false">All Teams</option>
            <option v-for="team in allTeams" :key="team.Key" :selected="currentTeam===team.Key ? true : false">
              {{ team.Name }}
            </option>
          </select>
        </div>
      </form>

      <!-- Games -->
      <div v-for="(game, index) in display" :key="game.id">
        <Game :game="game" :index="index" :display="display"/>
      </div>
    </div>
  </section>

  <!--Pagination Buttons-->
  <section class="bg-light">
    <div class="container p-0" style="height: 50px">
      <div class="float-right">
        <p class="d-inline">Page:</p>
        <select class="d-inline mx-2" id="pageNum" v-on:change="goToPage()">
          <option v-for="n in totalPages" :key="n" :selected="n === pageNum ? true : false">{{ n }}</option>
        </select>
        <p class="d-inline">of {{ totalPages }}</p>
        <button
          type="button"
          id="leftArrow"
          class="
            btn
            p-1
            mb-4
            ml-3
            mr-1
            bg-white
            my-3
            mx-0
            border border-dark
            d-inline
          "
          v-on:click="changePage(-1)"
        >
          <i class="bi bi-arrow-left" style="font-size: small"></i>
        </button>
        <button
          type="button"
          id="rightArrow"
          class="
            btn
            p-1
            mb-4
            mr-3
            ml-1
            bg-white
            border border-dark
            my-3
            mx-0
            d-inline
          "
          v-on:click="changePage(1)"
        >
          <i class="bi bi-arrow-right fs" style="font-size: small"></i>
        </button>
      </div>
    </div>
  </section>
  </div>
</template>

<script>
import Game from "@/components/Game.vue";
import axios from "axios";

export default {
  name: "Games",
  components: {
    Game,
  },
  data() {
    return {
      allGames: Array,
      games: Array,
      display: Array,
      currentTeam: String,
      pageNum: Number,
      totalPages: Number,
      display: Array,
      gamesPerPage: Number,
    };
  },
  methods: {
    // Updates games being displayed
    displayGames() {
      this.games = this.allGames;
      if (this.currentTeam !== "all") {
        this.games = this.allGames.filter(
          (game) =>
            game.HomeTeam === this.currentTeam ||
            game.AwayTeam === this.currentTeam
        );
      }

      this.totalPages = Math.ceil(this.games.length / this.gamesPerPage);

      this.display = this.games.slice(
        this.pageNum * this.gamesPerPage - this.gamesPerPage,
        this.pageNum * this.gamesPerPage
      );

      //Sort games by date
      this.disableButtons();
    },
    //Moves the page up or down based on input
    changePage(num) {
      this.pageNum += num;
      this.displayGames();
    },
    //Goes to page selected by dropdown menu
    goToPage(){
      this.pageNum = parseInt(document.querySelector('#pageNum').value)
      this.displayGames()
    },
    //Disables a button when there are no more pages of games for them to lead to
    disableButtons() {
      //Disables left button when on first page
      let LeftArrow = document.querySelector("#leftArrow");
      if (this.pageNum === 1) LeftArrow.disabled = true;
      else LeftArrow.disabled = false;

      //Disables right button when on last page
      let rightArrow = document.querySelector("#rightArrow");
      if (this.pageNum === this.totalPages) rightArrow.disabled = true;
      else rightArrow.disabled = false;
    },
    // Sets page to selected page from dropdown menu
    updatePage(){
          let currentPageNums = document.querySelectorAll('.page-number');
           for (let i = 0; i < maxPage; i++) {
        if (i === pageNum - 1) option.selected = 'selected';
           }
    },
    //Sets the selected current team
    async setCurrentTeam() {
      const teamName = document.querySelector("#selectTeam").value;
      let teamKey;
      if (teamName === "All Teams") teamKey = "all";
      this.allTeams.forEach((team) => {
        if (team.Name === teamName) teamKey = team.Key;
      });

      this.currentTeam = teamKey;
      await axios.patch(`http://localhost:5000/currentTeam`, {
        selected: teamKey,
      });
      this.displayGames();
    }
  },
  async mounted() {
    this.pageNum = 1;
    this.gamesPerPage = 10;
    const teamsResp = await axios.get("http://localhost:5000/teams");
    this.allTeams = teamsResp.data;
    const gamesResp = await axios.get("http://localhost:5000/games");
    this.allGames = gamesResp.data;
    this.allGames.sort((a, b) => Date.parse(b.Day) - Date.parse(a.Day));
    this.games = this.allGames;
    const currentTeamResp = await axios.get(
      "http://localhost:5000/currentTeam"
    );
    this.currentTeam = currentTeamResp.data.selected;
    this.displayGames();
  }
};
</script>

