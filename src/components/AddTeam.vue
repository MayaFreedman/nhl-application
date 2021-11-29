  <template>
  <div>
    <!--Enter team input-->
    <form>
      <div class="container bg-white border border-secondary">
        <!-- Error message -->
        <h4 class="text-danger errorMsg pt-3 pl-2" v-if="errorMsg != ''">
          {{ errorMsg }}
        </h4>
        <!-- Name input -->
        <div class="form-row pt-3">
          <div class="form-group col-md-6">
            <label for="inputEmail4">Team Name</label>
            <input type="text" class="form-control" id="newTeamName" />
          </div>
          <!-- Wins input -->
          <div class="form-group col-md-3">
            <label for="inputPassword4">Wins</label>
            <input
              type="number"
              class="form-control"
              id="newTeamWins"
              placeholder="0"
            />
          </div>
          <!-- Losses input -->
          <div class="form-group col-md-3">
            <label for="inputPassword4">Losses</label>
            <input
              type="number"
              class="form-control"
              id="newTeamLosses"
              placeholder="0"
            />
          </div>
        </div>
        <div class="form-row pb-3">
          <!-- Division input -->
          <div class="form-group col-md-4">
            <label for="inputState">Division</label>
            <select id="newTeamDivision" class="form-control">
              <option selected disabled>Choose Division ...</option>
              <option>Metropolitan</option>
              <option>Atlantic</option>
              <option>Central</option>
              <option>Pacific</option>
            </select>
          </div>
          <!-- Submit -->
          <div class="form-group col-md-6 align-self-lg-end mx-3">
            <button
              type="button"
              class="btn btn-dark"
              id="submitNewTeam"
              v-on:click="newTeam"
            >
              Submit
            </button>
          </div>
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
    //Attempts to create a new team to be added to the data
    newTeam() {
      let newTeamName = document.querySelector("#newTeamName").value;
      let newTeamWins = document.querySelector("#newTeamWins").value;
      let newTeamLosses = document.querySelector("#newTeamLosses").value;
      let newTeamDivision = document.querySelector("#newTeamDivision").value;

      let same;
      this.allTeams.forEach((team) => {
        if (team.Name === newTeamName) same = true;
      });
      //Displays an error message if:
      //all fields are not filled out
      if (
        newTeamName == "" ||
        newTeamWins == "" ||
        newTeamLosses == "" ||
        newTeamDivision == "Choose Division ..."
      )
        this.errorMsg = "Error: Please Fill Out All Required Fields";
      //team with that name already exists
      else if (same)
        this.errorMsg = "Error: Team With That Name Already Exists";
      else {
        //Creates new Team
        this.errorMsg = "";
        let thisTeam = {
          Name: newTeamName.charAt(0).toUpperCase() + newTeamName.slice(1),
          Wins: parseInt(newTeamWins),
          Losses: parseInt(newTeamLosses),
          Division: newTeamDivision,
          Key: newTeamName.substring(0, 3),
        };
        this.push(thisTeam)
        //Clears out inputs
        document.querySelector("#newTeamName").value = "";
        document.querySelector("#newTeamWins").value = "";
        document.querySelector("#newTeamLosses").value = "";
        document.querySelector("#newTeamDivision").value =
          "Choose Division ...";
      }
    },
    //Adds a new team to the data
    async push(team) {
      await axios.post("http://localhost:5000/teams", team, {
        headers: { "Content-Type": "application/json" },
      });
    },
  },
  async mounted() {
    //Gets teams data
    const teamsResp = await axios.get("http://localhost:5000/teams");
    this.allTeams = teamsResp.data;
  },
};
</script>

