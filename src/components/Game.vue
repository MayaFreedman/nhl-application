<template>
  <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css"
    integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M"
    crossorigin="anonymous"
  />
  <div>
    <h3
      class="
        border border-left-0 border-right-0 border-top-0 border-secondary
        py-3
        bg-white
        m-0 date
      "
      style="font-size: 26px; padding-left: 25px"
    >
      {{date}}
    </h3>
    <div class="d-flex side-by-side">
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
              <h4 class="mx-4 mt-3">{{homeTeam.Name}}</h4>
              <p class="text-muted mx-4">({{homeTeam.Wins}} - {{homeTeam.Losses}})</p>
            </div>
            <h1 class="score mt-3 ml-auto mx-5">{{game.HomeTeamScore}}</h1>
          </div>
          <div class="d-flex">
            <div>
              <h4 class="mx-4 mt-5">{{awayTeam.Name}}</h4>
              <p class="text-muted mx-4">({{awayTeam.Wins}} - {{awayTeam.Losses}})</p>
            </div>
            <h1 class="score mt-5 ml-auto mx-5">{{game.AwayTeamScore}}</h1>
          </div>
        </div>
      </ul>

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
            <p class="mb-0 mx-5" style="font-size: 22px">{{game.Status}}</p>
          </li>
          <li style="list-style: none; align-self: center">
            <div class="bg-secondary" style="width: 4px; height: 75px"></div>
          </li>
          <li class="ml-3 mt-1" style="list-style: none; align-self: center">
            <p class="text-muted mx-4 mt-2">Division: {{homeTeam.Division}}</p>
            <p class="text-muted mx-4">Division: {{awayTeam.Division}}</p>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      allTeams: Array,
      homeTeam: Object,
      awayTeam: Object,
      date: String,
      prevDateText: HTMLElement
    };
  },
  props: {
    game: Object
  },
  methods: {
    getTeam(specifiedTeam){
        let foundTeam;
         this.allTeams.find(team => { if(team.Key === specifiedTeam) foundTeam = team
        });
        return foundTeam
    },
    formatDate(){
        let monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let month = monthNames[parseInt(this.game.Day.substring(5, 7)) - 1];
        let day = this.game.Day.substring(8, 10);
        let year = this.game.Day.substring(0, 4);
        this.date = `${month}, ${day} - ${year}`
    }
  },
  async mounted() {
    this.allTeams = await (await fetch("http://localhost:3000/teams")).json();
    this.homeTeam = this.getTeam(this.game.HomeTeam)
    this.awayTeam = this.getTeam(this.game.AwayTeam)
    this.formatDate()
  }
};
</script>


<style scoped>
/*.box{
  height:215px; 
  width:100%;
  border-color: aqua!important;
  border: 20px!important;
  border-color: aqua;

}

.side-by-side{
    border-bottom: 220px!important;
}

.ooga{
    border-color: aquamarine!important;
    border-bottom: 10px!important;
}*/
</style>
