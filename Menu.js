var Menu = {
preload: function() {
    game.load.image('Menu', 'assets/menu.png');
		game.load.image('Level1', 'assets/level1.png');
		game.load.audio('house', 'audio/house.mp3');
		},
    
    create: function() {
		
			house = game.add.audio('house');
			house.play();

			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true;
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.physics.startSystem(Phaser.Physics.ARCADE);
			
			var menuPic = game.add.sprite(8, 8, 'Menu');

			
			var click1 = game.add.button(60, 197, 'Level1', function() {
			game.state.start('Level1');
			house.stop();
		});
		click1.anchor.set(0.5, 0.5);
	}
}
