class SceneAgar extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.image("agar", "images/agar.png");
    this.load.image("pixel", "images/pixel.png");
  }

  create() {
    this.cameras.main.setSize(300, 300);

    // this.graphics = this.add.graphics()
    // this.graphics.lineStyle(5, 0xFF00FF, 1.0);
    // this.graphics.beginPath();
    // this.graphics.moveTo(0, 0);
    // this.graphics.lineTo(200, 200);
    // this.graphics.closePath();
    // this.graphics.strokePath();
    //
    // this.graphics.lineStyle(5, 0xFFFFFF, 1.0);
    // this.graphics.beginPath();
    // this.graphics.moveTo(1920, 1080);
    // this.graphics.lineTo(200, 200);
    // this.graphics.closePath();
    // this.graphics.strokePath();
    //
    // this.graphics.lineStyle(5, 0xFFFF0F, 1.0);
    // this.graphics.beginPath();
    // this.graphics.moveTo(0, 1080);
    // this.graphics.lineTo(200, 200);
    // this.graphics.closePath();
    // this.graphics.strokePath();
    //
    // this.graphics.lineStyle(5, 0xFFFF0F, 1.0);
    // this.graphics.beginPath();
    // this.graphics.moveTo(1920, 0);
    // this.graphics.lineTo(200, 200);
    // this.graphics.closePath();
    // this.graphics.strokePath();

    // this.agar = this.matter.add.image(150, 150, "agar")
    // this.matter.add.image(150, 200, "agar")
    // this.matter.add.image(150, 250, "agar")

    for (let a = 1; a <= 360; a++) {
      // for (let r = 20; r >= 1 ; r--) {
        var radius = 6;
        var angle = a;
        var x = radius * Math.sin(Math.PI * 2 * angle / 360);
        var y = radius * Math.cos(Math.PI * 2 * angle / 360);

        this.add.image(
            (100 + Math.round(x * 100) / 100).toFixed(0),
            (100 + Math.round(y * 100) / 100).toFixed(0),
            "pixel")

        console.log((100 + Math.round(x * 100) / 100).toFixed(0) + " " + (100 + Math.round(y * 100) / 100).toFixed(0))

      }
    // }



    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
      bodyB.gameObject.destroy()
    });

  }

  update() {
    return
    var cursors = this.input.keyboard.createCursorKeys();
    if (cursors.up.isDown) {
      if (this.cameras.main.scrollY === 0)
        return
      this.cameras.main.scrollY -= 1;
    }
    if (cursors.down.isDown) {
      if (this.cameras.main.scrollY === (1080 - 300))
        return
      this.cameras.main.scrollY += 1;
      this.agar.y += 1
    }
    if (cursors.right.isDown) {
      if (this.cameras.main.scrollX === (1920 - 300))
        return
      this.cameras.main.scrollX += 1;
    }
    if (cursors.left.isDown) {
      if (this.cameras.main.scrollX === 0)
        return
      this.cameras.main.scrollX -= 1;
    }
  }
}