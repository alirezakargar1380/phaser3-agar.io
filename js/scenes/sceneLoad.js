class SceneLoad extends Phaser.Scene {

    constructor() {
        super('SceneLoad');
    }

    preload() {
        this.load.audio("explosion", "sfx/explosion.wav", {
            loop: true
        })
    }

    create() {
        this.audio_explosion = this.sound.add('explosion');
        this.audio_explosion.loop = true
        this.audio_explosion.play()
        this.scene.start("SceneAgar")
    }

}