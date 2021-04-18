class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // adds rocket to scene 
        this.movementSpeed = 4; // rocket movement speed, px per frame 
        this.isFiring = false; // rocket firing status 
        this.canFire = true; // if rocket can fire 
        this.sfxRocket = scene.sound.add('sfx_rocket'); // adds rocket sfx 
    }

    update() {
        // if firing, rocket moves up 
        if (this.isFiring) {
            this.y -= this.movementSpeed;
            // reset rocket on miss 
            if(this.y < borderUISize * 3) {
                this.reset();
            }
        // rocket movement controls 
        } else { 
            if (keyLEFT.isDown) {
                this.x -= this.movementSpeed;
            }

            if (keyRIGHT.isDown) {
                this.x += this.movementSpeed;
            }

            // rocket firing controls 
            if (Phaser.Input.Keyboard.JustDown(keyF) && this.canFire) {
                this.isFiring = true;
                this.sfxRocket.play(); // plays firing sfx 
            }

            // rocket cannot move past border 
            this.x = Phaser.Math.Clamp(
                this.x, 
                borderUISize + borderPadding, 
                game.config.width - borderUISize - borderPadding);
            }
    }

    reset() {
        // reset rocket state 
        this.y = game.config.height - borderUISize - borderPadding;
        this.isFiring = false;
    }
}
