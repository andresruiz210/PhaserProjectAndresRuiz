/*global game phaser game_state*/

game_state.GoodEnd = function() {};
game_state.GoodEnd.prototype = {


        preload: function() {
            game.load.image('sky', 'assets/storybackground.png');
            game.load.image('next', 'assets/Next.png');
            game.load.spritesheet('dancefox', 'assets/clockfox 1 (1).png', 344, 321);
        },

        create: function() {
              game.add.sprite(250, 40, 'sky');
   this.goodwords = game.add.sprite(277, 80, 'next');


   this.goodstory = game.add.group();
   this.goodstories = ['', 'Quite a haul you got there','Looks like you bought ClockFox more time to live','But what does that leave you, think about it ','Anyways good job CLockFox is happy now','He has more time and hes dancing','Thats what you played for right','Thanks for playing'];
   this.goodstoryIndex = 0;

   var goodstoryStyle = {
    fontSize: "32px",
    fill: "#000"
   };
   this.goodstoryText = game.add.text(250, 40, this.goodstories[0], goodstoryStyle);
   // this.storyText.anchor.set(0.5);
   this.goodstoryText.alpha = 0.1;

 var goodStyle = {
    fontSize: "264px",
    fill: "#000"
   };
   this.goodImage = game.add.text(623, 250, "Good End", goodStyle);
   this.goodImage.visible = false;

   game.add.tween(this.goodstoryText).to({alpha: 1}, 4000, "Linear", true);

   this.goodwords.visible = true;
   this.goodwords.anchor.set(0.5);
   this.goodwords.inputEnabled = true;
   this.goodwords.events.onInputDown.add(goodchangeText, this);

   this.gooddancer = game.add.sprite(635, 535, 'dancefox');
   this.gooddancer.animations.add('dance', [0, 1, 5, 6], 10, true);
   this.gooddancer.scale.setTo(0.3, 0.3);
   // this.dancer.body.setSize(172,202,17,12);
   this.gooddancer.visible = false;


  },


  update: function() {


   this.goodstoryText.text = this.goodstories[goodstoryIndex];

   if (goodstoryIndex === 7) {
    this.goodImage.visible = true;
   }
   if (goodstoryIndex >= 7) {
    this.goodwords.visible = false;
   }
   if (goodstoryIndex) {
    this.gooddancer.visible = true;
   }
   else {
    this.gooddancer.visible = false;
   }
   if (this.gooddancer.visible === true) {
    this.gooddancer.animations.play('dance');
   }
   else{
       this.gooddancer.animations.stop();
       this.gooddancer.frame = 0;
   }
   
  },
    },
    game.state.add('GoodEnd', game_state.GoodEnd);
var goodstoryIndex = 0;

function goodchangeText() {

    goodstoryIndex++;


}
