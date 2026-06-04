class MainMenu extends Phaser.Scene {

    constructor() {
        super('mainMenuScene');
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0).setScale(4);

        this.createTitle();

        this.createMenuButtons();
    }

    createTitle() {
        const titleStyle = {
            fontSize: '96px',
            fontFamily: 'Helvetica', // FIXME customize font
            color: '#000',
            align: 'center'
        };

        this.titleText = this.add.text(...canvasPos(0.5), 'The Family Photo', titleStyle)
        this.titleText.setOrigin(0.5);
    }

    createMenuButtons() {
        const buttonTextStyle = {
            fontSize: '48px',
            fontFamily: 'Helvetica', // FIXME customize font
            color: '#000',
            align: 'center',
            padding: 4
        };

        this.createButton('Play', ...canvasPos(0.5, 0.75), buttonTextStyle, this.startPlay);
        this.createButton('Credits', ...canvasPos(0.5, 0.9), buttonTextStyle, this.startCredits);
    }

    startPlay() {
        this.scene.start('playScene');
    }

    startCredits() {
        this.scene.start('creditsScene');
    }

}
