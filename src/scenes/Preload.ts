import Phaser from 'phaser'

export default class Preload extends Phaser.Scene
{
	constructor()
	{
		super('preloader')
	}

	preload()
	{
		this.load.image('tiles', 'map/ground.png')
		this.load.tilemapTiledJSON('farm', 'map/ground-2.json')
		
        //this.load.atlas('faune', 'character/fauna.png', 'character/fauna.json')
        //this.load.atlas('boy', 'character/boy.png', 'character/boy.json')		
        //this.load.atlas('boy', 'character/boy-death.png','character/boy-death.json')
	}

	create()
	{
		this.scene.start('game')
		
	}

	
}