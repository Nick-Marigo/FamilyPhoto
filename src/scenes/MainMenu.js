class MainMenu extends Phaser.Scene {

    constructor() {
        super('mainMenuScene');
    }

    create() {
        this.createTitle();

        this.createMenuButtons();

        this.backgroundMusic = this.sound.add ('backgroundMusic', { volume: 0.3, loop: true });

        if (!this.backgroundMusic.isPlaying) {
            this.backgroundMusic.play();
        }
    }

    createTitle() {
        const titleStyle = {
            fontSize: '64px',
            fontFamily: 'Helvetica', // FIXME customize font
            color: '#FFF',
            align: 'center'
        };

        this.titleText = this.add.text(...canvasPos(0.5, 0.4), 'The Family Photo', titleStyle)
        this.titleText.setOrigin(0.5);
    }

    createMenuButtons() {
        const buttonTextStyle = {
            fontSize: '32px',
            fontFamily: 'Helvetica', // FIXME customize font
            color: '#000',
            align: 'center',
            padding: 4
        };

        this.createButton('Play', ...canvasPos(0.5, 0.6), buttonTextStyle, this.startPlay);
        this.createButton('Credits', ...canvasPos(0.5, 0.8), buttonTextStyle, this.startCredits);
    }

    startPlay() {
        this.scene.start('playScene');
    }

    startCredits() {
        this.scene.start('creditsScene');
    }

}
