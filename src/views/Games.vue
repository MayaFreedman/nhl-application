<template>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
  />
  <section class="bg-light">
    <div class="container" style="width: 100%">
      <!--Dropdown Menu for Team Selection-->
      <form class="bg-light">
        <div class="container px-0 pt-3" id="form-container">
          <select
            id="selectTeam"
            class="form-control pb-1"
            style="width: 300px"
            v-on:change="setCurrentTeam()"
          >
            <option selected>All Teams</option>
            <option v-for="team in allTeams" :key="team.Key">{{team.Name}}</option>
          </select>
        </div>
      </form>

      <div v-for="game in display" :key="game.AwayTeam">
        <Game :game="game" />
      </div>
    </div>
  </section>

  <!--Buttons-->
  <section class="bg-light">
    <div class="container p-0" style="height: 50px">
      <div class="float-right">
        <p class="d-inline">Page:</p>
        <select
          class="d-inline"
          id="pageNum"
          onchange="goToPage(this);"
        ></select>
        <p class="d-inline">{{ totalPages }}</p>
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
</template>

<script>
import Game from "@/components/Game.vue";

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
    // COMMENT NEEDED (if i submit like this im really sorry don't take marks off plz :)
    displayGames() {
      if (this.currentTeam !== "all") {
        this.games = this.allGames.filter(
          (game) =>
            game.HomeTeam === this.currentTeam ||
            game.AwayTeam === this.currentTeam
        );
      }
      this.totalPages = Math.ceil(this.games.length / this.gamesPerPage);
      console.log("page num: " + this.pageNum);
      console.log("gpp: " + this.gamesPerPage);
      this.display = this.games.slice(
        this.pageNum * this.gamesPerPage - this.gamesPerPage,
        this.pageNum * this.gamesPerPage
      );
      //sort games by date
      this.disableButtons()
    },
    //Moves the page up or down based on input
    changePage(num) {
      this.pageNum += num;
      this.displayGames();
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
    setCurrentTeam(){
      let newCurrentTeam = document.querySelector('#selectTeam').innerHTML
      console.log("Haven't made this function yet but you clicked: " + newCurrentTeam)
      console.log(newCurrentTeam)
    }
  },
  async mounted() {
    console.log("THIS BE RUNNN");
    this.pageNum = 1;
    this.gamesPerPage = 10;
    this.allTeams = await (await fetch("http://localhost:5000/teams")).json();
    this.allGames = await (await fetch("http://localhost:5000/games")).json();
    this.allGames.sort((a, b) => Date.parse(b.Day) - Date.parse(a.Day));
    this.games = this.allGames;
    //this.currentTeam = data.status;
    this.currentTeam = "all";
    this.displayGames();
  },
};
</script>
