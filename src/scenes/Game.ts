import Phaser from 'phaser'
import {debugDraw} from '../utils/debug'

export default class Game extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private player!: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super('game')
  }

  preload() {
    this.load.aseprite('purple', 'character/purple-sheet.png', 'character/purple-sheet.json')
  }

  create() {
    const map = this.make.tilemap({ key: 'farm' })
    const tileset = map.addTilesetImage('ground', 'tiles')
    map.createLayer('ground', tileset)
    const buildsLayer =  map.createLayer('builds', tileset)

    buildsLayer.setCollisionByProperty({collider: true})
    debugDraw(buildsLayer,this)

    this.anims.create({
      key: 'rotate',
      frames: this.anims.generateFrameNumbers('purple', { start: 0, end: 3 }),
      duration: 0.5, // Adjust duration for faster animation
      frameRate: 10,
      repeat: -1
    })

    this.player = this.physics.add.sprite(128, 128, 'purple')
	  this.player.body.setSize(this.player.width * 0.5, this.player.height * 0.8)
    this.cursors = this.input.keyboard.createCursorKeys()
	  this.physics.add.collider(this.player, buildsLayer)
	  this.cameras.main.startFollow(this.player, true)
  }

  update() {
    if (!this.cursors || !this.player) {
      return;
    }

    const speed = 100

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed)
      this.player.setScale(-1,1)
      this.player.body.offset.x = 32
      //this.player.anims.play('rotate', true) // Play animation on movement	  
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed)
	    this.player.setScale(1)
      //this.player.anims.play('rotate', true) // Play animation on movement
    } else {
      this.player.setVelocityX(0)
      this.player.anims.stop()
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed)
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed)
    } else {
      this.player.setVelocityY(0)
    }

    if (this.cursors.space.isDown) {
      const parts = this.player.anims.currentAnim.key.split('-')	
      parts[1] = 'idle'
      this.player.play(parts.join('-'))
    }
  }
}