class Initialize extends Phaser.Scene {

    constructor(queryMode) {
        super('initializeScene');
        this.queryMode = queryMode ?? 'mainMenuScene';
    }
 
    preload() {

        this.load.setPath('./Assets');
        this.load.image('background', 'background.png');
        this.load.image('photo', 'family-photo.png');

        this.load.setPath('./Assets/Camera');
        this.load.image('cameraOverlay', 'CameraOverlay.png');

        this.load.setPath('./Assets/Faces');
        this.load.image('angry', 'face-angry.png');
        this.load.image('blink', 'face-blink.png');
        this.load.image('happy', 'face-happy.png');
        this.load.image('neutral', 'face-neutral.png');
        this.load.image('sad', 'face-sad.png');

        this.load.setPath('./Assets/CheckAndXMarks');
        this.load.image('checkMark', 'CheckMark.png');
        this.load.image('greenBox', 'GreenBox.png');
        this.load.image('xMark', 'XMark.png');
        this.load.image('redBox', 'RedBox.png');

        this.load.setPath('./Assets/Sounds');
        this.load.audio('correct', 'CorrectSound.wav');
        this.load.audio('incorrect', 'IncorrectSound.wav');
        this.load.audio('cameraClick', 'Camera.wav');
        this.load.audio('sayCheese', 'SayCheese.m4a');
        this.load.audio('cheese', 'Cheese.m4a');
        this.load.audio('backgroundMusic', 'BackgroundMusic.mp3');

        this.load.setPath('./Assets/Fonts');
        this.load.font('Vito_bold', 'VitoBold.otf', 'opentype');        

    }

    create() {
        this.sound.play('backgroundMusic', { volume: 0.3, loop: true });

        this.scene.start(this.queryMode);
    }

}