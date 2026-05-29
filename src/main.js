// Phaser 3.9 Template

"use strict"

let config = {
    //parent: 'game',
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    //backgroundColor: '#FACADE',
    /*render: {
        pixelArt: true
    },*/
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
    /*scale: {
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },*/
    scene: [  ]
}

let width = config.width;
let height = config.height;

let game = new Phaser.Game(config)