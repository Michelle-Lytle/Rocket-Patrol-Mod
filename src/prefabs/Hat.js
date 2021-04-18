class Hat extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // adds hat to scene 
        this.movementSpeed = 3; // hat movement speed, px per frame 
        this.isFiring = false; // hat firing status 
        this.canFire = true; 
        this.isLooping = false; // if hat is moving back 
        this.sfxHat = scene.sound.add('sfx_rocket'); // adds hat sfx 
    }

    update(rocket) {
        // hat movement when firing 
        if (this.isFiring) {
            // changes hat direction when hat loops back
            if (this.isLooping) { 
                this.y += this.movementSpeed;
                // resets hat when it reaches the bottom of the screen 
                if (this.y >= game.config.height - borderUISize - borderPadding * 2) {
                    this.reset(rocket);
                }
            }
            else {
                // hat moves up 
                this.y -= this.movementSpeed;
                // hat begins looping when it reaches the top of the screen
                if(this.y < borderUISize * 3) {
                    this.isLooping = true;
                }
            }        
        } else {
            // hat moves with rocket 
            if (this.canFire) {
                if (keyLEFT.isDown) {
                    this.x -= rocket.movementSpeed;
                }

                if (keyRIGHT.isDown) {
                    this.x += rocket.movementSpeed;
                }

                // hat cannot move outside of screen 
                this.x = Phaser.Math.Clamp(
                    this.x, 
                    borderUISize + borderPadding, 
                    game.config.width - borderUISize - borderPadding);
                }

            // hat firing controls 
            if (Phaser.Input.Keyboard.JustDown(keyG) && this.canFire) {
                this.isFiring = true;
                this.sfxHat.play(); // plays firing sfx 
            }
        }
    }

    reset(rocket) {
        // reset hat state 
        this.x = rocket.x; // sets hat to x position of rocket 
        this.isFiring = false;
        this.isLooping = false; 
    }
}
