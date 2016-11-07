/*global game phaser game_state*/

game_state.story= function() {};
 game_state.story.prototype = {


   preload: function() {
    game.load.image('sky', 'assets/storybackground.png');
    game.load.image('continue', 'assets/continue.png');
    game.load.image('next', 'assets/Next.png');
    game.load.image('storyfox','assets/storyfox.png')


   },


   create: function() {

    game.add.sprite(0, 0, 'sky');
    this.words = game.add.sprite(29,41, 'next');
    this.image = game.add.sprite(100, 545, 'continue');


    this.story = game.add.group();
    // var storyText = this.story.add
    this.stories = ['', 'Here is a meadow', 'In this meadow lives a fox', 'He is known as ClockFox', 'His parts get old, so he collects gears', 'He does it fast', 'So that he finishes on time'];
    this.storyIndex = 0;

    this.storyText = game.add.text(0, 0, this.stories[0], {

     fontSize: '32px',
     fill: '#000'

    });
    this.words.visible = true; 
    this.words.anchor.set(0.5);
    this.words.inputEnabled = true;
    this.words.events.onInputDown.add(changeText, this);

    this.image.visible = false;
    this.image.anchor.set(1);
    this.image.inputEnabled = true;
    this.image.events.onInputDown.add(listener, this);

   },

   update: function() {


    this.storyText.text = this.stories[storyIndex];
    // this.storyBg
    if (storyIndex === 6) {
     this.image.visible = true;
    }
if (storyIndex >= 6) {
     this.words.visible = false;
    }


   },


  },
 // game.state.add('story', game_state.main);
game.state.add('story', game_state.story);
game.state.start('story');

var storyIndex = 0;
function changeText(){
 
  storyIndex++;

 
}

function listener () {
 game.state.start('main');
 alert();
}
// function changeBackground(){
//   storyIndex++;
// }