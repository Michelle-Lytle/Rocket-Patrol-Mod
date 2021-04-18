class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // menu screen 
        this.load.image(
            'menuArt', 
            'assets/menuArt.png'
        );
        // sfx 
        this.load.audio(
            'sfx_rocket', 
            'assets/meow_sfx.wav'
        );
        this.load.audio(
            'sfx_select', 
            'assets/menu_sfx.wav'
        );
        this.load.audio(
            'sfx_explosion', 
            'assets/pop_sfx.wav'
        );
        this.load.audio(
            'sfx_hat', 
            'assets/wizardHat_sfx.wav'
        );
        // background music 
        this.load.audio(
            'bgm', 
            'assets/Komiku - SUPER POUPI.mp3'
        );
    }

    create() {
        // adds background music 
        this.bgm = this.sound.add(
            'bgm', 
            {
                volume: 0.3,
                loop: true
            }
        );
        // starts music if it is not already playing 
        if (!musicPlaying) {
            this.bgm.play();
            musicPlaying = true;
        }

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

        // key definitions 
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT); 
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT); 

        // menu background art 
        this.menuArt = this.add.image(
            0, 
            0,
            'menuArt'
        ).setOrigin(0, 0);
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