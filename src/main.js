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

20 pts - Create and implement a new weapon (w/ new behavior and graphics) 
    - Added wizard hat (most code under Hat.js)
    - Used with G key 
    - Weapon travels to the top of the screen, then loops back to the bottom 
    - Does not reset upon hitting a whale 
    - Cannot be used while cat is firing, and cat cannot fire while hat is firing 
    - New image for hat 
    - *** new sfx for hat*** 

10 pts - Implement parallax scrolling 
    - Sky and hill in back move slowest 
    - Two hills in the middle move at an average speed 
    - Foreground moves fastest 

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
