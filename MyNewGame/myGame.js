/*global Phaser*/


var game = new Phaser.Game(1366, 675, Phaser.AUTO, '');
var game_state = {};


game_state.main = function() {};
game_state.main.prototype = {


    preload: function() {
        game.load.image('sky', 'assets/sky.png');
        game.load.image('ground', 'assets/platform.png');
        game.load.image('cog', 'assets/cog.png');
        game.load.spritesheet('fox', 'assets/clockfox 1 (1).png', 344, 321);
        // game.load.spritesheet('hourglass', 'Hourglass.png',132,132);
    },


    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.add.sprite(0, 0, 'cog');
        game.add.sprite(0, 0, 'sky');

        this.platforms = game.add.group();
        this.platforms.enableBody = true;
        var ground = this.platforms.create(0, game.world.height - 55, 'ground');
        ground.body.immovable = true;
        ground.body.setSize(338, 30, 0, 25);

        var ledge = this.platforms.create(306, 620, 'ground');
        ledge.body.immovable = true;
        ledge.body.setSize(338, 30, 0, 25);

        ledge = this.platforms.create(636, 475, 'ground');
        ledge.body.immovable = true;
        ledge.body.setSize(338, 30, 0, 25);


        ledge = this.platforms.create(612, 620, 'ground');
        ledge.body.immovable = true;
        ledge.body.setSize(338, 30, 0, 25);

        ledge = this.platforms.create(836, 620, 'ground');
        ledge.body.immovable = true;
        ledge.body.setSize(338, 30, 0, 25);
        
        ledge = this.platforms.create(1060, 545, 'ground');
        ledge.body.immovable = true;
        ledge.body.setSize(338, 30, 0, 25);
        
        ledge = this.platforms.create(461, 445, 'ground');
        ledge.body.immovable = true;
        ledge.body.setSize(338, 30, 0, 25);
        
        ledge = this.platforms.create(1060, 620, 'ground');
        ledge.body.immovable = true;
        ledge.body.setSize(338, 30, 0, 25);
        
        ledge = this.platforms.create(1060, 290, 'ground');
        ledge.body.immovable = true;
        ledge.body.setSize(338, 30, 0, 25);
        
        ledge = this.platforms.create(545, 290, 'ground');
        ledge.body.immovable = true;
        ledge.body.setSize(338, 30, 0, 25);

        ledge = this.platforms.create(0, 250, 'ground');
        ledge.body.immovable = true;
        ledge.body.setSize(338, 30, 0, 25);

        ledge = this.platforms.create(289, 415, 'ground');
        ledge.body.immovable = true;
        ledge.body.setSize(338, 30, 0, 25);

        this.player = game.add.sprite(32, game.world.height - 107, 'fox');
        game.physics.arcade.enable(this.player);
        this.player.body.bounce.y = .2;
        this.player.body.gravity.y = 800;
        this.player.body.collideWorldBounds = true;
        this.player.scale.setTo(0.25, 0.25);
        
        // this.timeAdd = game.add.sprite(506, 336, 'hourglass');
        // // game.physics.arcade.enable(this.timeAdd);
        // // this.player.body.bounce.y = .2;
        // // this.player.body.gravity.y = 800;
        // // this.player.body.collideWorldBounds = true;
        // // this.player.scale.setTo(0.25, 0.25);
        // this.timeAdd.animation.add('turn'[0, 1, 2, 3], 10, true);


        this.player.animations.add('left', [5, 6], 10, true);
        this.player.animations.add('right', [0, 1], 10, true);

        this.cursors = game.input.keyboard.createCursorKeys();
        this.player.body.velocity.x = 0;
        this.stars = game.add.group();
        this.stars.enableBody = true;
        for (var i = 0; i < 12; i++) {
            var star = this.stars.create(i * 167.5, 0, 'cog');
            star.body.gravity.y = 300;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
        }
        this.scoreText = game.add.text(16, 16, 'score: 0', {
            fontSize: '32px',
            fill: '#000'
        });
        this.score = 0;
        this.player.body.setSize(190, 202, 20, 12);

        game.time.events.add(Phaser.Timer.SECOND * 50, listen, this);


    },

    update: function() {
        game.physics.arcade.collide(this.player, this.platforms);
        // game.debug.body(this.player);
        game.debug.text("Day End: " + Math.floor(game.time.events.duration / 1000), 0, 12, {
            fontSize: '32px',
            fill: '#000'
        });
        if (this.score >= 250) {
            Ending();
        }

        if (this.cursors.left.isDown) {
            this.player.body.velocity.x = -200;
            this.player.animations.play('left');
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x = 200;
            this.player.animations.play('right');
        }
        else {

            this.player.animations.stop();
            this.player.frame = 4;
            this.player.body.velocity.x = 0;
            //this.player.velocity.y = 0
        }
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -450;
        }

        game.physics.arcade.collide(this.stars, this.platforms);
        game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);

    },
    collectStar: function(player, star) {
        star.kill();

        star = this.stars.create(Math.random() * 1366, 0, 'cog');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;

        this.score += 5;
        this.scoreText.text = ('score:' + this.score);
    },

};
// game.state.start('story'); 
// game.state.start('main');
game.state.add('main', game_state.main);

function listen() {
    if (game.time.events.duration / 1000 <= 0) {

        game.state.start('BadEnd');
    }

}

function Ending() {

    game.state.start('GoodEnd');


}
