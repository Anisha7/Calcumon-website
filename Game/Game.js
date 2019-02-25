// import { throwStatement } from "babel-types";

// FOR V1, IMPLEMENT PLAYER AND GAME CLASS, SUCH THAT 
// THEY CAN DEAL WITH A MATH PROBLEM AND ALLOW PLAYER TO ENTER A SOLUTION
// AND CHECK THE SOLUTION FOR ACCURACY
// AND ASSIGN TOKENS ACCORDINGLY

// math problems (INITIALLY)
// solution checker
// token associations with math problems
// assign tokens to players if correct solution
// how to deal with incorrect solution condition?
    // 3 tries, skip option, new question?
// players/opponents
    // track attacks and update health accordingly
// track winner
// track gameOver state
class Attacks {
    constructor(ctx, attacks=[]) {
        this.ctx = ctx
        this.attacks = attacks
        // number of attacks
        this.numAttacks = 6 // use len(this.attacks)
        // width, height position for attack
        this.width = ctx.canvas.width/this.numAttacks;
        this.height = 100;
        // x,y position for first attack click box's top left corner
        this.x = 0
        this.y = ctx.canvas.height - 320
    }

    draw(ctx) {
        // update for responsiveness
        // this.ctx = ctx
        // // width, height position for attack
        // this.width = ctx.canvas.width/this.numAttacks;
        // this.height = 100;
        // // x,y position for first attack click box's top left corner
        // this.x = 0
        // this.y = ctx.canvas.height - 300

        // attack label
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "Black"
        this.ctx.fillText("Attacks", this.x, this.y-20)

        // attack boxes
        for (let i = 0; i < this.numAttacks; i++) {
            ctx.rect(this.x + this.width*i, this.y, this.width, this.height)
            ctx.stroke()
        }
    }

    // Onclick events: return string name of attack or i index of attack location in attacks array?
    attackHandler(x, y) {
        // check if y is in the right range
        console.log(this.y, this.y + this.height)
        if (y >= this.y & y <= this.y + this.height) {
            // check which x it falls into
            console.log("RIGHT RANGE")
        }
           
    }
}
    
class Game {
    constructor(ctx, canvas) {
        this.ctx = ctx
        this.canvas = canvas
        this.gameState = true

        this.player = new Player() // initialize player
        this.computer = '' // implement computer class
        this.input = ''
        this.foundSolution = false
        console.log(ctx.canvas.height)
        this.attacks = new Attacks(ctx)
        
    }

    // IMPLEMENT FOR THIS VERSION
    

    // TO DO: check if player solution is valid
    // input: userInput
    verifySolution() {
        // user input == curr solution
        // alert(userInput)
        console.log(this.input._value)

        alert(this.input._value)
        this.foundSolution = true
        
        return true
    }

    gameOver() {
        // figure out who won
        // if player won: update level, give coins
        return
    }

    // DRAW FUNCTIONS
    drawProblem() {
        ctx.font = "30px Arial";
        ctx.fillStyle = "white";
        console.log(this.player.currProblem)
        ctx.fillText("Problem: "+this.player.currProblem, 60, 50);
    }

    drawInputField() {
        this.input = new CanvasInput({
            canvas: document.getElementById('game'),
            fontSize: 18,
            fontFamily: 'Arial',
            fontColor: '#212121',
            fontWeight: 'bold',
            width: 450,
            padding: 8,
            borderWidth: 1,
            borderColor: '#000',
            borderRadius: 3,
            boxShadow: '1px 1px 0px #fff',
            innerShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            // placeHolder: 'Enter your solution here...',
            value: this.input._value,
            x: ctx.canvas.width/2 + 50,
            y: 20,
            onsubmit: () => { 
                return this.verifySolution() 
            }
        });
        this.input.render()
    }

    // draw attacks for player
    drawAttacks() {
        // variables
        // number of attacks
        // let numAttacks = 6 // use len(this.player.attacks)
        // // width, height position for attack
        // let width = ctx.canvas.width/numAttacks;
        // let height = 100;
        // // x,y position for first attack click box's top left corner
        // let x = 0
        // let y = ctx.canvas.height - 180
        
        // // attack label
        // ctx.font = "30px Arial";
        // ctx.fillStyle = "Black"
        // ctx.fillText("Attacks", x, y-20)

        // // attack boxes
        // for (let i = 0; i < numAttacks; i++) {
        //     ctx.rect(x + width*i, y, width, height)
        //     ctx.stroke()
        // }

        this.attacks.draw(this.ctx)
    }

    // TBD: Maybe this function, or maybe do it through html
    draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // display problem
        this.drawProblem()
        // display input field
        if (this.input) {
            this.input._value = ''
        }
        
        this.drawInputField()
        this.drawAttacks()
    }


    // calling all mouse click handlers
    mouseClickHandler(e) {
        let x = e.clientX
        let y = e.clientY - 100
        console.log(x,y)

        this.attacks.attackHandler(x,y)

        
    }

    // IMPLEMENT FOR THIS VERSION
    // run this function on a time loop
    update() {
        // update for responsiveness
        // this.ctx.canvas.width  = window.outerWidth;
        // this.ctx.canvas.height = window.outerHeight;
        // this.drawProblem()
        // run verify solution and foundSolution
        
        // check if player got the solution for the problem
        if (this.foundSolution == true) {
            // if yes, call new problem
            this.player.newProblem()
            // draw
            this.draw()
            // add to mana
            this.player.mana += this.player.currProblemMana
            this.player.prevResponseCorrectness = true
            this.foundSolution = false
            console.log("PLAYER MANA:")
            console.log(this.player.mana)

        } else {
            // TODO: display try again above the input box
            
            this.player.prevResponseCorrectness = false
            this.foundSolution = false
        }

        // handle gameOver state
        if (this.player.health == 0 || this.computer.health == 0) {
            this.gameOver()
        }

    }

    
}

