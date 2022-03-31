class SceneAgar extends Phaser.Scene {
  constructor() {
    super();
    this.where_go = []
  }

  preload() {
    this.load.image("agar", "images/agar.png");
    this.load.image("pixel", "images/pixel.png");
    this.load.image("shock", "images/shock.png");
    this.load.image("shock_dropzone", "images/shock_dropzone.png");
    this.load.plugin("rexmovetoplugin",
        "js/rexmovetoplugin.min.js",
        true
    );

  }

  create() {
    // const cam = this.cameras.fromJSON({
    //   name: '',
    //   x: 0,
    //   y: 0,
    //   width: 1920,
    //   height: 500,
    //   zoom: 1,
    //   rotation: 0,
    //   scrollX: 0,
    //   scrollY: 0,
    //   roundPixels: true,
    //   visible: true,
    //   backgroundColor: '#8888aa',
    //   bounds: null,
    // });


    // this.cameras.main.zoom = 2

    this.graphics = this.add.graphics()
    this.graphics.lineStyle(5, 0xFF00FF, 1.0);
    this.graphics.beginPath();
    this.graphics.moveTo(0, 0);
    this.graphics.lineTo(200, 200);
    this.graphics.closePath();
    this.graphics.strokePath();

    this.graphics.lineStyle(5, 0xFFFFFF, 1.0);
    this.graphics.beginPath();
    this.graphics.moveTo(1920, 1080);
    this.graphics.lineTo(200, 200);
    this.graphics.closePath();
    this.graphics.strokePath();

    this.graphics.lineStyle(5, 0xFFFFFF, 1.0);
    this.graphics.beginPath();
    this.graphics.moveTo(1920, 0);
    this.graphics.lineTo(1920, 1080);
    this.graphics.closePath();
    this.graphics.strokePath();

    this.graphics.lineStyle(5, 0xFFFFFF, 1.0);
    this.graphics.beginPath();
    this.graphics.moveTo(0, 0);
    this.graphics.lineTo(1920, 0);
    this.graphics.closePath();
    this.graphics.strokePath();

    this.graphics.lineStyle(5, 0xFFFF0F, 1.0);
    this.graphics.beginPath();
    this.graphics.moveTo(0, 0);
    this.graphics.lineTo(0, 1080);
    this.graphics.closePath();
    this.graphics.strokePath();

    this.agar = this.matter.add.image(1920/2, 768/2 - 200, "agar")
    // this.matter.add.image(150, 200, "agar")
    // this.matter.add.image(150, 250, "agar")

    this.moveTo = this.plugins.get('rexmovetoplugin').add(this.agar);
    this.moveTo.setSpeed(200);


    let y2Pos = 90, x2Pos = 90, y1Pos = 100, x1Pos = 100
    var angle = Math.atan2(y2Pos - y1Pos, x2Pos - x1Pos) * 180 / Math.PI + 180;
    if (angle >= 270) {
      console.log(360 - (parseInt(angle.toFixed(0)) - 270));
    } else {
      console.log(Math.abs(angle.toFixed(0) - 270));
    }

    let ang = 45, xx = 100, yy = 100, lastY, lastX, et = false
    for (let r = 1; r <= 1500; r++) {
      var radius = r;
      var x = radius * Math.sin(Math.PI * 2 * ang / 360);
      var y = radius * Math.cos(Math.PI * 2 * ang / 360);
      x = (xx + Math.round(x * 100) / 100)//.toFixed(0)
      y = (yy + Math.round(y * 100) / 100)//.toFixed(0)

      if (x >= 0 && y >= 0) {
        // this.where_go.push(x + "_" + y)
        // console.log(x + "_" + y)
      }

      this.add.image(x, y, "pixel")
      if (x >= game.config.width || y >= game.config.height) {
        if (!et) {
          lastX = x
          lastY = y

        }
        et = true
      }
      if (x <= 0) {
        if (!et) {
          lastX = x
          lastY = y

        }
        et = true
      }
      if (y <= 0) {
        if (!et) {
          lastX = x
          lastY = y

        }
        et = true
      }
    }

    // console.log(lastX + "-" + lastY)
    this.add.image(lastX, lastY, "agar")

    // this.where_go.shift()
    // this.where_go.shift()
    // console.log(this.where_go)

    // for (let a = 1; a <= 360; a++) {
    //     var radius = 6;
    //     var angle = a;
    //     var x = radius * Math.sin(Math.PI * 2 * angle / 360);
    //     var y = radius * Math.cos(Math.PI * 2 * angle / 360);
    //
    //     this.add.image(
    //         (100 + Math.round(x * 100) / 100).toFixed(0),
    //         (100 + Math.round(y * 100) / 100).toFixed(0),
    //         "pixel")
    //
    //     console.log((100 + Math.round(x * 100) / 100).toFixed(0) + " " + (100 + Math.round(y * 100) / 100).toFixed(0))
    //
    // }


    this.shock_dropzone = this.add.image(1920/2 + 200, 768/2, "shock_dropzone")//.setScrollFactor(0)
    this.shock = this.add.image(1920/2 + 200, 768/2, "shock")//.setScrollFactor(0)
    // this.shock.setInteractive()
    this.shock_dropzone.setScrollFactor(0)
    this.shock.setScrollFactor(0)

    this.cameras.main.startFollow(this.agar);

    this.moveShock = true

    // this.shock_dropzone.setVisible(false)
    // this.shock.setVisible(false)

    this.input.on("gameobjectdown",() => { })

    this.input.on("pointerdown", (gameObject, localX, localY) => {
      // this.shock.x = this.input.mousePointer.x
      this.shock_dropzone.setVisible(true)
      this.shock.setVisible(true)
      this.moveShock = false

      let x = this.input.mousePointer.x,
          y = this.input.mousePointer.y

      this.shock.x = x
      this.shock.y = y
      // this.shock_dropzone.x = x
      // this.shock_dropzone.y = y
    })

    this.input.on("pointermove", (gameObject) => {
      let x = this.input.mousePointer.x,
          y = this.input.mousePointer.y

      this.shock.x = x
      this.shock.y = y
      if (this.moveShock === false) {

        this.where_go = []
        let angle = this.get_angle(this.shock_dropzone.x, this.shock_dropzone.y, this.shock.x, this.shock.y)
        this.get_route_by_angle(angle)
        return// this._shock()
      }
      this.shock_dropzone.x = x
      this.shock_dropzone.y = y

      // this.shock.setScrollFactor(0)
      // this.shock_dropzone.setScrollFactor(0)
    })

    this.input.on("pointerup", () => {
      this.moveShock = true
      this.shock_dropzone.setVisible(false)
      this.shock.setVisible(false)
    })

    // this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
    //   console.log("drag")
    //   this.where_go = []
    //   // if (parseInt(dragX.toFixed(0)) <= (gameObject.input.dragStartX - 20))
    //   //   return gameObject.y = dragY;
    //   gameObject.x = dragX;
    //   gameObject.y = dragY;
    //   // console.log(gameObject.input.dragStartX)
    //   let angle = this.get_angle(gameObject.input.dragStartX, gameObject.input.dragStartY, gameObject.x, gameObject.y)
    //   this.get_route_by_angle(angle)
    // }, this);

    // this.input.on('dragend', function (pointer, gameObject, dropped) {
    //   gameObject.x = gameObject.input.dragStartX;
    //   gameObject.y = gameObject.input.dragStartY;
    // }, this);

    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {
      bodyB.gameObject.destroy()
    });

    this.moveIt = true
  }

  update() {

    if (!this.moveIt) {
      this.tweens.add({
        targets: this.agar,
        props: {
          x: {
            value: '0', ease: 'InOut'
          },
          y: {
            value: '0', ease: 'InOut'
          }
        },
        duration: 450
      });
      this.moveIt = true
    }
    // console.log(this.agar.x)
    if (this.where_go.length !== 0) {
      let xAndY = this.where_go[0]
      xAndY = xAndY.split("_")
      let x = parseInt(xAndY[0]), y = parseInt(xAndY[1])
      if (y === -1 || x === -1)
        return
      this.moveTo.moveTo({
        x: x,
        y: y
      });
      // this.tweens.add({
      //   targets: this.agar,
      //   props: {
      //     x: {
      //       value: x, ease: ''
      //     },
      //     y: {
      //       value: y, ease: ''
      //     }
      //   },
      //   duration: 3500,
      //   frameRate: 300
      // });

      this.where_go.shift()
    }

    // var cursors = this.input.keyboard.createCursorKeys();
    // if (cursors.up.isDown) {
    //   if (this.cameras.main.scrollY === 0)
    //     return
    //   this.cameras.main.scrollY -= 1;
    //   this.agar.y -= 1
    // }
    // if (cursors.down.isDown) {
    //   if (this.cameras.main.scrollY === (1080 - 300))
    //     return
    //   this.cameras.main.scrollY += 1;
    //   this.agar.y += 1
    // }
    // if (cursors.right.isDown) {
    //   if (this.cameras.main.scrollX === (1920 - 300))
    //     return
    //   this.cameras.main.scrollX += 1;
    //   this.agar.x += 1
    // }
    // if (cursors.left.isDown) {
    //   if (this.cameras.main.scrollX === 0)
    //     return
    //   this.cameras.main.scrollX -= 1;
    //   this.agar.x -= 1
    // }
  }

  get_angle(x1, y1, x2, y2) {
    let angle_final
    let angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI + 180;
    if (angle >= 270) {
      angle_final = 360 - (parseInt(angle.toFixed(0)) - 270)
    } else {
      angle_final = Math.abs(angle.toFixed(0) - 270)
    }

    return angle_final
  }

  get_route_by_angle(angle) {
    let ang = angle, lastY, lastX, setX = false, et = false
    for (let r = 1; r <= 2000; r++) {
      var radius = r;
      var x = radius * Math.sin(Math.PI * 2 * ang / 360);
      var y = radius * Math.cos(Math.PI * 2 * ang / 360);
      x = (this.agar.x + Math.round(x * 100) / 100).toFixed(0)
      y = (this.agar.y + Math.round(y * 100) / 100).toFixed(0)
      x = parseInt(x)
      y = parseInt(y)

      // if (x >= 0 && x <= game.config.width && y >= 0 && y <= game.config.height) {
      //   this.where_go.push(x + "_" + y)
      // }

      if (x >= game.config.width || y >= game.config.height) {
        if (!et) {
          lastX = x
          lastY = y

        }
        et = true
      }

      if (x <= 0) {
        if (!et) {
          lastX = x
          lastY = y

        }
        et = true
      }

      if (y <= 0) {
        if (!et) {
          lastX = x
          lastY = y

        }
        et = true
      }

    }

    if (lastY !== undefined || lastX !== undefined) {
      this.where_go.push(lastX + "_" + lastY)
    }

    // et = false
    // console.log(lastX + "_" + lastY)

  }

}