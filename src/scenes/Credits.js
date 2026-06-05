const creditsHeader = 'Produced by';
const creditsAuthors ='Nick Marigo\nEric Welch';
const creditsSayCheese = '"Say Cheese" said\nby Nathan Altice';
const creditsCheese = '"Cheese" said by Amory,\nChristain, Micheal, Robert,\nMax, Eric, and Nick';
const creditsOther = "Other Sounds:\nCorrect and Incorrect sound by LaurenPonder (freesound.org)\nCamera sound by theplax (freesound.org) \nBackground Music by JonLakeMusic (freesounds.org)\nFont:\nVito Bold by Syafrizal: (dafont.com)"

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
        const textPos = canvasPos(0.5, 0.1375);

        const headerStyle = {
            fontSize: '64px',
            fontFamily: 'Vito_bold',
            color: '#000',
            align: 'center'
        };

        this.headerText = this.add.text(...textPos, creditsHeader, headerStyle)
        this.headerText.setOrigin(0.5, 1.0);

        const authorsStyle = {
            fontSize: '48px',
            fontFamily: 'Vito_bold',
            color: '#000',
            align: 'center'
        };

        this.authorsText = this.add.text(...textPos, creditsAuthors, authorsStyle)
        this.authorsText.setOrigin(0.5, 0.0);

        const soundStyle = {
            fontSize: '24px',
            fontFamily: 'Vito_bold',
            color: '#000',
            align: 'center'
        };

        
        this.add.text(width / 2, 205, creditsSayCheese, soundStyle).setOrigin(0.5, 0.0);

        this.add.text(width / 2, 275, creditsCheese, soundStyle).setOrigin(0.5, 0.0);

        const otherCredits = {
            fontSize: '20px',
            fontFamily: 'Vito_bold',
            color: '#000',
            align: 'center'
        };

        this.add.text(width / 2, 370, creditsOther, otherCredits).setOrigin(0.5, 0.0);
    }

    createExitButton() {
        const buttonTextStyle = {
            fontSize: '48px',
            fontFamily: 'Vito_bold',
            color: '#000',
            align: 'center',
            padding: 4
        };

        this.createButton('Back to Main Menu', ...canvasPos(0.5, 0.925), buttonTextStyle, this.exitCredits);
    }

    exitCredits() {
        this.scene.start('mainMenuScene');
    }

}
