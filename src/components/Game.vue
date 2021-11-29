<template>
  <div>
    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"
      integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M"
      crossorigin="anonymous"
    />
    <div>
      <!-- Date -->
      <h3
        class="
          border border-left-0 border-right-0 border-top-0 border-secondary
          py-3
          bg-white
          m-0
          date
        "
        style="font-size: 26px; padding-left: 25px"
        v-if="date != ''"
      >
        {{ date }}
      </h3>
      <div class="d-flex side-by-side">
        <!-- Team Names and Scores -->
        <ul
          class="
            bg-white
            p-0
            m-0
            border border-left-0 border-right-0 border-top-0 border-secondary
            teams-scores
          "
          style="height: 215px; width: 100%"
        >
          <div class="mb-5 space" style="width: 500px">
            <div class="d-flex">
              <div>
                <h4
                  class="mx-4 mt-3"
                  :style="[
                    game.HomeTeamScore > game.AwayTeamScore
                      ? '  text-decoration: underline;'
                      : '',
                  ]"
                >
                  {{ homeTeam.Name }}
                </h4>
                <p class="text-muted mx-4">
                  ({{ homeTeam.Wins }} - {{ homeTeam.Losses }})
                </p>
              </div>
              <h1 class="score mt-3 ml-auto mx-5">{{ game.HomeTeamScore }}</h1>
            </div>
            <div class="d-flex">
              <div>
                <h4
                  class="mx-4 mt-5"
                  :style="[
                    game.HomeTeamScore < game.AwayTeamScore
                      ? '  text-decoration: underline;'
                      : '',
                  ]"
                >
                  {{ awayTeam.Name }}
                </h4>
                <p class="text-muted mx-4">
                  ({{ awayTeam.Wins }} - {{ awayTeam.Losses }})
                </p>
              </div>
              <h1 class="score mt-5 ml-auto mx-5">{{ game.AwayTeamScore }}</h1>
            </div>
          </div>
        </ul>
        <!-- Team divisions and endgame status-->
        <ul
          class="
            bg-white
            d-flex
            p-0
            m-0
            border border-secondary border-left-0 border-top-0 border-right-0
          "
          style="
            height: 215px;
            width: 100%;
            justify-content: center;
            align-items: center;
          "
        >
          <div class="d-flex">
            <li style="list-style: none; align-self: center">
              <p class="mb-0 mx-5" style="font-size: 22px">{{ game.Status }}</p>
            </li>
            <li style="list-style: none; align-self: center">
              <div class="bg-secondary" style="width: 4px; height: 75px"></div>
            </li>
            <li class="ml-3 mt-1" style="list-style: none; align-self: center">
              <p class="text-muted mx-4 mt-2">
                Division: {{ homeTeam.Division }}
              </p>
              <p class="text-muted mx-4">Division: {{ awayTeam.Division }}</p>
            </li>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      allTeams: Array,
      homeTeam: Object,
      awayTeam: Object,
      date: String,
      prevDateText: String,
    };
  },
  props: {
    game: Object,
    display: Array,
    index: Number,
  },
  methods: {
    // Gets a specified team object based on a team key
    getTeam(specifiedTeam) {
      let foundTeam;
      this.allTeams.find((team) => {
        if (team.Key === specifiedTeam) foundTeam = team;
      });
      return foundTeam;
    },
    // Formats this teams date into  Month, Day - Year  format
    formatDate() {
      let monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      let month = monthNames[parseInt(this.game.Day.substring(5, 7)) - 1];
      let day = this.game.Day.substring(8, 10);
      let year = this.game.Day.substring(0, 4);
      this.date = `${month}, ${day} - ${year}`;
    },
  },
  async mounted() {
    const teamsResp = await axios.get("http://localhost:5000/teams");
    this.allTeams = teamsResp.data;

    this.homeTeam = this.getTeam(this.game.HomeTeam);
    this.awayTeam = this.getTeam(this.game.AwayTeam);

    //Only formats a date for games where the previous game has a different date
    if (this.index === 0 || this.display[this.index - 1].Day !== this.game.Day)
      this.formatDate();
    else this.date = "";
  },
};
</script>

<style scoped>
/* Makes games responsive */
@media (max-width: 991px) {
  .space {
    width: auto !important;
  }
  .img-fluid {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .side-by-side {
    display: block !important;
  }
  .teams-scores {
    border: none !important;
  }
}
</style>
