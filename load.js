var w = 400;
var h = 400;

var load_state = {
    preload: function() {
        this.game.stage.backgroundColor = '#71c5cf';
        this.game.load.image('apple', 'assets/apple.png');

    },

    create: function() {
        this.game.state.start('menu');
    }
};
