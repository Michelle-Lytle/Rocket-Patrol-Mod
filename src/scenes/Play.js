class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image(
            'starfield', 
            'assets/starfield.png'
            );
        this.load.image(
            'rocket', 
            'assets/rocket.png'
            );
        this.load.image(
            'spaceship', 
            'assets/spaceship.png'
            );
        this.load.spritesheet(
            'explosion', 
            'assets/explosion.png',
            {
                frameWidth: 64,
                frameHeight: 32,
                startFrame: 0,
                endFrame: 9 
            }
        ); 
    }

    create() {
        // adds background 
        this.starfield = this.add.tileSprite(
            0, 
            0, 
            640, 
            480, 
            'starfield'
        ).setOrigin(0, 0);
        
        // adds rocket 
        this.p1Rocket = new Rocket(
            this, 
            game.config.width / 2,
            game.config.height - borderUISize - borderPadding,
            'rocket'
        ).setOrigin(0.5, 0);

        // adds ships 
        this.ship01 = new Ship (
            this,
            game.config.width + borderUISize * 6,
            borderUISize * 4,
            'spaceship',
            0,
            30
        ).setOrigin(0, 0);

        this.ship02 = new Ship (
            this,
            game.config.width + borderUISize * 3, 
            borderUISize * 5 + borderPadding * 2,
            'spaceship',
            0,
            20
        ).setOrigin(0, 0);

        this.ship03 = new Ship (
            this,
            game.config.width,
            borderUISize * 6 + borderPadding * 4,
            'spaceship',
            0,
            10 
        ).setOrigin(0, 0);

        // green UI background 
        this.add.rectangle(
            0, 
            borderUISize + borderPadding, 
            game.config.width, 
            borderUISize * 2,
            0x00FF00,
        ).setOrigin(0,0);

        // white borders
        this.add.rectangle(
            0, 
            0, 
            game.config.width, 
            borderUISize, 
            0xFFFFFF
        ).setOrigin(0 ,0);

	    this.add.rectangle(
            0, 
            game.config.height - borderUISize, game.config.width, 
            borderUISize, 
            0xFFFFFF
        ).setOrigin(0 ,0);

	    this.add.rectangle(
            0, 
            0, 
            borderUISize, 
            game.config.height, 
            0xFFFFFF
        ).setOrigin(0 ,0);

	    this.add.rectangle(
            game.config.width - borderUISize, 
            0, 
            borderUISize, 
            game.config.height, 
            0xFFFFFF
        ).setOrigin(0 ,0);

        // key definitions 
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
        // creates explosion animation 
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers(
                'explosion',
                { 
                    start: 0, 
                    end: 9, 
                    first: 0
                }
            ),
            frameRate: 30
        });

        // score init 
        this.p1Score = 0; 
        // score display 
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        // displays score text 
        this.scoreLeft = this.add.text(
            borderUISize + borderPadding, 
            borderUISize + borderPadding * 2,
            this.p1Score,
            scoreConfig 
        );
    }

    update() {
        // background 
        this.starfield.tilePositionX -= 4;

        // rocket 
        this.p1Rocket.update();

        // ships 
        this.ship01.update();
        this.ship02.update();
        this.ship03.update();

        // collision 
        this.checkCollision(this.p1Rocket, this.ship01);
        this.checkCollision(this.p1Rocket, this.ship02);
        this.checkCollision(this.p1Rocket, this.ship03);

    }

    // checks and updates if rocket hits ship 
    checkCollision(rocket, ship) {
        if (rocket.x + rocket.width > ship.x && 
            rocket.x < ship.x + ship.width &&
            rocket.y + rocket.height > ship.y &&
            rocket.y < ship.y + ship.height
        ) {
            rocket.reset(); // resets rocket state 
            this.shipExplode(ship); // plays explosion and resets ship state 
        }
    }

    // plays animation, updates ship state, and updates score 
    shipExplode(ship) {
        ship.alpha = 0; 
        let boom = this.add.sprite(
            ship.x, 
            ship.y, 
            'explosion'
        ).setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on(
            'animationcomplete', 
            () => {
                ship.reset(); // resets ship state 
                boom.destroy(); // removes completed animation 
            }
        );
        // updates score with ship's point value 
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
    }
}