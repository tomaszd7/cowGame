
function Character(type, x, y) {
    // drawing by absolute position !!!

    this.WIDTH = 20;
    this.HEIGHT = 20;
    this.BORDER = 1;
    
    this.SIZE = this.WIDTH + 2 * this.BORDER;

    this.type = type;
    this.state = null;
    this.posX = x;
    this.posY = y;

    this.box = null;
    
    this.moveLeft = {
        'left': -this.SIZE,
        'top': 0
    }

    
    this.moves = [-1, 0, 1];
    
    this.getRandomVal = function () {
//        console.log(this.getRandomVal());
        return this.moves[Math.floor(Math.random()* this.moves.length)];
    }
    
    this.randomMoves = function () {
        return {
          'left': this.getRandomVal() * this.SIZE,  
          'top': this.getRandomVal() * this.SIZE  
        };
    }

    this.currentAction = this.randomMoves();
    
    this.attrs = {
        height: this.HEIGHT + 'px',
        width: this.WIDTH + 'px',
        position: 'absolute',
        background: '#4695e8',        
        top: (this.posY  * (this.HEIGHT + this.BORDER * 2) + this.BORDER) + 'px',
        left:(this.posX * (this.WIDTH + this.BORDER * 2) + this.BORDER) + 'px',
        margin: '0' // add 1 px         
    }

    this.doAction = function() {
//        console.log('action');
//        console.log(this, parseInt(this.attrs['left']), parseInt(this.attrs['top']));
        this.currentAction = this.randomMoves();
//        console.log(this.currentAction);
        var newLeft = parseInt(this.attrs['left']) + this.currentAction['left'];
        var newTop = parseInt(this.attrs['top']) + this.currentAction['top'];
        
        if ( newLeft > 0 && newLeft < this.SIZE * 10 && newTop > 0 && newTop < this.SIZE * 10) {
            this.attrs['left'] = newLeft + 'px';
            this.attrs['top'] = newTop + 'px';
            $(this.box).stop().animate({left: this.attrs['left'], top: this.attrs['top']}, 250, 'linear')            
        }
        
    }

    this.createStyleAttr = function (attrs) {
        var result = '';
        for (var key in attrs) {
            result += key + ':' + attrs[key] + ';';
        }
        return result;
    }

    this.createBox = function () {
        this.box = document.createElement('div');
        // add border radius
        this.attrs['border-radius'] = '15px';
        this.box.setAttribute('style', this.createStyleAttr(this.attrs));
    }

    this.getBox = function () {
        return this.box;
    }

    this.main = function () {
        this.createBox();
    }

    this.main();


}