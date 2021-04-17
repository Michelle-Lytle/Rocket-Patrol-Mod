/*
Michelle Lytle 
4/19/21 
cat patrol >:3c
A game where you are a cat wizard using your forbidden magic to bubble sky whales that have been plaguing you for the last week.
Time to complete: ??? 

60 pts - Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi)
    - Artwork: changed images for background, rocket, and ships 
    - UI: added new borders and changed colors and text in UI 
    - Sound: added new sounds for the menu, rocket, and explosion 
    - all the art and audio was made by me in Photoshop and Reaper (with voice acting from my cat) 
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
let keyF, keyR, keyLEFT, keyRIGHT;
