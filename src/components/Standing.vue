<template>
<h3>SHOW UP</h3>
    <tr>
              <td><h6>{{team.Name}}</h6></td>
              <td>{{team.Wins}}</td>
              <td>{{team.Losses}}</td>
              <td>{{team.Losses}}</td>
              <td>{{team.Division}}</td>
            </tr>

</template>

<script>
export default {
  props() {
    team: Object
  }, mounted(){
      console.log(this.team)
      console.log("show your face you coward")
  }
}
</script>
