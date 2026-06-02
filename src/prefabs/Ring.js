class Ring extends Phaser.GameObjects.Graphics {
    constructor(scene, x, y, radius) {
        super (scene, x, y)

        this.scene = scene;
        this.x = x;
        this.y = y;
        this.radius = radius

        this.scene.add.existing(this);
    }

    drawProgressRing(){
        this.clear();
        this.lineStyle(25, 0xffff00, 1);
        this.beginPath();
        this.arc(this.x, this.y, this.radius, Phaser.Math.DegToRad(-90), Phaser.Math.DegToRad(-90 + 360 * this.scene.getTimePercentRemaining()), false);
        this.strokePath();
    }

}