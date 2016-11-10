/*global game phaser game_state*/

game_state.BadEnd = function() {};
game_state.BadEnd.prototype = {


        preload: function() {
            game.load.image('sky', 'assets/BadEndSky.png');
            game.load.image('next', 'assets/SadWords.png');
            game.load.spritesheet('Brokenfox', 'assets/BrokenFox.png', 344, 321);
        },

        create: function() {
              game.add.sprite(250, 40, 'sky');
   this.badwords = game.add.sprite(281, 80, 'next');


   this.badstory = game.add.group();
   this.badstories = ['', 'Ending on a sad note I see', 'Not enough gears to fix old ClockFox', 'Doesnt matter though', 'Hes only mortal', 'Time woudldve caught up to him eventually', 'You just made the proccess much faster', 'Oh, looks like hes gone', 'Poor little guy', 'Im sure he made the most out of his life', 'You still here, thought you woulve left by now', 'Must not realize the time you have', 'Oh well thats your problem ', 'Thank for playing'];
   this.badstoryIndex = 0;

   var badstoryStyle = {
    fontSize: "32px",
    fill: "#ffffff"
   };
   this.badstoryText = game.add.text(250, 40, this.badstories[0], badstoryStyle);
   // this.storyText.anchor.set(0.5);
   this.badstoryText.alpha = 0.1;

 var badStyle = {
    fontSize: "264px",
    fill: "#ffffff"
   };
   this.badImage = game.add.text(330, 250, "Bad End", badStyle);
   this.badImage.visible = false;

   game.add.tween(this.badstoryText).to({alpha: 1}, 4000, "Linear", true);

   this.badwords.visible = true;
   this.badwords.anchor.set(0.5);
   this.badwords.inputEnabled = true;
   this.badwords.events.onInputDown.add(badchangeText, this);

   this.baddancer = game.add.sprite(320, 552, 'Brokenfox');
   this.baddancer.animations.add('dance', [0, 1], 10, true);
   this.baddancer.scale.setTo(0.3, 0.3);
   // this.dancer.body.setSize(172,202,17,12);
   this.baddancer.visible = false;


  },


  update: function() {


   this.badstoryText.text = this.badstories[badstoryIndex];

   if (badstoryIndex === 13) {
    this.badImage.visible = true;
   }
   if (badstoryIndex >= 13) {
    this.badwords.visible = false;
   }
   if (badstoryIndex) {
    this.baddancer.visible = true;
   }
   else {
    this.baddancer.visible = false;
   }
   if (this.baddancer.visible === true && this.badstoryIndex <=7) {
    this.baddancer.animations.play('dance');
   }
   else{
       this.baddancer.animations.stop();
       this.baddancer.frame = 0;
   }
   
  },
    },
    game.state.add('BadEnd', game_state.BadEnd);
var badstoryIndex = 0;

function badchangeText() {

    badstoryIndex++;


}
