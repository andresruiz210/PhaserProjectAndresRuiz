/*global Phaser*/


var game = new Phaser.Game(800, 600, Phaser.AUTO, '');
var game_state = {};


game_state.main = function() {};
game_state.main.prototype = {


    preload: function() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('cog', 'assets/cog.png');
        game.load.spritesheet('fox', 'assets/clockfox 1 (1).png', 344,321);

    },


    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        game.add.sprite(0, 0, 'cog');
        game.add.sprite(0, 0, 'sky');
        
        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, game.world.height - 55, 'ground');
        // ground.scale.setTo(20, 20);
        ground.body.immovable = true;
        // this.ground.body.setSize(172,172,17,20);
        ground.body.setSize(338, 30, 0, 25);

        var ledge = this.platforms.create(306, 545, 'ground');
        ledge.body.immovable = true;
        ledge.body.setSize(338, 30, 0, 25);
        
        
        
        
        ledge = this.platforms.create(612, 545, 'ground');
        ledge.body.immovable = true;
        ledge.body.setSize(338, 30, 0, 25);
        
        
        ledge = this.platforms.create(0, 250, 'ground');
        ledge.body.immovable = true;
        ledge.body.setSize(338, 30, 0, 25);
        
        this.player = game.add.sprite(32, game.world.height - 150, 'fox');
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = .2;
        this.player.body.gravity.y = 700;
        this.player.body.collideWorldBounds = true;
        this.player.scale.setTo(0.2,0.2);
        
       
        this.player.animations.add('left' ,[5,6],10, true);
        this.player.animations.add('right' ,[0,1],10, true);
       
        this.cursors = game.input.keyboard.createCursorKeys();
        this.player.body.velocity.x = 0;
        this.stars = game.add.group();
        this.stars.enableBody = true;
        for (var i = 0; i < 12; i++) {
            var star = this.stars.create(i * 70, 0, 'cog');
            star.body.gravity.y = 300;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
        this.scoreText = game.add.text(16,16,'score: 0',{
            fontSize: '32px',
            fill: '#000'
        });
this.score=0;
        this.player.body.setSize(172,202,17,12);
    },

    update: function() {
        game.physics.arcade.collide(this.player, this.platforms);
        
        // DEBUGGING
        // game.debug.body(this.ledge);
        game.debug.body(this.player);
        
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -150;
            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 150;
            this.player.animations.play('right');
        }
        else {
         
            this.player.animations.stop();
            this.player.frame = 4;
            this.player.body.velocity.x = 0;
            //this.player.velocity.y = 0
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -350;
        }
        game.physics.arcade.collide(this.stars, this.platforms);
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);
         
    },
    collectStar: function(player,star){
    star.kill();
    
            star = this.stars.create(Math.random() * 800, 0, 'cog');
            star.body.gravity.y = 300;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        
    this.score += 5;
    this.scoreText.text = ('score:' + this.score);
    },

};
game.state.add('main', game_state.main);
