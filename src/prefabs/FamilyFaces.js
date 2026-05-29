class FamilyFaces extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, facesArray, timeBetweenFaces){
        super(scene, x, y)

        scene.add.existing(this);

        
        this.facesArray = facesArray;
        this.timeBetweenFaces = timeBetweenFaces;
        this.currentFace = this.facesArray[3];

        this.add.sprite(0, 0, this.currentFace)

        GenerateFacesWithFrameRate();
    }

    GenerateFacesWithFrameRate() {

    }

}