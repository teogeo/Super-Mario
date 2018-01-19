var Level2 = {
                 preload: function() {
                    this.load.audio('jumpsound','audio/jump.wav');
			         	    this.load.audio('housesound','audio/house.mp3');
				            this.load.audio('coinsound','audio/coin.wav');
				            this.load.audio('stompsound','audio/stomp.wav');
			      	      this.load.audio('deathsound','audio/death.mp3');
                    this.load.tilemap('level', 'assets/map2.json', null,
						Phaser.Tilemap.TILED_JSON);
            
            
                  this.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16,
						16);
				this.load.spritesheet('goomba', 'assets/goomba.png', 16, 16);
				this.load.spritesheet('angry','assets/angrya.png',16,16);
				this.load.spritesheet('mario', 'assets/mario.png', 16, 16);
				this.load.spritesheet('coin', 'assets/coin.png', 16, 16);
				this.load.image('live','assets/marioimage.png');
				//this.load.image('door1', 'assets/door1.png',16,16);
                  },
                  
                  
                  
				  create: function() {
          music = game.add.audio('housesound');
				music.play();
				
				
				Phaser.Canvas.setImageRenderingCrisp(game.canvas)
				game.scale.pageAlignHorizontally = true;
				game.scale.pageAlignVertically = true
				game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
				game.physics.startSystem(Phaser.Physics.ARCADE);
	
				game.stage.backgroundColor = '#5c94fc';
				
							  
				
	
				map = game.add.tilemap('level');
				map.addTilesetImage('tiles', 'tiles');
				map.setCollisionBetween(3, 12, true, 'pipe');
				map.setCollisionBetween(3, 12, true, 'solid');
	
				map.createLayer('background');
				pipe = map.createLayer('pipe');
			    pipe.resizeWorld();
				
				layer = map.createLayer('solid');
				layer.resizeWorld();
	
				coins = game.add.group();
				coins.enableBody = true;
				map.createFromTiles(2, null, 'coin', 'stuff', coins);
				coins.callAll('animations.add', 'animations', 'spin',
						[ 0, 0, 1, 2 ], 3, true);
				coins.callAll('animations.play', 'animations', 'spin');
	
				goombas = game.add.group();
				goombas.enableBody = true;
				map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
				goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],
						2, true);
				goombas.callAll('animations.play', 'animations', 'walk');
				goombas.setAll('body.bounce.x', 1);
				goombas.setAll('body.velocity.x', -20);
				goombas.setAll('body.gravity.y', 500);

	 			door1 = game.add.group();
		        door1.enableBody = true;
		        map.createFromTiles(3, null, 'door1', 'stuff', door1);
 
                 
                 // othe enemy 
                angry= game.add.group();
				angry.enableBody = true;
				map.createFromTiles(1, null, 'angry', 'enemy', angry);
				angry.callAll('animations.add', 'animations', 'walk',[ 0, 1 ] ,2, true);
				angry.callAll('animations.play', 'animations', 'walk');
				angry.setAll('body.bounce.x', 1);
				angry.setAll('body.velocity.x', 70);
				angry.setAll('body.gravity.y', 500);
	
				player = game.add.sprite(16, game.world.height - 48, 'mario');
				game.physics.arcade.enable(player);
				player.body.gravity.y = 370;
				player.body.collideWorldBounds = true;
				player.animations.add('walkRight', [ 1, 2, 3 ], 10, true);
				player.animations.add('walkLeft', [ 8, 9, 10 ], 10, true);
				player.goesRight = true;
				//score
				scoreText = game.add.text(16,16, 'Score: 0', {fontSize: '10px', fill: '#000'}); 
				scoreText.fixedToCamera = true;
				//lives
				mimage=game.add.sprite(140,15,'live');
				mimage.fixedToCamera=true;
				
				counter=game.add.text(158,20,'X'+lives,{font:'30px',fontSize:'10px', fill:'black'});
				counter.fixedToCamera=true;
	
				game.camera.follow(player);
	
				cursors = game.input.keyboard.createCursorKeys();
        },
        
        update: function() {
        	//game.physics.arcade.collide(player,door1, door1collide);
        game.physics.arcade.collide(player,pipe,pipeOverlap);
				game.physics.arcade.collide(player, layer);
				game.physics.arcade.collide(goombas, layer);
				game.physics.arcade.overlap(player, goombas, goombaOverlap);
				game.physics.arcade.overlap(player, coins, coinOverlap);
				game.physics.arcade.collide(angry, layer);
				game.physics.arcade.overlap(player, angry,angryOverlap);
				
				if (player.body.enable) {
					
					player.body.velocity.x = 0;
					if (cursors.left.isDown) {
						
						player.body.velocity.x = -90;
						player.animations.play('walkLeft');
						player.goesRight = false;
					} else if (cursors.right.isDown) {
						
						player.body.velocity.x = 90;
						player.animations.play('walkRight');
						player.goesRight = true;
					} else {
						player.animations.stop();
						
						if (player.goesRight)
							player.frame = 0;
						else
							player.frame = 7;
					}
	
					if (cursors.up.isDown && player.body.onFloor()) {
					       this.jump = this.add.audio('jumpsound');
						this.jump.play();
						
						player.body.velocity.y = -190;
						player.animations.stop();
					}
	
					if (player.body.velocity.y != 0) {
						if (player.goesRight)
							player.frame = 5;
						else
							player.frame = 12;
					}
				}
			}
}
