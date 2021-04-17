class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // images 
        // background png mod 
        this.load.image(
            'bg',
            'assets/background.png'
        );
        // cat png mod 
        this.load.image(
            'cat',
            'assets/cat.png'
        );
        // whale png mod 
        this.load.image(
            'whale',
            'assets/whale.png'
        );
        // animations 
        // bubble png mod
        this.load.spritesheet(
            'bubble',
            'assets/bubble.png',
            {
                frameWidth: 64,
                frameHeight: 32,
                startFrame: 0,
                endFrame: 9
            }
        );
        // borders mod 
        this.load.image(
            'borderV',
            'assets/borderV.png'
        );
        this.load.image(
            'borderH',
            'assets/borderH.png'
        );

    }

    create() {

        // adds background 
        this.bg = this.add.tileSprite(
            0, 
            0, 
            640, 
            480, 
            'bg'
        ).setOrigin(0, 0);
        
        // adds rocket 
        this.p1Rocket = new Rocket(
            this, 
            game.config.width / 2,
            game.config.height - borderUISize - borderPadding,
            'cat'
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

        // UI background 
        this.add.rectangle(
            0, 
            borderUISize + borderPadding, 
            game.config.width, 
            borderUISize * 2,
            0Xffffff,
        ).setOrigin(0, 0);

        // borders
        this.borderLeft = this.add.image(
            0, 
            0, 
            'borderV'
        ).setOrigin(0, 0);

        this.borderBottom = this.add.image(
            0, 
            game.config.height - borderUISize,
            'borderH'
        ).setOrigin(0, 0);

        this.borderTop = this.add.image(
            0, 
            0, 
            'borderH'
        ).setOrigin(0, 0); 

        this.borderRight = this.add.image(
            game.config.width - borderUISize, 
            0, 
            'borderV'
            ).setOrigin(0, 0);

        // key definitions 
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
        // creates explosion animation 
        this.anims.create({
            key: 'bubble',
            frames: this.anims.generateFrameNumbers(
                'bubble',
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
            backgroundColor: '#ffffff',
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
                    'Press (R) to Restart or ← for Menu',
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
            this.bg.tilePositionX -= 2;

            // rocket update 
            this.p1Rocket.update();

            // ships update 
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();

            // collision check 
            this.checkCollision(this.p1Rocket, this.ship01);
            this.checkCollision(this.p1Rocket, this.ship02);
            this.checkCollision(this.p1Rocket, this.ship03);
        }
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
            'bubble'
        ).setOrigin(0, 0);
        boom.anims.play('bubble');
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
        this.sound.play('sfx_explosion');  // plays explosion sfx 
    }
}