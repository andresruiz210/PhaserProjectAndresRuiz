/*global game Phaser game_state*/


game_state.story = function() {};
game_state.story.prototype = {


        preload: function() {
            game.load.image('sky', 'assets/storybackground.png');
            game.load.image('continue', 'assets/continue.png');
            game.load.image('next', 'assets/Next.png');
            game.load.image('storyfox', 'assets/storyfox.png');
            game.load.spritesheet('fox', 'assets/clockfox 1 (1).png', 344, 321);
            game.load.spritesheet('hourglass', 'assets/Hourglass.png', 132, 132);
            game.load.image('black', 'assets/Black.png');
        },


        create: function() {
            game.add.sprite(250, 40, 'sky');
            this.second = game.add.sprite(250, 40, 'storyfox');
            this.words = game.add.sprite(277, 80, 'next');
            this.image = game.add.sprite(353, 150, 'continue');
            

            this.story = game.add.group();
            this.stories = ['', 'Here is a meadow', 'In this meadow lives a fox', 'He is known as ClockFox', 'His parts get old, so he collects gears', 'He does it fast so that he finishes on time', 'He knows to jump and how to move left or right.', 'Sometimes hourglasses show up and give him more time', 'They are rare though', 'Help him through his day and he will be very grateful', 'He might even do a little dance'];
            this.storyIndex = 0;

            var storyStyle = {
                fontSize: "32px",
                fill: "#000"
            };
            this.storyText = game.add.text(250, 40, this.stories[0], storyStyle);
            // this.storyText.anchor.set(0.5);
            this.storyText.alpha = 0.1;

            game.add.tween(this.storyText).to({alpha: 1}, 4000, "Linear", true);

            this.words.visible = true;
            this.words.anchor.set(0.5);
            this.words.inputEnabled = true;
            this.words.events.onInputDown.add(changeText, this);

            this.image.visible = false;
            this.image.anchor.set(1);
            this.image.inputEnabled = true;
            this.image.events.onInputDown.add(listener, this);

            this.object = game.add.sprite(532, 300, 'hourglass');
            this.object.animations.add('turn', [1, 2, 3, 4], 10, true);
            this.object.visible = false;

            this.dancer = game.add.sprite(320, 535, 'fox');
            this.dancer.animations.add('dance', [0, 1, 5, 6], 10, true);
            this.dancer.scale.setTo(0.3, 0.3);
            // this.dancer.body.setSize(172,202,17,12);
            this.dancer.visible = false;
            
            this.fade = game.add.sprite(250, 40, 'black');
            this.fade.alpha = 0;
            this.fadeIn = game.add.tween(this.fade);
            this.fadeIn.to({alpha:1},500, Phaser.Easing.Linear.None,false,0,0,true);
            // this.fadeIn

        },


        update: function() {


            this.storyText.text = this.stories[storyIndex];

            if (storyIndex === 10) {
                this.image.visible = true;
            }
            if (storyIndex >= 10) {
                this.words.visible = false;
            }
            if (storyIndex >= 2 && storyIndex <= 9) {
                this.second.visible = true;
            }
            else {
                this.second.visible = false;
            }
            if (storyIndex === 7 || storyIndex === 8) {
                this.object.visible = true;
            }
            else {
                this.object.visible = false;

            }
            if (this.object.visible === true) {
                this.object.animations.play('turn');
            }
            if (storyIndex === 10) {
                this.dancer.visible = true;
            }
            else {
                this.dancer.visible = false;
            }
            if (this.dancer.visible === true) {
                this.dancer.animations.play('dance');
            }
        },


    },

    game.state.add('story', game_state.story);
game.state.start('story');
// game.state.start('main');
var storyIndex = 0;

function changeText() {

    storyIndex++;


}

function listener() {
    this.fadeIn.start();
    this.fadeIn = true;
if (this.fadeIn === true){
    change();
}

}
function change() {
    game.state.start('main');

}
