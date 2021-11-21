<template>
  <!--Enter Game Input-->
  <form class="mt-4">
    <div class="container bg-white border border-secondary" id="addGame">
      <div class="form-row pt-3" id="row1">
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
            placeholder="0 "
          />
        </div>
        <div class="form-group col-s-6 px-3">
          <label>Date</label>
          <input
            type="text "
            class="form-control"
            id="date"
            placeholder="yyyy-mm-dd"
          />
        </div>
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
      <div class="form-row">
        <button
          type="button"
          class="btn btn-dark mx-3 mt-1 mb-3"
          onclick="newGame();"
        >
          Submit
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
    methods : {
        //Attempts to add a new game to the data
 newGame() {
    let hTeamName = document.querySelector('#homeTeamName').value;
    let aTeamName = document.querySelector('#awayTeamName').value;
    let hScore = document.querySelector('#homeScore').value;
    let aScore = document.querySelector('#awayScore').value;
    let date = document.querySelector('#date').value;
    let OT = document.querySelector('#OT').checked;
    let SO = document.querySelector('#SO').checked;
    let status;

    if (OT === true) status = "F/OT";
    else if (SO === true) status = "F/SO"
    else status = "final";


    let error = document.querySelector('.errorMsg');
    if (error != null) error.remove();

    let container = document.querySelector('#addGame');
    let row1 = document.querySelector('#row1');

    let homeTeam;
    teams.forEach(team => {
        if (team.Name === hTeamName) homeTeam = team;
    });

    let awayTeam
    teams.forEach(team => {
        if (team.Name === aTeamName) awayTeam = team;
    });

    let today = new Date();
    // Displays an error message if: 
    //a field is left empty
    if (hTeamName === '' || aTeamName === '' || hScore === '' || aScore === '' || date === '' || OT === '') {
        let enterAllFields = createErrorMsg('Error: Please Fill Out All Required Fields');
        container.insertBefore(enterAllFields, row1);
    }
    //a valid team is not imputed 
    else if (homeTeam === undefined || awayTeam === undefined) {
        container.insertBefore(createErrorMsg('Error: Team Not Found'), row1);
    }
    //a valid date is not imputed 
    else if (isNaN(Date.parse(date)) || Date.parse(today) < Date.parse(date) || date.length != 10) {
        container.insertBefore(createErrorMsg('Error: Enter a Valid Date'), row1);
    }
    //a tie is imputed as the score
    else if (aScore === hScore) {
        container.insertBefore(createErrorMsg('Error: Invalid Score Input'), row1);
    }
    //Creates a new game
    else {
        //Updates overall stats for the teams
        if (hScore > aScore) {
            homeTeam.Wins += 1;
            awayTeam.Losses += 1;
        } else {
            awayTeam.Wins += 1;
            homeTeam.Losses += 1;
        }
        let game = {
            HomeTeam: homeTeam.Key,
            AwayTeam: awayTeam.Key,
            AwayTeamScore: aScore,
            HomeTeamScore: hScore,
            Day: date,
            Status: status
        }
        allGames.push(game);
        sortGames();
        storeData();
        //Emptys input
        document.querySelector('#homeTeamName').value = '';
        document.querySelector('#awayTeamName').value = '';
        document.querySelector('#homeScore').value = '';
        document.querySelector('#awayScore').value = '';
        document.querySelector('#date').value = '';
        document.querySelector('#OT').checked = false;
    }
}
    }
};
</script>

<style>
</style>