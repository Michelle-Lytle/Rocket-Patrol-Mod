class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // audio added for mod 
        this.load.audio('sfx_rocket', 'assets/meow_sfx.wav');
        this.load.audio('sfx_select', 'assets/menu_sfx.wav');
        this.load.audio('sfx_explosion', 'assets/pop_sfx.wav');
        this.load.audio('sfx_hat', 'assets/wizardHat_sfx.wav');
    }

    create() {
        // menu text config 
        let menuConfig = {
            fontFamily: 'Tahoma',
            fontSize: '28px',
            backgroundColor: '#3bbaff',
            color: '#ffffff',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0 
        }

        // menu text display 
        this.add.text(
            game.config.width / 2,
            game.config.height / 2 - borderUISize - borderPadding,
            'cat patrol >:3c',
            menuConfig
        ).setOrigin(0.5);

        this.add.text(
            game.config.width / 2,
            game.config.height / 2,
            'Use ←→ arrows to Move & (F) to Bubble',
            menuConfig
        ).setOrigin(0.5); 

        menuConfig.backgroundColor = '#d042ff';
        menuConfig.color = '#ffffff';
        this.add.text(
            game.config.width / 2,
            game.config.height / 2 + borderUISize + borderPadding,
            'Press ← for Kitten or → for Wizened Cat',
            menuConfig
        ).setOrigin(0.5); 

        // key definitions 
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); 
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); 
    }

    update() {
        // easy mode 
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings = {
               shipSpeed: 3,
               gameTimer: 60000
            }
            this.sound.play('sfx_select'); // plays menu sfx
            this.scene.start('playScene'); // starts game 
        }
        // hard mode 
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
                shipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select'); // plays menu sfx
            this.scene.start('playScene'); // starts game 
        }
    }
}