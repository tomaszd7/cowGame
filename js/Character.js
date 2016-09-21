
function Character(type, x, y) {
    // drawing by absolute position !!!

    this.BOARD = 10;

    this.WIDTH = 60;
    this.HEIGHT = 60;
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
    
    
    this.prepareMoves = function (x, y) {
        return {
          'left': x * this.SIZE,  
          'top': y * this.SIZE  
        };
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
//        background: '#4695e8',        
        top: (this.posY  * (this.HEIGHT + this.BORDER * 2) + this.BORDER) + 'px',
        left:(this.posX * (this.WIDTH + this.BORDER * 2) + this.BORDER) + 'px',
        margin: '0' // add 1 px         
    }

    this.isFieldEmpty = function(board, x, y) {
        if (x >=0 && y >= 0 & x < this.BOARD & y < this.BOARD) {
            if (board[y][x]['unit'] === null) {
                return true;
            }            
        }
        return false;
    }
    
    this.getRandoms = function() {
        return {
            x: this.getRandomVal(),
            y: this.getRandomVal()
        }
    }
    
    this.doAction = function(board) {
        console.log('action');
        var randoms = this.getRandoms();
        // get radom position 
        var newX = this.posX + randoms['x'];
        var newY = this.posY + randoms['y'];

        // check if no cow on that place 
        
        if (this.isFieldEmpty(board, newX, newY)) {
            
            this.currentAction = this.prepareMoves(randoms['x'], randoms['y']);
    //        console.log(this.currentAction);
            var newLeft = parseInt(this.attrs['left']) + this.currentAction['left'];
            var newTop = parseInt(this.attrs['top']) + this.currentAction['top'];

            if ( newLeft > 0 && newLeft < this.SIZE * this.BOARD && newTop > 0 && newTop < this.SIZE * this.BOARD) {
                this.attrs['left'] = newLeft + 'px';
                this.attrs['top'] = newTop + 'px';
                // add on board
                board[this.posY][this.posX]['unit'] = null;
                board[newY][newX]['unit'] = 'cow';
                this.posX = newX;
                this.posY = newY;   
//                console.log(board);
                
                $(this.box).stop().animate({left: this.attrs['left'], top: this.attrs['top']}, 1000, 'linear')            
            }
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
//        this.attrs['border-radius'] = '15px';
        this.box.setAttribute('style', this.createStyleAttr(this.attrs));
        $(this.box).append('<img src="cow.png" style="width:'+this.WIDTH+'px;height:'+this.HEIGHT+'px" />');
    }

    this.getBox = function () {
        return this.box;
    }

    this.main = function () {
        this.createBox();
    }

    this.main();


}