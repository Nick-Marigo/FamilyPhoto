class Play extends Phaser.Scene {

    constructor() {
        super('playScene');
    }

    create() {

        this.add.image(0, 0, 'photo').setOrigin(0).setScale(4);

        this.happyFaces = 0;
        
        this.faces = ['angry', 'blink', 'happy', 'neutral', 'sad'];

        this.facePositions = [
            {x: 69, y: 62},
            {x: 74, y: 87},
            {x: 92, y: 64},
            {x: 110, y: 68},
            {x: 117, y: 103}
        ].map(({x, y}) => ({x: x * 4 + 10, y: y * 4 + 10}));

        this.familyFaces = this.facePositions.map(({x, y}) => new FamilyFace(this, x, y, this.faces[0], this.faces, 1000));

        this.score = this.add.text(width / 2, height - 550, 'Smiles Captured: 0', { 
            fontSize: '32px',
            fontStyle: 'bold',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5).setVisible(false);

        this.events.on('smilesCaptured', (score) =>{
            this.score.setText('Smiles Captured: ' + score);
        });

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.spaceKey.on('up', (event) => {
            console.log("Space was pressed");
            this.time.removeAllEvents();
            this.cameras.main.flash(1000, 255, 255, 255);
            this.sound.play('cameraClick', { volume: 1 });
            this.time.delayedCall( 1000, () => {
                this.startCountingFaces();
                this.score.setVisible(true)
            })
            
        });

        // TOREMOVE: Debug key to restart scene instead of refreshing
        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.rKey.on('up', (event) => {
            this.scene.restart();
        });

    }

    update() {

    }

    startCountingFaces() {
        this.familyFaces.forEach((faceObj, idx) => this.time.delayedCall(500 * (idx + 1), () => this.countFace(faceObj), this));
    }

    countFace(faceObj) {
        if (faceObj.gradeFace()) {
            this.sound.play('correct', { volume: 1 });
            this.happyFaces++;
            this.events.emit('smilesCaptured', this.happyFaces);
        } else {
            this.sound.play('incorrect', { volume: 1 });
        }
    }
}
