const EVENT_SMILE_CAPTURED = 'smileCaptured';

class Play extends Phaser.Scene {

    constructor() {
        super('playScene');
        this.playtimeMillisec = 30 * 1000;
    }

    create() {
        this.isGameOver = false;
        this.gameTimer = this.time.delayedCall(this.playtimeMillisec, this.setGameOver, null, this);

        this.isGradingFaces = false;

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

        this.events.on(EVENT_SMILE_CAPTURED, this.onSmileCaptured, this);

        let timer = new Timer(this, 50, 50, 10, 30);

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.spaceKey.on('up', this.shootPhoto, this);

        // TOREMOVE: Debug key to restart scene instead of refreshing
        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.rKey.on('up', this.exitGrading, this);
    }

    update() {
        console.log(`Time remaining ${this.getTimerSecondsRemaining()}`)
    }

    onSmileCaptured() {
        this.score.setText(`Smiles Captured: ${this.happyFaces}`);
    }

    shootPhoto(event) {
        if (this.isGradingFaces || this.isGameOver) {
            return;
        }
        this.isGradingFaces = true;
        this.familyFaces.forEach(face => face.faceSwapTimer.paused = true);
        this.events.emit(EVENT_SMILE_CAPTURED, 0);
        this.cameras.main.flash(1000, 255, 255, 255);
        this.sound.play('cameraClick', { volume: 1 });
        this.gameTimer.paused = true;
        this.time.delayedCall( 1000, () => {
            this.startCountingFaces();
            this.score.setVisible(true);
        })
    }

    startCountingFaces() {
        this.familyFaces.forEach((faceObj, idx) => this.time.delayedCall(500 * (idx + 1), () => this.countFace(faceObj), this));
    }

    countFace(faceObj) {
        if (faceObj.gradeFace()) {
            this.sound.play('correct', { volume: 1 });
            this.happyFaces++;
            this.events.emit(EVENT_SMILE_CAPTURED);
        } else {
            this.sound.play('incorrect', { volume: 1 });
        }
    }

    exitGrading(event) {
        // Only allow player to exit grading if all delayed calls have completed
        if (!(this.isGradingFaces && this.isFinishedGradingFaces())) {
            return;
        }

        this.familyFaces.forEach(face => face.reset());
        this.happyFaces = 0;
        this.isGradingFaces = false;
        this.score.setVisible(false);
        this.gameTimer.paused = false;
    }

    isFinishedGradingFaces() {
        return this.familyFaces.every(faceObj => faceObj.graded);
    }

    setGameOver() {
        this.familyFaces.forEach(face => face.faceSwapTimer.paused = true);
        this.isGameOver = true;
        console.log('Game over!');
    }

    getTimePercentRemaining() {
        return this.gameTimer.getRemaining() / this.playtimeMillisec;
    }

}
