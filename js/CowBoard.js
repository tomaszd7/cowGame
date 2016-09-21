
function CowBoard() {
    
    this.WIDTH = 10;
    this.HEIGHT = 10;
    this.INNER_BORDER = 1;
    this.SIZE = 60 + 2 * this.INNER_BORDER;
    this.board = [];
    this.charactersOnBoard = [];
    this.user = {};
    
    this.htmlNode = null;
    
//    this.intervalFunc = null;
    

    
    this.boardAttrs = {
        height: (this.SIZE * this.HEIGHT) + 'px',
        width: (this.SIZE * this.WIDTH) + 'px',
        position: 'relative',
        background: '#21c014',
        border: '1px solid black',
        margin: 'auto' // add 1 px          
    }
    
//    this.boardCell = {
//        'surface': null,
//        'unit': null
//    }
    
    this.generateBoard = function() {
        for (var y = 0; y < this.HEIGHT; y++) {
            var row = [];
            for (var x = 0; x < this.WIDTH; x++) {
//                row[x] = this.boardCell; // tak w klasie uzywam zawsze tego samego pola !!!
                   row[x] = {
                        'surface': null,
                        'unit': null
                    }
            }
            this.board.push(row);
        }        
    }
    
    this.initiateCharaters = function() {
        for (var i = 0; i < 1; i++) {
            var char1 = new Character('cow', 5, 5)
            this.charactersOnBoard.push(char1);            
            this.addCowToBoard(char1.posX, char1.posY);            
            var char1 = new Character('cow', 8, 1)
            this.charactersOnBoard.push(char1);            
            this.addCowToBoard(char1.posX, char1.posY);            
            var char1 = new Character('cow', 2, 5)
            this.charactersOnBoard.push(char1);            
            this.addCowToBoard(char1.posX, char1.posY);            
            var char1 = new Character('cow', 2, 2)
            this.charactersOnBoard.push(char1);            
            this.addCowToBoard(char1.posX, char1.posY);            
            var char1 = new Character('cow', 7, 5)
            this.charactersOnBoard.push(char1);            
            this.addCowToBoard(char1.posX, char1.posY);            
            var char2 = new Character('cow', 3, 3)
            this.charactersOnBoard.push(char2);            
            this.addCowToBoard(char2.posX, char2.posY);            
        }
        
        // create user !!!
        
        this.user = new Character('user', 1, 1);
        
        // change object 
        this.user.createBox = function () {
            this.box = document.createElement('div');
            this.box.setAttribute('style', this.createStyleAttr(this.attrs));
            $(this.box).append('<img src="user.png" style="width:'+this.WIDTH+'px;height:'+this.HEIGHT+'px" />');
        }        
        
        this.user.doAction = function(board, move) {
            console.log('user action');
//            console.log(board);
            var newX = this.posX + move['x'];
            var newY = this.posY + move['y'];

            // check if no cow on that place 

            if (this.isFieldEmpty(board, newX, newY)) {

                this.currentAction = this.prepareMoves(move['x'], move['y']);
        //        console.log(this.currentAction);
                var newLeft = parseInt(this.attrs['left']) + this.currentAction['left'];
                var newTop = parseInt(this.attrs['top']) + this.currentAction['top'];

                if ( newLeft > 0 && newLeft < this.SIZE * 10 && newTop > 0 && newTop < this.SIZE * 10) {
                    this.attrs['left'] = newLeft + 'px';
                    this.attrs['top'] = newTop + 'px';
                    // add on board
                    board[this.posY][this.posX]['unit'] = null;
                    board[newY][newX]['unit'] = 'cow';
                    this.posX = newX;
                    this.posY = newY;   
    //                console.log(board);

                    $(this.box).stop().animate({left: this.attrs['left'], top: this.attrs['top']}, 500, 'linear')            
                }
            }                        
        }        
        
        this.user.createBox();        
        this.addUserToBoard(this.user.posX, this.user.posY);  
        
    }
    
    this.addCowToBoard = function(posX, posY) {
//        this.boardCell['unit'] = 'cow'; // to jest referencja !!!!
        this.board[posY][posX] = {surface: null,
                                unit: 'cow'};
    }

    this.addUserToBoard = function(posX, posY) {
        this.board[posY][posX] = {surface: null,
                                unit: 'user'};
        console.log('user added');
    }
    
    this.createHtmlNode = function() {
        var body = document.getElementsByTagName('body');
        this.htmlNode = document.createElement('div');
        this.htmlNode.setAttribute('style', this.createStyleAttr(this.boardAttrs));
        this.htmlNode.intervalFunc = null;
        body[0].appendChild(this.htmlNode);        
    }
    
    this.displayBoard = function() {
        for (var i = 0; i < this.charactersOnBoard.length; i++) {            
            var char = this.charactersOnBoard[i].getBox();
            this.htmlNode.appendChild(char);
        }        
        
        // display user 
        this.htmlNode.appendChild(this.user.getBox());
        
    }
    
    this.createStyleAttr = function (attrs) {
        var result = '';
        for (var key in attrs) {
            result += key + ':' + attrs[key] + ';';
        }
        return result;
    }    
    
    this.runGameLoop = function () {
        // bo to zadziala z punktu przegladarki dopiero a nie klasy teraz tu !!!!
        // bo ten kod sie wykonuje w przegladarce a nie na serwerze 
        console.log('loop');
//        console.log(this);
        for (var i = 0; i < this.charactersOnBoard.length; i++) {
//            console.log(this.charactersOnBoard[i]);
            this.charactersOnBoard[i].doAction(this.board);
        }
//        console.log(this.charactersOnBoard);
//        console.log(this.board);
    }
    
//    this.stopGameLoopListner = function() {
//        // adding listener to htmlNode - board 
//        this.htmlNode.addEventListener('click', function(event) {
//            console.log('ask stop');
//            console.log(event.target);
//            clearInterval(event.target.intervalFunc);
//        })
//    }
    
    this.main = function() {
        this.generateBoard();
        console.log(this.board);
        this.initiateCharaters();
        console.log(this.board);
        this.createHtmlNode();
        this.displayBoard();
//        this.htmlNode.intervalFunc = setInterval(this.runGameLoop, 500);
//        this.stopGameLoopListner();
    }
    
    this.main();
    
}