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
  }

  create() {
    this.cameras.main.setSize(300, 300);

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

    this.graphics.lineStyle(5, 0xFFFF0F, 1.0);
    this.graphics.beginPath();
    this.graphics.moveTo(0, 1080);
    this.graphics.lineTo(200, 200);
    this.graphics.closePath();
    this.graphics.strokePath();

    this.graphics.lineStyle(5, 0xFFFF0F, 1.0);
    this.graphics.beginPath();
    this.graphics.moveTo(1920, 0);
    this.graphics.lineTo(200, 200);
    this.graphics.closePath();
    this.graphics.strokePath();

    this.agar = this.matter.add.image(100, 100, "agar")
    // this.matter.add.image(150, 200, "agar")
    // this.matter.add.image(150, 250, "agar")

    let y2Pos=90,x2Pos=90,y1Pos=100,x1Pos=100
    var angle = Math.atan2(y2Pos - y1Pos, x2Pos - x1Pos) * 180 / Math.PI + 180;
    if (angle>=270){
      console.log(360-(parseInt(angle.toFixed(0))-270));
    }else {
      console.log(Math.abs(angle.toFixed(0)-270));
    }

    let ang = 225, xx = 100, yy = 100, lastY, lastX, et=false
    for (let r = 1; r <= 200; r++) {
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
      if (x>=200||y>=200){
        if (!et){
          lastX = x
          lastY = y

        }
        et=true
      }
      if (x<=0){
        if (!et){
          lastX = x
          lastY = y

        }
        et=true
      }
      if (y<=0){
        if (!et){
          lastX = x
          lastY = y

        }
        et=true
      }
    }

    // console.log(lastX + "-" + lastY)
    // this.add.image(lastX, lastY, "agar")

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


    this.shock_dropzone = this.add.image(-150,-150, "shock_dropzone")

    this.shock = this.add.image(-150, -150, "shock")
    this.shock.setInteractive()
    this.input.setDraggable(this.shock)

    this.moveShock = true
    this.shockStartX = null
    this.shockStartY = null

    this.input.on("pointerdown", (gameObject) => {
      // console.log("pointerdown")
      this.moveShock = false
      let x = parseInt(gameObject.position.x.toFixed(0)), y = parseInt(gameObject.position.y.toFixed(0))
      this.shock.x = x
      this.shock.y = y
      this.shock_dropzone.x = x
      this.shock_dropzone.y = y
    })

    this.input.on("pointermove", (gameObject) => {
      // console.log("pointermove")
      let x = parseInt(gameObject.position.x.toFixed(0)), y = parseInt(gameObject.position.y.toFixed(0))


      this.shock.x = x
      this.shock.y = y
      if (this.moveShock === false) {
        this.where_go = []
        let angle = this.get_angle(this.shock_dropzone.x, this.shock_dropzone.y, this.shock.x, this.shock.y)
        console.log(angle)
        this.get_route_by_angle(angle)
        return// this._shock()
      }
      this.shock_dropzone.x = x
      this.shock_dropzone.y = y
    })

    this.input.on("pointerup", () => {
      this.moveShock = true
      // this.shock.x = this.shock_dropzone.x
      // this.shock.y = this.shock_dropzone.y
      this.shock_dropzone.x = -150
      this.shock_dropzone.y = -150
      this.shock.x = -150
      this.shock.y = -150
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

  }

  _shock() {

  }

  update() {
    if (this.where_go.length !== 0) {
      let xAndY = this.where_go[0]
      // console.log(xAndY)
      xAndY = xAndY.split("_")
      let x = parseInt(xAndY[0]), y = parseInt(xAndY[1])
      this.agar.x = x
      this.agar.y = y
      this.where_go.shift()
    }

    var cursors = this.input.keyboard.createCursorKeys();
    if (cursors.up.isDown) {
      if (this.cameras.main.scrollY === 0)
        return
      this.cameras.main.scrollY -= 1;
      this.agar.y -= 1
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
      this.agar.x += 1
    }
    if (cursors.left.isDown) {
      if (this.cameras.main.scrollX === 0)
        return
      this.cameras.main.scrollX -= 1;
      this.agar.x -= 1
    }
  }

  get_angle(x1, y1, x2, y2) {
    let angle_final
    let angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI + 180;
    if (angle>=270){
      angle_final = 360 - (parseInt(angle.toFixed(0))-270)
    }else {
      angle_final = Math.abs(angle.toFixed(0)-270)
    }

    return angle_final
  }

  get_route_by_angle(angle) {
    let ang = angle
    for (let r = 1; r <= 200; r++) {
      var radius = r;
      var x = radius * Math.sin(Math.PI * 2 * ang / 360);
      var y = radius * Math.cos(Math.PI * 2 * ang / 360);
      x = (this.agar.x + Math.round(x * 100) / 100).toFixed(0)
      y = (this.agar.y + Math.round(y * 100) / 100).toFixed(0)
      x = parseInt(x)
      y = parseInt(y)


      if (x >= 0 && x <= 200 && y >= 0 && y <= 200) {
        this.where_go.push(x + "_" + y)
      }

    }

  }

}