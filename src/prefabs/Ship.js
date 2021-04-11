class Ship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this); // adds ship to scene 
        this.movementSpeed = 2; // ship movement speed, px per frame 
        this.points = pointValue; // point value of ship 
    }

    update() {
        // moves ship left 
        this.x -= this.movementSpeed;
        // wraps ship around from left border to right border 
        if (this.x < -this.width) {
            this.reset(); 
        }
    }

    // reset ship state 
    reset() {
        this.x = game.config.width + 50;
        this.alpha = 1;
    }
}