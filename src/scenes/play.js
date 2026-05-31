class Play extends Phaser.Scene {

    constructor() {
        super('playScene');
    }
 
    preload() {

        this.load.setPath("./Assets/Faces");
        this.load.image('angry', 'face-angry.png');
        this.load.image('blink', 'face-blink.png');
        this.load.image('happy', 'face-happy.png');
        this.load.image('neutral', 'face-neutral.png');
        this.load.image('sad', 'face-sad.png');

        this.load.setPath("./Assets/CheckAndXMarks");
        this.load.image('checkMark', 'CheckMark.png');
        this.load.image('greenBox', 'GreenBox.png');
        this.load.image('xMark', 'XMark.png');
        this.load.image('redBox', 'RedBox.png');

        this.load.setPath("./Assets/Sounds")
        this.load.audio('correct', 'CorrectSound.wav');
        this.load.audio('incorrect', 'IncorrectSound.wav');
        this.load.audio('cameraClick', 'Camera.wav');

    }

    create() {

        this.happyFaces = 0;
        
        this.faces = ['angry', 'blink', 'happy', 'neutral', 'sad'];

        this.facePositions = [
            {x: 200, y: 300},
            {x: 300, y: 300},
            {x: 400, y: 300},
            {x: 500, y: 300},
            {x: 600, y: 300}
        ];

        this.familyFace = []

        for (let i = 0; i < 5; i++) {
            this.familyFace.push(new FamilyFaces(this, this.facePositions[i].x, this.facePositions[i].y, this.faces[0], this.faces, 1000));
        }

        this.score = this.add.text(width / 2, height - 550, 'Smiles Captured: 0', { 
            fontSize: '32px',
            fontStyle: 'bold',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5).setVisible(false);

        this.events.on('smilesCaptured', (score) =>{
            this.score.setText('Simles Captured: ' + score);
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

        this.index = 0;

        this.time.addEvent({
        delay: 500,
        callback: this.countFaces,
        callbackScope: this,
        repeat: this.familyFace.length - 1
        });

        console.log(this.happyFaces);
    }

    countFaces() {
        
        if (this.familyFace[this.index].getCurrentFace() == this.faces[2]){
            this.placeMarks(true, this.facePositions[this.index]);
            this.happyFaces++;
            this.events.emit('smilesCaptured', this.happyFaces);
        } else {
            this.placeMarks(false, this.facePositions[this.index]);
        }
            
        this.index++;
    }

    placeMarks(correct, facePosition) {

        let mark;
        let yOffSet = 25;

        if (correct){
            this.add.image(facePosition.x, facePosition.y, 'greenBox').setAlpha(0.8).setScale(1.5);
            mark = this.add.image(facePosition.x, facePosition.y - yOffSet, 'checkMark');
            this.sound.play('correct', { volume: 1 });
        } else {
            this.add.image(facePosition.x, facePosition.y, 'redBox').setAlpha(0.8).setScale(1.5);
            mark = this.add.image(facePosition.x, facePosition.y - yOffSet, 'xMark');
            this.sound.play('incorrect', { volume: 1 });
        }

        this.tweens.add({
            targets: mark,
            y: facePosition.y - yOffSet - 5,
            duration: 50,
            ease: 'linear',
            yoyo: true,
        })

    }

}