  <template>
  <!--Enter Team Input-->
  <form>
    <div class="container bg-white border border-secondary">
      <div class="form-row pt-3" id="test7">
        <div class="form-group col-md-6">
          <label for="inputEmail4">Team Name</label>
          <input type="text" class="form-control" id="newTeamName" />
        </div>
        <div class="form-group col-md-3">
          <label for="inputPassword4">Wins</label>
          <input
            type="number"
            class="form-control"
            id="newTeamWins"
            placeholder="0"
          />
        </div>
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
</template>

<script>
export default {
  data() {
    return {
      allTeams: Array,
    };
  },
  methods: {
    //Attempts to add a new team to the data
    newTeam() {
      let newTeamName = document.querySelector("#newTeamName").value;
      let newTeamWins = document.querySelector("#newTeamWins").value;
      let newTeamLosses = document.querySelector("#newTeamLosses").value;
      let newTeamDivision = document.querySelector("#newTeamDivision").value;

      let error = document.querySelector(".errorMsg");
      if (error != null) error.remove();

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
      ) {
        let enterAllFields = this.createErrorMsg(
          "Error: Please Fill Out All Required Fields"
        );
        let container = document.querySelector("form .container");
        let enterNewTeam = document.querySelector("#test7");
        container.insertBefore(enterAllFields, enterNewTeam);
        //team with that name already exists
      } else if (same) {
        let sameName = this.createErrorMsg(
          "Error: Team With That Name Already Exists"
        );
        let container = document.querySelector("form .container");
        let enterNewTeam = document.querySelector("#test7");
        container.insertBefore(sameName, enterNewTeam);
      } else {
        //Creates new Team
        let thisTeam = {
          Name: newTeamName,
          Wins: parseInt(newTeamWins),
          Losses: parseInt(newTeamLosses),
          Division: newTeamDivision,
          Key: newTeamName.substring(0, 3),
        };
        console.log(thisTeam);
        this.push(thisTeam);
        console.log("YES YES YES");
        //Clears out inputs
        document.querySelector("#newTeamName").value = "";
        document.querySelector("#newTeamWins").value = "";
        document.querySelector("#newTeamLosses").value = "";
        document.querySelector("#newTeamDivision").value =
          "Choose Division ...";
      }
    },
    //Gets teams data from JSON server
    async fetchTeams() {
      const res = await fetch("http://localhost:5000/teams");

      const data = await res.json();
      return data;
    },
    //Creates a text element with the style of an error from given text
    createErrorMsg(msg) {
      let enterAllFields = document.createElement("h4");
      enterAllFields.appendChild(document.createTextNode(msg));
      enterAllFields.className = "text-danger errorMsg pt-3 pl-2";
      return enterAllFields;
    },
    async push(team) {
      const res = await fetch("http://localhost:5000/teams", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(team),

      });

      const data = await res.json();
      this.allTeams = [...this.allTeams, data];
      console.log(data);
    },
  },
  async mounted() {
    this.allTeams = await this.fetchTeams();
  },
};
</script>

