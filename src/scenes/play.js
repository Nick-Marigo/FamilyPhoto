class Play extends Phaser.Scene {

    constructor() {
        super('playScene');
    }
 
    preload() {

        this.load.setPath("./assets/faces")
        this.load.image('angry', 'face-angry.png');
        this.load.image('blink', 'face-blink.png');
        this.load.image('happy', 'face-happy.png');
        this.load.image('neutral', 'face-neutral.png');
        this.load.image('sad', 'face-sad.png');

    }

    create() {
        
        this.facesArray = [];
        const faces = ['angry', 'blink', 'happy', 'neutral', 'sad'];

        const facePositions = [
            {x: 400, y: 300}
        ];

        let familyFace = []

        for (let i = 0; i < 1; i++) {
            familyFace.push(new FamilyFaces(this.scene, facePositions[i].x, facePositions[i].y, faces, 1000));
        }

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.spaceKey.on('up', (event) => {
            console.log("Space was pressed");
        });

    }

    update() {

    }

}