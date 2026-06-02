const creditsHeader = 'Produced by';
const creditsAuthors ='Nick Marigo\nEric Welch';

// http://127.0.0.1:5500/?mode=creditsScene
// https://.github.io//?mode=creditsScene

class Credits extends Phaser.Scene {

    constructor() {
        super('creditsScene');
    }

    create() {
        this.createTitle();

        this.createExitButton();
    }

    createTitle() {
        const textPos = canvasPos(0.5, 0.25);

        const headerStyle = {
            fontSize: '64px',
            fontFamily: 'Helvetica', // FIXME customize font
            color: '#FFF',
            align: 'center'
        };

        this.headerText = this.add.text(...textPos, creditsHeader, headerStyle)
        this.headerText.setOrigin(0.5, 1.0);

        const authorsStyle = {
            fontSize: '32px',
            fontFamily: 'Helvetica', // FIXME customize font
            color: '#FFF',
            align: 'center'
        };

        this.authorsText = this.add.text(...textPos, creditsAuthors, authorsStyle)
        this.authorsText.setOrigin(0.5, 0.0);
    }

    createExitButton() {
        const buttonTextStyle = {
            fontSize: '32px',
            fontFamily: 'Helvetica', // FIXME customize font
            color: '#000',
            align: 'center',
            padding: 4
        };

        this.createButton('Back to Main Menu', ...canvasPos(0.5, 0.9), buttonTextStyle, this.exitCredits);
    }

    exitCredits() {
        this.scene.start('mainMenuScene');
    }

}
