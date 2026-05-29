class FamilyFaces extends Phaser.GameObjects.Sprite {

    constructor(spritesheet, timeBetweenFaces){
        super()

        this.spritesheet = spritesheet;
        this.timeBetweenFaces = timeBetweenFaces;

        GenerateFacesWithFrameRate();
    }

    GenerateFacesWithFrameRate() {

    }

}