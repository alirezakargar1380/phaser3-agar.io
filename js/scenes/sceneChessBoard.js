class SceneChessBoard extends Phaser.Scene {
  constructor () {
    super();
  }

  preload () {
    this.load.image('black_soldier_nut', 'images/black_soldier_nut.png');
    this.load.spritesheet('castle_nut_selected', 'images/castle_nut_selected.png',
          {
            frameWidth: 37,
            frameHeight: 45
          })
  }

  create () {
    // const mummyAnimation = this.anims.create({
    //   key: 'walk',
    //   frames: this.anims.generateFrameNumbers('castle_nut_selected'),
    //   frameRate: 16
    // });

    // const sprite = this.add.sprite(50, 300, 'castle_nut_selected').setScale(4);

    // sprite.play({ key: 'walk', repeat: 7, repeatDelay: 1000 });

    // this.tweens.add({
    //   targets: sprite,
    //   x: 750,
    //   duration: 8800,
    //   ease: 'linear'
    // });



    const poop = this.add.image(60 - 32, 300, 'black_soldier_nut')//.setScale(0.5);
    console.log(this.tweens)
    this.tweens.add({
      targets: poop,
      props: {
        x: {
          value: '1000', ease: 'Power1'
        },
        y: {
          value: '1400', ease: 'InOut'
        }
      },
      duration: 450
    });



    // sprite.on('animationrepeat', function () {
    //   const poop = this.add.image(sprite.x - 32, 300, 'black_soldier_nut').setScale(0.5);
    //
    //   this.tweens.add({
    //     targets: poop,
    //     props: {
    //       x: {
    //         value: '-=64', ease: 'Power1'
    //       },
    //       y: {
    //         value: '+=50', ease: 'Bounce.easeOut'
    //       }
    //     },
    //     duration: 450
    //   });
    //
    // }, this);


  }
}