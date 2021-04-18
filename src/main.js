/*
Michelle Lytle 
4/19/21 
cat patrol >:3c
A game where you are a cat wizard using your forbidden magic to bubble sky whales. 
Time to complete: About 20 hours 


60 pts - Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi)
    - Artwork: changed images for background, rocket, and ships 
    - UI: added new borders and changed colors and text in UI 
    - Sound: added new sounds for the menu, rocket, and explosion 
    - All art and audio made in Photoshop and Reaper (with voice acting from my cat) 

20 pts - Create and implement a new weapon (w/ new behavior and graphics) 
    - Added wizard hat (most code under Hat.js)
    - Used with G key 
    - Weapon travels to the top of the screen, then loops back to the bottom 
    - Does not reset upon hitting a whale 
    - Cannot be used while cat is firing, and cat cannot fire while hat is firing 
    - Added new image for hat 
    - Added new sfx for hat 
    - Art and audio made in Photoshop and Reaper 

10 pts - Implement parallax scrolling 
    - Sky and hill in back move slowest 
    - Two hills in the middle move at an average speed 
    - Foreground moves fastest 
    - Code under update() in Play.js 

10 pts - Create a new title screen (e.g., new artwork, typography, layout) 
    - Added new art for the menu screen 
    - Art made in Clip Studio Paint 

5 pts - Add your own (copyright-free) background music to the Play scene 
    - Added music in menu scene 
    - Code under create() in Menu.js 
    - "SUPER POUPI" by Komiku 
    - https://freemusicarchive.org/music/Komiku/Poupis_incredible_adventures_/Komiku_-_Poupis_incredible_adventures__-_20_SUPER_POUPI

*/



let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

// UI sizes 
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// key bindings 
let keyF, keyR, keyG, keyLEFT, keyRIGHT;
// if music is playing 
let musicPlaying = false;
