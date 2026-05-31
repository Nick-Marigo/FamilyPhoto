class FamilyFace extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, facesArray, timeBetweenFaces) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        
        this.facesArray = facesArray;
        this.timeBetweenFaces = timeBetweenFaces;
        this.currentFace = 'neutral';

        this.setTexture(this.currentFace);
        this.setScale(4);

        this.createTimer();

        this.gradeBox = scene.add.image(this.x, this.y, 'redBox').setAlpha(0.8).setScale(1.5).setVisible(false);
        this.gradeMark = scene.add.image(this.x, this.y - 25, 'xMark').setVisible(false);
    }

    createTimer() {

        this.faceSwapTimer = this.scene.time.addEvent({
            delay: Phaser.Math.Between(500, 3000),
            callback: this.swapFace,
            callbackScope: this,
            loop: false
        });

    }

    swapFace() {

        this.currentFace = this.facesArray[Phaser.Math.Between(0, 4)];

        this.setTexture(this.currentFace);

        this.faceSwapTimer.reset({
            delay: this.currentFace === 'happy' ? 5000 : Phaser.Math.Between(500, 3000), // Hold smile face slightly longer
            callback: this.swapFace,
            callbackScope: this,
            loop: false
        });
    }

    getCurrentFace() {
        return this.currentFace;
    }

    gradeFace() {
        const isHappy = this.getCurrentFace() === 'happy';

        if (isHappy) {
            this.gradeBox.setTexture('greenBox');
            this.gradeMark.setTexture('checkMark');
        } else {
            this.gradeBox.setTexture('redBox');
            this.gradeMark.setTexture('xMark');
        }

        this.gradeBox.setVisible(true);
        this.gradeMark.setVisible(true);

        this.scene.tweens.add({
            targets: this.gradeMark,
            y: this.y - 30,
            duration: 50,
            ease: 'linear',
            yoyo: true,
        });

        return isHappy;
    }

    hideGrade() {
        this.gradeBox.setVisible(false);
        this.gradeMark.setVisible(false);
    }

}