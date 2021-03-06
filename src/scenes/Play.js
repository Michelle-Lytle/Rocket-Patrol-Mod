class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // background
        this.load.image(
            'stars',
            'assets/stars.png'
        );
        this.load.image(
            'background',
            'assets/background.png'
        );
        // cat 
        this.load.image(
            'cat',
            'assets/cat.png'
        );
        // wizard hat 
        this.load.image(
            'wizardHat',
            'assets/wizardHat.png'
        );
        // whale 
        this.load.image(
            'whale',
            'assets/whale.png'
        );
        // animation 
        this.load.spritesheet(
            'bubbleAnimation',
            'assets/bubbleAnimation.png',
            {
                frameWidth: 64,
                frameHeight: 32,
                startFrame: 0,
                endFrame: 9
            }
        );
        // borders 
        this.load.image(
            'borderR',
            'assets/borderR.png'
        );
        this.load.image(
            'borderL',
            'assets/borderL.png'
        );
        this.load.image(
            'borderT',
            'assets/borderT.png'
        );

        this.load.image(
            'borderB',
            'assets/borderB.png'
        );

    }

    create() {
        // adds background 
        this.stars = this.add.tileSprite(
            0,
            0,
            640,
            480,
            'stars'
        ).setOrigin(0, 0);

        this.background = this.add.tileSprite(
            0, 
            0, 
            640, 
            480, 
            'background'
        ).setOrigin(0, 0);
        
        // adds rocket 
        this.p1Rocket = new Rocket(
            this, 
            game.config.width / 2,
            game.config.height - borderUISize - borderPadding,
            'cat'
        ).setOrigin(0.5, 0);

        // adds hat
        this.wizHat = new Hat(
            this,
            game.config.width / 2,
            game.config.height - borderUISize - borderPadding * 2,
            'wizardHat'
        ).setOrigin(0.5, 0);

        // adds ships 
        this.ship01 = new Ship (
            this,
            game.config.width + borderUISize * 6,
            borderUISize * 4,
            'whale',
            0,
            30
        ).setOrigin(0, 0);

        this.ship02 = new Ship (
            this,
            game.config.width + borderUISize * 3, 
            borderUISize * 5 + borderPadding * 2,
            'whale',
            0,
            20
        ).setOrigin(0, 0);

        this.ship03 = new Ship (
            this,
            game.config.width,
            borderUISize * 6 + borderPadding * 4,
            'whale',
            0,
            10 
        ).setOrigin(0, 0);

        // adds borders
        this.borderR = this.add.image(
            game.config.width - borderUISize, 
            0, 
            'borderR'
            ).setOrigin(0, 0);

        this.borderL = this.add.image(
            0, 
            0, 
            'borderL'
        ).setOrigin(0, 0);

        this.borderT = this.add.image(
            0, 
            0, 
            'borderT'
        ).setOrigin(0, 0); 

        this.borderB = this.add.tileSprite(
            0, 
            game.config.height - borderUISize,
            640, 
            32, 
            'borderB'
        ).setOrigin(0, 0); 

        // key definitions 
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
        // creates explosion animation 
        this.anims.create({
            key: 'bubbleAnimation',
            frames: this.anims.generateFrameNumbers(
                'bubbleAnimation',
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
            fontFamily: 'Tahoma',
            fontSize: '28px',
            backgroundColor: '#231942',
            color: '#ff6969',
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

        // game over flag 
        this.gameOver = false;

        // 60 second clock 
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(
            game.settings.gameTimer, //clock time 
            () => {
                // game over text 
                this.add.text(
                    game.config.width / 2,
                    game.config.height / 2,
                    'GAME OVER',
                    scoreConfig
                ).setOrigin(0.5);
                this.add.text(
                    game.config.width / 2,
                    game.config.height / 2 + 64,
                    'Press (R) to Restart or ??? for Menu',
                    scoreConfig
                ).setOrigin(0.5);
                // ends game 
                this.gameOver = true; 
            }, 
            null,
            this
        );
    }

    update() {
        // resets game 
        if (this.gameOver && 
            Phaser.Input.Keyboard.JustDown(keyR)
        ) {
            this.scene.restart(); 
        }

        // resets game to menu 
        if (this.gameOver &&
            Phaser.Input.Keyboard.JustDown(keyLEFT)
        ) {
            this.scene.start('menuScene'); 
        }

        // stops updating when timer is finished 
        if (!this.gameOver) {
            // background update 
            this.stars.tilePositionX -= 2;
            this.background.tilePositionX -= 3;
            this.borderB.tilePositionX -= 4;

            // rocket update 
            this.p1Rocket.update();

            // hat update 
            this.wizHat.update(this.p1Rocket);

            // ships update 
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();

            // collision check 
            this.checkCollision(this.p1Rocket, this.ship01, false);
            this.checkCollision(this.p1Rocket, this.ship02, false);
            this.checkCollision(this.p1Rocket, this.ship03, false);
            this.checkCollision(this.wizHat, this.ship01, true);
            this.checkCollision(this.wizHat, this.ship02, true);
            this.checkCollision(this.wizHat, this.ship03, true);

            // checks if rocket or hat can fire 
            this.checkFire(this.p1Rocket, this.wizHat);
        }
    }

    // checks and updates if rocket hits ship 
    checkCollision(rocket, ship, hat) {
        if (rocket.x + rocket.width > ship.x && 
            rocket.x < ship.x + ship.width &&
            rocket.y + rocket.height > ship.y &&
            rocket.y < ship.y + ship.height
        ) {
            // hat does not reset upon collision 
            if (!hat) {
                rocket.reset(); // resets rocket state 
            }
            this.shipExplode(ship); // plays explosion and resets ship state 
        }
    }

    // prevents both weapons from firing at same time 
    checkFire(rocket, hat) {
        if (rocket.isFiring) {
            hat.canFire = false;
        }
        else {
            hat.canFire = true;
        }
        if (hat.isFiring) {
            rocket.canFire = false;
        }
        else {
            rocket.canFire = true;
        }
        // prevents player from using both cat and wizard hat at the same time 
        if (rocket.y != game.config.height - borderUISize - borderPadding && 
            hat.y != game.config.height - borderUISize - borderPadding * 2) {
            hat.reset(rocket); //if F and G are pressed at the same time, the hat will be reset 
        }
    }

    // plays animation, updates ship state, and updates score 
    shipExplode(ship) {
        // temporary values store ship's x and y position before it is removed 
        let animX = ship.x;
        let animY = ship.y;
        ship.reset(); // resets ship state 
        let boom = this.add.sprite(
            animX,
            animY,
            'bubbleAnimation'
        ).setOrigin(0, 0);
        boom.anims.play('bubbleAnimation');
        boom.on(
            'animationcomplete', 
            () => {
                boom.destroy(); // removes completed animation 
            }
        );
        // updates score with ship's point value 
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');  // plays explosion sfx 
    }
}