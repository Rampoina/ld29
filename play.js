var deep = 0;
function Worm(size, game) {
    this.size = size;
    this.game = game;
    this.vel = 4.0;
}
Worm.prototype.spawn = function(width) {
    this.r = 200;
    this.rotation = Math.random()*6;
    this.worms = game.add.group();
    this.worms.enableBody = true;
    this.worms.physicsBodyType = Phaser.Physics.ARCADE;
    this.worms.createMultiple(this.size,'worm');
    for (var i = 0; i < this.size; i++) {
        var worm = this.worms.getFirstDead();

        var x = w/2+(width/2+this.r-4*i)*Math.cos(this.rotation-Math.PI/2);
        var y = h/2+(width/2+this.r-4*i)*Math.sin(this.rotation-Math.PI/2);
        worm.scale.setTo(5,5);
        worm.anchor.setTo(0.5,1);
        worm.reset(x,y);
        worm.rotation = this.rotation;
        worm.r = this.r-4*i;
        worm.underground = false;

    }
}
Worm.prototype.move = function(width) {

    var t = ((Math.PI*2)*this.vel);
    this.worms.forEachAlive(function(worm) {
        if (worm.r < -16) {
            worm.r -= 0.1;
            var rot = (t/(Math.PI*(width+worm.r)))+(0.00002*(worm.r*worm.r));
            worm.rotation += rot;
        }
        else {
            worm.r -= this.vel;
        }

    var x = w/2+(width/2+worm.r)*Math.cos(worm.rotation-Math.PI/2);
    var y = h/2+(width/2+worm.r)*Math.sin(worm.rotation-Math.PI/2);

    worm.reset(x,y);
    },this);

}


Worm.prototype.kill = function() {
    if (this.worms.countDead() > 0) {
        this.worms.callAll('kill');
    }
}
var play_state = {

    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);


        this.game.stage.smoothed = false;
        this.cursor = this.game.input.keyboard.createCursorKeys();
        var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        space_key.onDown.add(this.shoot, this);


        this.space = this.game.add.sprite(w/2,h/2,'space');
        this.space.scale.setTo(5,5);
        this.space.anchor.setTo(0.5,0.5);
        this.atmosphere = this.game.add.sprite(w/2,h/2,'atmosphere');
        this.atmosphere.scale.setTo(5,5);
        this.atmosphere.anchor.setTo(0.5,0.5);
        this.clouds = this.game.add.sprite(w/2,h/2,'clouds');
        this.clouds.scale.setTo(5,5);
        this.clouds.anchor.setTo(0.5,0.5);
        this.clouds2 = this.game.add.sprite(w/2,h/2,'clouds2');
        this.clouds2.scale.setTo(5,5);
        this.clouds2.anchor.setTo(0.5,0.5);
        this.apple = this.game.add.sprite(w/2, h/2, 'apple');
        this.apple.scale.setTo(5,5);
        this.core = this.game.add.sprite(w/2-30,h/2-30, 'core');
        this.core.scale.setTo(5,5);
        this.core.enableBody = true;
        this.core.physicsBodyType = Phaser.Physics.ARCADE;

        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(30,'hero');


        this.apple.anchor.setTo(0.5, 0.5);
        this.hero = this.game.add.sprite(w/2,h/2, 'hero');
        this.hero.scale.setTo(5,5);
        this.hero.anchor.setTo(0.5,1);
        this.leaf = this.game.add.sprite(w/2,h/2-140, 'leaf');
        this.leaf.scale.setTo(5,5);
        this.worm = new Worm(20,this.game);

        this.rotation = this.game.add.text(200,20,'',{font:'16px Arial',fill: '#ffffff' });
        this.game.time.advancedTiming = true;
        this.fpsText = this.game.add.text(20,20,'',{font:'16px Arial',fill: '#ffffff' });
        this.worm.spawn(this.apple.width);

        this.peach = this.game.add.sprite(w/2, h/2, 'peach');
        this.peach.scale.setTo(5,5);
        this.peach.anchor.setTo(0.5,0.5);
        this.firing = false;
        tween = game.add.tween(this.peach).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    },

    shoot: function() {
        if (!this.firing) {
            this.bullet = this.bullets.getFirstDead();
            this.firing = true;
            this.bullet.rotation = this.hero.rotation;
            var destx = w/2;
            var desty = h/2;
            this.bullet.scale.setTo(5,5);
            this.bullet.reset(this.hero.x,this.hero.y);
            var tween = game.add.tween(this.bullet).to({x: destx, y: desty},400);
            tween.onComplete.add(this.kill, this);

            tween.start();
        }


    },
    kill: function() {
        this.bullet.kill();
        //this.worm.kill();
        this.firing = false;
    },

    killworm: function(bullet, worm) {
        console.log("Dead");
        bullet.kill();
        worm.kill();
    },

    update: function() {

        this.space.angle += 0.01;
        this.clouds.angle -= 0.05;
        this.clouds2.angle -= 0.10;

        if (this.cursor.right.isDown) {

            this.hero.angle += 1.2;
        }
        else if (this.cursor.left.isDown) {
            this.hero.angle -= 1.2;
        }

        if (this.game.time.fps !== 0) {
            this.fpsText.setText(this.game.time.fps + ' FPS');
        }

        var x = w/2+(this.apple.width/2)*Math.cos(this.hero.rotation-Math.PI/2);
        var y = h/2+(this.apple.width/2)*Math.sin(this.hero.rotation-Math.PI/2);
        this.hero.reset(x, y);
        this.worm.kill();
        this.worm.move(this.apple.width);
        this.rotation.setText((this.hero.rotation-Math.PI/2));
        this.game.physics.arcade.overlap(this.bullets,this.worm.worms,this.killworm,null,this);
    }

};
