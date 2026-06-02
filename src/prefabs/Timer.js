class Timer extends Phaser.GameObjects.Graphics {
    constructor(scene, x, y, radius, time){
        super (scene, x, y)

        this.scene = scene;
        this.x = x;
        this.y = y;
        this.radius = radius
        this.time = time;

        this.timeStarted = false;

        this.drawProgressRing();

        this.scene.add.existing(this);

        this.startTimer();
    }

    startTimer(){
        this.timeStarted = true;
    }

    drawProgressRing(){
        //let percent = this.calculatePercentLeft();
        this.clear();
        this.lineStyle(6, 0xffff00, 1);
        this.beginPath();
        this.arc(this.x, this.y, this.radius, Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(-90 + 360 * 1), false);
        this.strokePath();
    }

}