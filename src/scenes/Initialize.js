class Initialize extends Phaser.Scene {

    constructor() {
        super('initializeScene');
    }
 
    preload() {

        this.load.setPath("./Assets");
        this.load.image('photo', 'family-photo.png');

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
        
        this.scene.start('playScene');

    }

}