class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // adds rocket to scene 
        this.movementSpeed = 3; // rocket movement speed, px per frame 
        this.isFiring = false; // rocket firing status 
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
            if (Phaser.Input.Keyboard.JustDown(keyF)) {
                this.isFiring = true;
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
