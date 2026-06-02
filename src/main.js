// Family Photo by Eric Welch and Nick Marigo

// Sounds:
// Correct and Incorrect sound: https://freesound.org/people/LaurenPonder/sounds/635643/
// Camera sound: https://freesound.org/people/theplax/sounds/624937/



'use strict';

const urlQueryParams = new URLSearchParams(window.location.search);

let config = {
    //parent: 'game',
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    backgroundColor: '#FACADE',
    render: {
        pixelArt: true
    },
    /*physics: {
        default: 'arcade',
        arcade: {
            gravity: { 
                x: 0,
                y: 0,
            },
            debug: false
        }
    },*/
    scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [ new Initialize(urlQueryParams.get('mode')), MainMenu, Play, Credits ]
}

let width = config.width;
let height = config.height;

let game = new Phaser.Game(config);