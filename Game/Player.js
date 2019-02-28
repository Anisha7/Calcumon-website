// calcumon (INITIALLY) --> perhaps not needed?
// tokens (INITIALLY)
// health
// attacks and attack costs
// response input to a problem

// import problem generator 
// import { getProblem } from 'problemGenerator'
// // import solution API
// import { solve } from 'solutionApi'

class Player {
    constructor(attacks=[], health=100, mana=0, level=1) {
        // game
        this.mana = mana
        this.health = health // out of a 100
        this.attacks = attacks
        // ['Punch', 'Revive 10% health', 'Kick', 'Super Attack', 'Dodge', 'Fireball']
        // [-10, +10, -10, -30, (restore what was lost), -20]
        this.response = ''
        this.level = level // access from database
        this.prevResponseCorrectness = true // Was the last response correct?
        this.problemCount = 1 // how many problems did player deal with 

        this.currProblem = ''
        this.currSolution = ''
        this.currProblemMana = 0
        this.newProblem()
        
    }

    // get new problem
    newProblem() {
        let level = this.level
        let problemCount = this.problemCount
        let prevResult = this.prevResponseCorrectness // boolean
        // get a new problem based on player level
        

        let result = getProblem(level, problemCount, prevResult)
        
        // update currProblem
        this.currProblem = makeProblemReadable(result[0])
        this.currProblemMana = result[1]*10
        // update currSolution with new solution
        // console.log(result[0])
        // console.log('GETTING PROBLEM-SOLUTION')
        // this.currSolution = solve(result[0])
        // console.log('this.currSolution')

        // increment problem count
        this.problemCount += 1
    }

    incrementMana() {
        this.mana += this.currProblemMana
    }

    // IMPLEMENT THIS FOR VERSION ONE
    respond() {
        // currently handled in game.js
    }

    // Returns the health value that needs to be subtracted from opponent
    attack(i) {
        // pick attack at index i
        console.log("in player attack")
        console.log(i)
        console.log(this.attacks)
        let attack = this.attacks[i]
        // subtract attack token cost from player's tokens
        console.log(attack)
        if (attack == 'Punch') {
            return 10
        }
        if (attack == 'Kick') {
            return 10
        }
        if (attack == 'Super Attack') {
            return 30
        }
        if (attack == 'Dodge') {
            // restore health to before opponent's attack affected it
            // OR DODGE next attack?
        }
        if (attack == 'Fireball') {
            return 20
        }
        // health restore power
        if (attack == 'Revive 10% health') {
            this.health += 10
            if (this.health > 100) {
                this.health = 100
            }
        }
        return 0
    }

    // draw attacks for player
    drawPlayerData(ctx) {
        
        let y = 100
        let x = 60
        // player
        ctx.font = "16px Arial";
        ctx.fillStyle = "black";
        ctx.fillText('YOUR DATA: ', x, y+10)
        // draw player health
        // outer rectangle
        ctx.rect(x, y+30, 200, 20)
        ctx.stroke()
        // inner filled rectangle (depends on health percentage)
        let health = this.health/100       

        ctx.fillStyle = "red";
        ctx.fillRect(x, y+30, 200*health, 20);

        // health text
        ctx.font = "14px Arial";
        ctx.fillStyle = "white";
        ctx.fillText('Health', x+10, y+45)
        
        // draw player mana
        let text = 'Mana: ' + this.mana
        console.log(text)
        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(text, x+250, y+48)
    }

}

// export default Player