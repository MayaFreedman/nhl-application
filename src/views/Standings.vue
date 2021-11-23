<template>
  <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"
    integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M"
    crossorigin="anonymous"
  />
  <section class="bg-light">
    <div class="container">
      <div id="main" class="card card-body">
        <form class="form-inline mb-3 float-right">
          <input
            id="filter"
            type="text"
            class="form-control mr-2"
            placeholder="Filter"
            v-on:keyup="filterTeams"
          />
        </form>
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col" v-on:click="sort('team')">Team</th>
              <th scope="col" v-on:click="sort('wins')">Wins</th>
              <th scope="col" v-on:click="sort('losses')">Losses</th>
              <th scope="col" v-on:click="sort('GP')">GP</th>
              <th scope="col" v-on:click="sort('division')">Division</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="team.Name" v-for="team in teams">
              <td class="team">{{ team.Name }}</td>
              <td class="wins">{{ team.Wins }}</td>
              <td class="losses">{{ team.Losses }}</td>
              <td class="GP">{{ team.Wins + team.Losses }}</td>
              <td class="division">{{ team.Division }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
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
    //Gets teams data from JSON server
    async fetchTeams() {
      const res = await fetch("http://localhost:5000/teams");

      const data = await res.json();
      return data;
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
          console.log(this.allTeams);
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
          console.log(this.allTeams);
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
      this.highlightSort();
    },
    //Highlights the column that standings is being sorted by
    highlightSort() {
      let remove = document.querySelectorAll("td");
      remove.forEach((element) => (element.style = "background:#ffffff;"));
      let add = document.querySelectorAll(`.${this.currentSortField}`);
      add.forEach((element) => (element.style = "background:#ececec;"));
    },
    //Filters the teams based on input in text box
    filterTeams() {
    this.currentSortField = 'teams'
    let filterValue = document.querySelector('#filter').value;
    this.teams = this.allTeams.filter(team => (team.Name.toLowerCase().indexOf(filterValue) >= 0));
    this.highlightSort();
}
  },
  async mounted() {
    this.allTeams = await this.fetchTeams();
    this.teams = this.allTeams;
    console.log(this.teams);
    console.log(this.sortDirection);
    this.sort('wins')  
    }
};
</script>

