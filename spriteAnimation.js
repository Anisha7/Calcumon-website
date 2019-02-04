let img1 = "sprites/opp2_sprites/sprites/humans/spr_m_traveler_jump_1up_anim.gif"
let img2 = "sprites/opp2_sprites/sprites/humans/spr_m_traveler_jump_2midair_anim.gif"
let img3 = "sprites/opp2_sprites/sprites/humans/spr_m_traveler_jump_3down_anim.gif"

// load the sprite sheet image for the coin animation. 
let coinImage = new Image();
coinImage.src = "sprites/coin-sprite-animation-sprite-sheet.png";

// define the sprite object so we can create one (or more later). 
// Invoking the object will simply return an object with three public properties.
function sprite (options) {
				
    let that = {},
        frameIndex = 0,
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1;;
					
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    that.update = function () {

        tickCount += 1;
		//  conditional to ignore out of range values.
        if (tickCount > ticksPerFrame) {
        
            tickCount = 0;
            
            // If the current frame index is in range
            if (frameIndex < numberOfFrames - 1) {	
                // Go to the next frame
                frameIndex += 1;
            } else {
                frameIndex = 0;
            }
        }
    }; 

    that.render = function () {
        // Clear the canvas
        context.clearRect(0, 0, that.width, that.height);
        // Draw the animation
        // The parameters specify the source image and the bounding rectangle 
        // dimensions and position of the source sprite sheet and the destination 
        // canvas context.
        that.context.drawImage(
           that.image,
           // move the bounding rectangle of the source sprite sheet 
           // based on the frame index 
           frameIndex * that.width / numberOfFrames,
           0,
           that.width / numberOfFrames,
           that.height,
           0,
           0,
           that.width / numberOfFrames,
           that.height);
    };

    return that;
}

// Grab access to the canvas element
let canvas = document.getElementById("coinAnimation");
canvas.width = 100;
canvas.height = 100;

//  create a sprite object
let coin = sprite({
    context: canvas.getContext("2d"),
    width: 100,
    height: 100,
    image: coinImage,
    numberOfFrames: 10,
	ticksPerFrame: 4
});

function gameLoop () {

    window.requestAnimationFrame(gameLoop);
    
    coin.update();
    coin.render();
  }
  
  // Start the game loop as soon as the sprite sheet is loaded
  coinImage.addEventListener("load", gameLoop);
