new Vue({
    el: '#app',
    data: {
        playerHP: "80%",
        monsterHP: "80%",
        playerDMG: 0,
        monsterDMG: 0,
        gameLogs: [],
        playerAttkDmg: 0,
        playerHeal: null,
        monsterAttkDmg: 0,
        herbCount: 5,
        pepPower: 2,
    },
    methods: {
        startoGemu(){
            this.playerHP = "100%";
            this.monsterHP = "100%";
            this.playerHPText = "100";
            this.monsterHPText = "100";
            this.logNewEvent({message: "The hero goes forth!!", turn: "player-turn"});
            this.logNewEvent({message: "A wild slime appears!!", turn: "monster-turn"});
        },
        logNewEvent(msg){
            this.gameLogs.push(msg);
        },
        attack(){
            if(parseInt(this.playerHP) > 0){
                let calcMonsterHP = parseInt(this.monsterHP) - this.getDmg("player");
                let calcPlayerHP = parseInt(this.playerHP) - this.getDmg("monster");
                if(calcPlayerHP < 0) calcPlayerHP = 0;
                if(calcMonsterHP < 0) calcMonsterHP = 0;
                this.playerHP = calcPlayerHP + "%";
                this.monsterHP = calcMonsterHP + "%";
                this.logNewEvent({message: `The hero did ${this.playerAttkDmg} damage!`, turn: "player-turn"});
                this.logNewEvent({message: `The slime did ${this.monsterAttkDmg} damage!`, turn: "monster-turn"});
                this.checkWinStatus();
            }
        },
        specialAttack(){
            let calcMonsterHP =  parseInt(this.monsterHP) - this.getSpecialDmg();
            if(calcMonsterHP < 0) calcMonsterHP = 0;
            this.monsterHP = calcMonsterHP;
            this.logNewEvent({message: `CRITICAL HIT!!! The hero does ${this.playerAttkDmg} damage!`, turn: "player-turn"});
            this.logNewEvent({message: `The slime is stunned and can't attack`, turn: "monster-turn"});
        },
        checkWinStatus(){
            if(parseInt(this.playerHP) <= 0){
                this.logNewEvent({message: "Oh no. The hero fainted! GAME OVER", turn: "monster-turn"});
            } else if(parseInt(this.monsterHP) <= 0){
                this.logNewEvent({message: "The slime fainted", turn: "player-turn"})
            }
        },
        getSpecialDmg(){
            let calcDmg = Math.floor(Math.random() * 15) + 15;
            this.playerAttkDmg = calcDmg;
            return calcDmg;
        },
        getDmg(char){
            let calcDmg = Math.floor(Math.random() * 10);
            if(char == "player") this.playerAttkDmg = calcDmg;
            else this.monsterAttkDmg = calcDmg;
            return calcDmg;
        },
        calcHeal(){
            let heal = Math.floor(Math.random() * 10) + 5;
            this.herbCount -= 1;
            this.playerHeal = heal;
            return heal;
             
        },
        playerUsesHerb(){
            if(parseInt(this.playerHP) > 0){
                if(this.herbCount > 0){
                    this.playerHP = parseInt(this.playerHP) + this.calcHeal() - this.getDmg("monster") + "%";
                    this.logNewEvent({message: `The hero uses medicinal herb. Gains ${this.playerHeal} hitpoints!`, turn: "player-turn"});
                    this.logNewEvent({message: `The slime did ${this.monsterAttkDmg} while the hero was healing!!`, turn: "monster-turn"})
                    this.herbCount -= 1;
                } else {
                    this.logNewEvent({message: `OUT OF HERBS!!!`, turn: "monster-turn"})
                } 
            }
        }
    }
  });
  