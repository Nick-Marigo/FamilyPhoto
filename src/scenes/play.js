class Play extends Phaser.Scene {

    constructor() {
        super('playScene');
    }
 
    preload() {

    }

    create() {
        
        this.cursor = this.input.keyboard.createCursorKeys();

    }

    update() {
        
        if (this.cursor.space.isDown){
            console.log("Space was pressed");
        }

    }

}