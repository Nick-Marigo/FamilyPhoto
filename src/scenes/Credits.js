const creditsHeader = 'Produced by';
const creditsAuthors ='Nick Marigo\nEric Welch';

// http://127.0.0.1:5500/?mode=creditsScene
// https://.github.io//?mode=creditsScene

class Credits extends Phaser.Scene {

    constructor() {
        super('creditsScene');
    }

    create() {
        this.add.image(0, 0, 'background').setOrigin(0).setScale(4);

        this.createTitle();

        this.createExitButton();
    }

    createTitle() {
        const textPos = canvasPos(0.5, 0.4);

        const headerStyle = {
            fontSize: '80px',
            fontFamily: 'Vito_bold', // FIXME customize font
            color: '#000',
            align: 'center'
        };

        this.headerText = this.add.text(...textPos, creditsHeader, headerStyle)
        this.headerText.setOrigin(0.5, 1.0);

        const authorsStyle = {
            fontSize: '64px',
            fontFamily: 'Vito_bold', // FIXME customize font
            color: '#000',
            align: 'center'
        };

        this.authorsText = this.add.text(...textPos, creditsAuthors, authorsStyle)
        this.authorsText.setOrigin(0.5, 0.0);
    }

    createExitButton() {
        const buttonTextStyle = {
            fontSize: '48px',
            fontFamily: 'Vito_bold', // FIXME customize font
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
