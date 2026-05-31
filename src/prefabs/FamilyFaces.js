class FamilyFaces extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, facesArray, timeBetweenFaces){
        super(scene, x, y, texture)

        scene.add.existing(this);

        
        this.facesArray = facesArray;
        this.timeBetweenFaces = timeBetweenFaces;
        this.currentFace = this.facesArray[3];

        this.setTexture(this.currentFace);
        this.setScale(4);

        this.createTimer();
    }

    createTimer() {

        this.faceSwapTimer = this.scene.time.addEvent({
            delay: Phaser.Math.Between(500, 3000),
            callback: this.swapFace,
            callbackScope: this,
            loop: false
        });

    }

    swapFace(){

        this.currentFace = this.facesArray[Phaser.Math.Between(0, 4)];

        this.setTexture(this.currentFace);

        this.faceSwapTimer.reset({
            delay: this.currentFace === this.facesArray[2] ? 5000 : Phaser.Math.Between(500, 3000), // Hold smile face slightly longer
            callback: this.swapFace,
            callbackScope: this,
            loop: false
        });
    }

    getCurrentFace(){
        return this.currentFace;
    }

}