import Phaser from 'phaser'

import Game from './scenes/Game'
import Preload from './scenes/Preload'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	scale: {
		zoom: 1,
		parent: 'game-container',
		width: 1280,
		height: 800,
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	  },
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			debug: true
		},
	},
	scene: [Preload, Game],
	
}

export default new Phaser.Game(config)

