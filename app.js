new Vue({
    el: '#app',
    data: {
        playerHP: "80%",
        monsterHP: "80%",
        playerHPText: '',
        monsterHPText: '',
        playerDMG: 0,
        monsterDMG: 0,
        gameLogs: [],
        playerAttkDmg: 0,
        monsterAttkDmg: 0
    },
    methods: {
        startoGemu(){
            this.playerHP = "100%";
            this.monsterHP = "100%";
            this.playerHPText = "100";
            this.monsterHPText = "100";
            this.logNewEvent({message: "The hero goes forth", turn: "player-turn"});
            this.logNewEvent({message: "A wild slime appears!", turn: "monster-turn"});
        },
        logNewEvent(msg){
            this.gameLogs.push(msg);
        },
        attack(){
            let prevMo
            this.monsterHP = parseInt(this.monsterHP) - this.getDmg("player") + "%";
            this.playerHP = parseInt(this.playerHP) - this.getDmg("monster") + "%"
            this.monsterHPText = parseInt(this.monsterHP);
            this.playerHPText = parseInt(this.playerHP);
            this.logNewEvent({message: `The hero did ${this.playerAttkDmg} damage!`, turn: "player-turn"})
            this.logNewEvent({message: `The slime did ${this.monsterAttkDmg} damage!`, turn: "monster-turn"})
        },
        getDmg(char){
            let calcDmg = Math.floor(Math.random() * 11);
            if(char == "player") this.playerAttkDmg = calcDmg;
            else this.monsterAttkDmg = calcDmg;
            return calcDmg;
        }
    }
  });
  