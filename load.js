var w = 500;
var h = 500;

var load_state = {
    preload: function() {
        this.game.load.image('apple', 'assets/apple.png');
        this.game.load.image('peach', 'assets/peach.png');
        this.game.load.image('hero', 'assets/hero.png');
        this.game.load.image('worm', 'assets/worm.png');
        this.game.load.image('core', 'assets/core.png');
        this.game.load.image('leaf', 'assets/leaf.png');
        this.game.load.image('space', 'assets/space.png');
        this.game.load.image('clouds', 'assets/clouds.png');
        this.game.load.image('clouds2', 'assets/clouds2.png');
        this.game.load.image('atmosphere', 'assets/atmosphere.png');
        


    },

    create: function() {
        this.game.state.start('menu');
    }
};
