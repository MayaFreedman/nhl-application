<template>
  <section class="bg-light">
    <div class="container" style="width: 100%">
      <div v-for="ggame in games" :key="ggame.AwayTeam">
        <Game :game='ggame' />
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
      currentTeam: String
    };
  },
  methods: {
    displayGames() {
      if(this.currentTeam === "test")
      this.games = this.games.slice(0,10);
      else if (this.currentTeam !== "all") {
        this.games = this.allGames.filter(
          (game) =>
            game.HomeTeam === this.currentTeam ||
            game.AwayTeam === this.currentTeam
        );
      }
        },    getTeam(game) {},
  },
  async mounted() {
    this.allGames = await (await fetch("http://localhost:3000/games")).json();
    this.games = this.allGames.slice(0,10);
    const data = await (
      await fetch("http://localhost:3000/currentTeam")
    ).json();
    //this.currentTeam = data.status;
    this.currentTeam = "test"
    this.displayGames();
  },
};
</script>
