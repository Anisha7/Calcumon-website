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

    
class Game {
    constructor(ctx) {
        this.ctx = ctx
        this.gameState = true

        this.player = new Player() // initialize player
        this.computer = '' // implement computer class
        this.input = ''
        
          
    }

    // IMPLEMENT FOR THIS VERSION
    

    // TO DO: check if player solution is valid
    // input: userInput
    verifySolution() {
        // user input == curr solution
        // alert(userInput)
        console.log(this.input._value)

        alert(this.input._value)
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
        ctx.fillText("Problem: "+this.player.currProblem, 100, 50);
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
            placeHolder: 'Enter your solution here...',
            value: '',
            x: ctx.canvas.width/2,
            y: 20,
            onsubmit: () => { 
                return this.verifySolution() 
            }
        });
        this.input.render()
    }

    // TBD: Maybe this function, or maybe do it through html
    draw() {
        // display problem
        this.drawProblem()
        // display input field
        this.drawInputField()
    }

    // IMPLEMENT FOR THIS VERSION
    // run this function on a time loop
    update() {
        this.draw()

        // Gets the player input from the problem-solution form when solution is submitted by player
        let userInput = this.player.respond()
        
        // check if player got the solution for the problem
        if (this.verifySolution(userInput) == true) {
            // if yes, call new problem
            this.newProblem()
            this.player.prevResponseCorrectness = true
            // add to player mana based on problem's value
        } else {
            // if no, clear input field and display try again above the input box
            document.getElementById('userInput').placeholder = 'try again!'
        }
        

        // allow skipping of a problem
        let skip = document.getElementById('skip')
        skip.onclick = function() {
            this.player.prevResponseCorrectness = false
            this.newProblem()
            return
        }

        // handle gameOver state
        if (this.player.health == 0 || this.computer.health == 0) {
            this.gameOver()
        }
    }

    
}

let canvas = document.getElementById("game");
// 2D rendering context, to paint to canvas
let ctx = canvas.getContext("2d");
let Calcumon = new Game(ctx)
ctx.canvas.width  = window.innerWidth;
// ctx.canvas.height = window.innerHeight;

// will execute draw every 10 milliseconds
setInterval(Calcumon.update(), 10);