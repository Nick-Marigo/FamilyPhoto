const EVENT_SMILE_CAPTURED = 'smileCaptured';

class Play extends Phaser.Scene {

    constructor() {
        super('playScene');
        this.playtimeMillisec = 30 * 1000;
    }

    create() {
        this.isGameOver = false;
        this.gameTimer = this.time.delayedCall(this.playtimeMillisec, this.setGameOver, null, this);

        const sayCheeseDelay = Math.floor(Phaser.Math.Between(this.playtimeMillisec * 0.4, this.playtimeMillisec * 0.8));
        this.guaranteedSmileTimer = this.time.delayedCall(sayCheeseDelay, this.sayCheese, null, this);

        this.isGradingFaces = false;

        this.add.image(0, 0, 'photo').setOrigin(0).setScale(4);
        this.cameraOverlay = this.add.image(0, 0, 'cameraOverlay').setOrigin(0).setScale(4).setAlpha(.7).setTint(0xE1E1E1);

        this.shutterGraphic = this.add.image(...canvasPos(0.0, -1.0), '__WHITE');
        this.shutterGraphic.setOrigin(0);
        this.shutterGraphic.setDisplaySize(...canvasPos(1.0));
        this.shutterGraphic.setTint(0x00_00_00);

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

        this.sayCheeseText = this.add.text(width / 2, height - 550, 'Say cheese!', {
            fontSize: '32px',
            fontStyle: 'bold',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5).setVisible(false);

        this.takePictureText = this.add.text(width / 2, height - 20, 'Press space to take the picture!', {
            fontSize: '32px',
            fontStyle: 'bold',
            color: '#000000',
            align: 'center'
        }).setOrigin(0.5);

        this.events.on(EVENT_SMILE_CAPTURED, this.onSmileCaptured, this);

        this.progressRing = new Ring(this, 30, 30, 35); // scene, x, y, radius

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.spaceKey.on('up', this.shootPhoto, this);

        // TOREMOVE: Debug key to restart scene instead of refreshing
        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.rKey.on('up', this.exitGrading, this);

        this.createTryAgainButton();
        this.createExitButton();
    }

    update() {
        this.progressRing.drawProgressRing();
    }

    sayCheese() {
        this.sayCheeseText.setVisible(true);

        this.guaranteedSmileTimer = this.time.delayedCall(3000, this.hideSayCheese, null, this);
    }

    hideSayCheese() {
        this.sayCheeseText.setVisible(false);

        this.guaranteedSmileTimer = this.time.delayedCall(Phaser.Math.Between(500, 2000), this.everybodySmile, null, this);
    }

    everybodySmile() {
        this.familyFaces.forEach(faceObj => {
            this.time.delayedCall(Phaser.Math.Between(100, 750), faceObj.sayCheese, null, faceObj);
        });
    }

    onSmileCaptured() {
        this.score.setText(`Smiles Captured: ${this.happyFaces}`);
    }

    cameraSnapEffects() {
        this.cameras.main.flash(1000, 255, 255, 255);
        this.tweens.add({
            targets: this.shutterGraphic,
            y: 0,
            duration: 60,
            ease: 'linear',
            yoyo: true,
        });
    }

    shootPhoto(event) {
        if (this.isGradingFaces || this.isGameOver) {
            return;
        }
        this.isGradingFaces = true;
        this.cameraOverlay.setVisible(false);
        this.progressRing.setVisible(false);
        this.guaranteedSmileTimer.paused = true;
        this.familyFaces.forEach(face => face.faceSwapTimer.paused = true);
        this.cameraSnapEffects();
        this.events.emit(EVENT_SMILE_CAPTURED, 0);
        this.sound.play('cameraClick', { volume: 1 });
        this.gameTimer.paused = true;
        this.sayCheeseText.setVisible(false);
        this.takePictureText.setVisible(false);
        this.time.delayedCall( 1000, () => {
            this.startCountingFaces();
            this.score.setVisible(true);
        })
    }

    startCountingFaces() {
        this.familyFaces.forEach((faceObj, idx) => this.time.delayedCall(500 * (idx + 1), () => this.countFace(faceObj), this));
        this.time.delayedCall(5000, this.showButtons, [true], this);
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
        this.guaranteedSmileTimer.paused = false;
        this.gameTimer = this.time.delayedCall(this.playtimeMillisec, this.setGameOver, null, this);
        this.cameraOverlay.setVisible(true);
        this.progressRing.setVisible(true);
        this.takePictureText.setVisible(true);
        this.showButtons(false);
    }

    isFinishedGradingFaces() {
        return this.familyFaces.every(faceObj => faceObj.graded);
    }

    setGameOver() {
        this.familyFaces.forEach(face => face.faceSwapTimer.paused = true);
        this.isGameOver = true;
        this.guaranteedSmileTimer.paused = true;
        console.log('Game over!');
    }

    getTimePercentRemaining() {
        return this.gameTimer.getRemaining() / this.playtimeMillisec;
    }

    showButtons(show) {
        this.tryAgainButton.setVisible(show);
        this.mainMenuButton.setVisible(show);
    }

    createTryAgainButton() {
        const buttonTextStyle = {
            fontSize: '32px',
            fontFamily: 'Helvetica', // FIXME customize font
            color: '#000',
            align: 'center',
            padding: 4
        };

        this.tryAgainButton = this.createButton('Try Again', ...canvasPos(0.5, 0.8), buttonTextStyle, this.exitGrading);
        this.tryAgainButton.setVisible(false);
    }

    createExitButton() {
        const buttonTextStyle = {
            fontSize: '32px',
            fontFamily: 'Helvetica', // FIXME customize font
            color: '#000',
            align: 'center',
            padding: 4
        };

        this.mainMenuButton = this.createButton('Back to Main Menu', ...canvasPos(0.5, 0.9), buttonTextStyle, this.exitCredits);
        this.mainMenuButton.setVisible(false);
    }

    exitCredits() {
        this.scene.start('mainMenuScene');
    }

}
