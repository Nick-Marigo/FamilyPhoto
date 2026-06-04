// Family Photo by Eric Welch and Nick Marigo

// Sounds:
// Correct and Incorrect sound: https://freesound.org/people/LaurenPonder/sounds/635643/
// Camera sound: https://freesound.org/people/theplax/sounds/624937/
// Background Music: https://freesound.org/people/JonLakeMusic/sounds/767358/

//Fonts: Vito Bold: https://www.dafont.com/vito-bold.font

'use strict';

const urlQueryParams = new URLSearchParams(window.location.search);

let config = {
    canvasStyle: 'display: block;',
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game',
    backgroundColor: '#FACADE',
    render: {
        pixelArt: true
    },
    scene: [ new Initialize(urlQueryParams.get('mode')), MainMenu, Play, Credits ]
}

let width = config.width;
let height = config.height;

let game = new Phaser.Game(config);