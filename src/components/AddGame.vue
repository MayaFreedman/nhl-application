<template>
  <div>
    <!--Enter Game Input-->
    <form class="mt-4">
      <div class="container bg-white border border-secondary" id="addGame">
        <h4 class="text-danger errorMsg pt-3 pl-2" v-if="errorMsg != ''">
          {{ errorMsg }}
        </h4>
        <!--Team Name Inputs-->
        <div class="form-row pt-3">
          <div class="form-group col-md-6 px-3">
            <label>Home Team</label>
            <input type="text" class="form-control" id="homeTeamName" />
          </div>
          <div class="form-group col-md-6 px-3">
            <label>Away Team</label>
            <input type="text" class="form-control" id="awayTeamName" />
          </div>
        </div>
        <div class="form-row">
          <!--Score Inputs-->
          <div class="form-group col-s-6 px-3">
            <label>Home Score</label>
            <input
              type="number"
              class="form-control"
              id="homeScore"
              placeholder="0"
            />
          </div>
          <div class="form-group col-s-6 px-3">
            <label>Away Score</label>
            <input
              type="number "
              class="form-control"
              id="awayScore"
              placeholder="0"
            />
          </div>
          <!--Date input-->
          <div class="form-group col-s-6 px-3">
            <label>Date</label>
            <input type="date" class="form-control" id="date" />
          </div>
          <!--Endgame Status-->
        </div>
        <div class="form-group form-check-inline">
          <label class="form-check-label">Game ended in: </label>
        </div>
        <div class="form-group form-check-inline ml-4">
          <label class="form-check-label">Regular Time</label>
          <input
            type="radio"
            class="form-check-input ml-2"
            name="endgameOptions"
            id="RG"
            style="margin-top: 10px"
            checked
          />
        </div>
        <div class="form-group form-check-inline ml-4">
          <label class="form-check-label">Overtime</label>
          <input
            type="radio"
            class="form-check-input ml-2"
            name="endgameOptions"
            id="OT"
            style="margin-top: 10px"
          />
        </div>
        <div class="form-group form-check-inline ml-4">
          <label class="form-check-label">Shootout</label>
          <input
            type="radio"
            class="form-check-input ml-2"
            name="endgameOptions"
            id="SO"
            style="margin-top: 10px"
          />
        </div>
        <!--Submit Button-->
        <div class="form-row">
          <button
            type="button"
            class="btn btn-dark mx-3 mt-1 mb-3"
            v-on:click="newGame"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      allTeams: Array,
      errorMsg: "",
    };
  },
  methods: {
    //Attempts to add a new game to the data
    async newGame() {
      await this.getTeamsData();
      let hTeamName = document.querySelector("#homeTeamName").value;
      let aTeamName = document.querySelector("#awayTeamName").value;
      let hScore = document.querySelector("#homeScore").value;
      let aScore = document.querySelector("#awayScore").value;
      let date = document.querySelector("#date").value;
      let OT = document.querySelector("#OT").checked;
      let SO = document.querySelector("#SO").checked;
      let status;

      if (OT === true) status = "F/OT";
      else if (SO === true) status = "F/SO";
      else status = "Final";

      let homeTeam;
      this.allTeams.forEach((team) => {
        if (team.Name.toLowerCase() === hTeamName.toLowerCase())
          homeTeam = team;
      });

      let awayTeam;
      this.allTeams.forEach((team) => {
        if (team.Name.toLowerCase() === aTeamName.toLowerCase())
          awayTeam = team;
      });

      let today = new Date();
      // Displays an error message if:
      //a field is left empty
      if (
        hTeamName === "" ||
        aTeamName === "" ||
        hScore === "" ||
        aScore === "" ||
        date === "" ||
        OT === ""
      ) {
        this.errorMsg = "Error: Please Fill Out All Required Fields";
      }
      //a valid team is not imputed
      else if (homeTeam === undefined || awayTeam === undefined) {
        this.errorMsg = "Error: Team Not Found";
      }
      //a date later than current date is imputed
      else if (Date.parse(today) < Date.parse(date)) {
        this.errorMsg = "Error: Enter a Valid Date";
      }
      //a tie is imputed as the score
      else if (aScore === hScore) {
        this.errorMsg = "Error: Invalid Score Input";
      }
      //Creates a new game
      else {
        this.errorMsg = "";
        //Updates overall stats for the teams
        if (hScore > aScore) {
          await this.update(1, homeTeam);
          await this.update(-1, awayTeam);
        } else {
          await this.update(1, awayTeam);
          await this.update(-1, homeTeam);
        }
        let game = {
          HomeTeam: homeTeam.Key,
          AwayTeam: awayTeam.Key,
          AwayTeamScore: aScore,
          HomeTeamScore: hScore,
          Day: date,
          Status: status,
        };
        await this.push(game);
        //Emptys inputs
        document.querySelector("#homeTeamName").value = "";
        document.querySelector("#awayTeamName").value = "";
        document.querySelector("#homeScore").value = "";
        document.querySelector("#awayScore").value = "";
        document.querySelector("#date").value = "";
        document.querySelector("#OT").checked = false;
      }
    },
    async push(game) {
      const res = await axios.post("http://localhost:5000/games", game, {
        headers: { "Content-Type": "application/json" },
      });
      const data = res.data;
      this.allGames = [...this.allGames, data];
    },
    //Updates a teams record of wins or losses
    async update(won, team) {
      let updatedScore;
      if (won === 1) {
        team.Wins += 1;
        updatedScore = { Wins: team.Wins };
      } else {
        team.Losses += 1;
        updatedScore = { Losses: team.Losses };
      }
      await axios.patch(`http://localhost:5000/teams/${team.id}`, updatedScore);
    },
    // Gets team data from server
    async getTeamsData() {
      const teamsResp = await axios.get("http://localhost:5000/teams");
      this.allTeams = teamsResp.data;
    },
  },
  async mounted() {
    // Gets games data from server
    const gamesResp = await axios.get("http://localhost:5000/games");
    this.allGames = gamesResp.data;
  },
};
</script>

<style>
</style>