new Vue({
    el: '#app',
    data: {
        playerHP: "80%",
        monsterHP: "80%",
        playerDMG: 0,
        monsterDMG: 0
    },
    methods: {
        startoGemu(){
            this.playerHP = "100%";
            this.monsterHP = "100%";
        }
    }
  });
  