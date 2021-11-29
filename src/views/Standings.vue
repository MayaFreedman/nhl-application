<template>
<div>
  <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"
    integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M"
    crossorigin="anonymous"
  />
  <!--Title-->
    <header id="main-header" class="py-4">
      <div class="container">
      <h1 id="header-title">Standings</h1>
    </div>
    </header>

  <section class="bg-light">
    <div class="container">
      <div id="main" class="card card-body">
         <!--Filter Text Box-->
        <form class="form-inline mb-3 float-right">
          <input
            id="filter"
            type="text"
            class="form-control mr-2"
            placeholder="Filter"
            v-on:keyup="filterTeams"
          />
        </form>
        <!--Standings-->
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col" v-on:click="sort('team')" >Team</th>
              <th scope="col" v-on:click="sort('wins')">Wins</th>
              <th scope="col" v-on:click="sort('losses')">Losses</th>
              <th scope="col" v-on:click="sort('GP')">GP</th>
              <th scope="col" v-on:click="sort('division')">Division</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="team.Name" v-for="team in teams">
              <td class = "team" :style="[currentSortField === 'team' ? 'background: #ececec' : 'background: #FFF']"><router-link v-on:click="setCurrentTeam(team.Key)" to="/games">{{ team.Name }}</router-link></td>
              <td class = "wins" :style="[currentSortField === 'wins' ? 'background: #ececec' : 'background: #FFF']">{{ team.Wins }}</td>
              <td class = "losses" :style="[currentSortField === 'losses' ? 'background: #ececec' : 'background: #FFF']">{{ team.Losses }}</td>
              <td class = "GP" :style="[currentSortField === 'GP' ? 'background: #ececec' : 'background: #FFF']">{{ team.Wins + team.Losses }}</td>
              <td class = "division" :style="[currentSortField === 'division' ? 'background: #ececec' : 'background: #FFF']">{{ team.Division }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      allTeams: Array,
      teams: Array,
      currentSortField: String,
      sortDirection: String
    };
  },
  methods: {
    //Sets the current selected team 
    async setCurrentTeam(teamKey){
      await axios.patch(
          `http://localhost:5000/currentTeam`,
          {'selected': teamKey}
        );
    },
    //Sorts the standings based off one of the column's field
    sort(field) {
      if (field === undefined) {
        field = this.currentSortField;
      } else if (field === this.currentSortField) {
        this.sortDirection = this.sortDirection === "ASC" ? "DESC" : "ASC";
      } else {
        this.sortDirection = "ASC";
        this.currentSortField = field;
      }
      if (this.sortDirection === "ASC") {
        if (field === "team") {
          this.teams = this.allTeams.sort((a, b) =>
            a.Name.localeCompare(b.Name) > 0 ? 1 : -1
          );
        } else if (field === "wins") {
          this.teams = this.allTeams.sort((a, b) => a.Wins - b.Wins);
        } else if (field === "losses") {
          this.teams = this.allTeams.sort((a, b) => a.Losses - b.Losses);
        } else if (field === "division") {
          this.teams = this.allTeams.sort((a, b) =>
            a.Division.localeCompare(b.Division) > 0 ? 1 : -1
          );
        } else {
          this.teams = this.allTeams.sort(
            (a, b) => a.Wins + a.Losses - (b.Wins + b.Losses)
          );
        }
      } else {
        if (field === "team") {
          this.teams = this.allTeams.sort((a, b) =>
            a.Name.localeCompare(b.Name) < 0 ? 1 : -1
          );
        } else if (field === "wins") {
          this.teams = this.allTeams.sort((a, b) => b.Wins - a.Wins);
        } else if (field === "losses") {
          this.teams = this.allTeams.sort((a, b) => b.Losses - a.Losses);
        } else if (field === "division") {
          this.teams = this.allTeams.sort((a, b) =>
            a.Division.localeCompare(b.Division) < 0 ? 1 : -1
          );
        } else {
          this.teams = this.allTeams.sort(
            (a, b) => b.Wins + b.Losses - (a.Wins + a.Losses)
          );
        }
      }
    },
    //Filters the teams based on input in text box
    filterTeams() {
    this.currentSortField = 'team'
    let filterValue = document.querySelector('#filter').value.toLowerCase();
    this.teams = this.allTeams.filter(team => (team.Name.toLowerCase().indexOf(filterValue) >= 0));
    }
  },
  async mounted() {
    // Gets allTeams from server
    const teamsResp = await axios.get('http://localhost:5000/teams');
    this.allTeams =  teamsResp.data;
    this.teams = this.allTeams;
    
    //Sorts standings by wins 
    this.currentSortField = 'wins';
    this.sort('wins');
    }
}
</script>
<style scoped>
/* Router Link Styling */
a{
  color: black;
}

a:hover{
  color: black;
}
</style>

