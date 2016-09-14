
function CowBoard() {
    
    this.WIDTH = 10;
    this.HEIGHT = 10;
    this.INNER_BORDER = 1;
    this.SIZE = 20 + 2 * this.INNER_BORDER;
    this.board = [];
    this.charactersOnBoard = [];
    
    this.htmlNode = null;
    
//    this.intervalFunc = null;
    

    
    this.boardAttrs = {
        height: (this.SIZE * this.HEIGHT) + 'px',
        width: (this.SIZE * this.WIDTH) + 'px',
        position: 'relative',
        background: '#EEE',
        border: '1px solid black',
        margin: 'auto' // add 1 px          
    }
    
    this.generateBoard = function() {
        for (var y = 0; y < this.HEIGHT; y++) {
            var row = [];
            for (var x = 0; x < this.WIDTH; x++) {
                row[x] = null;
            }
            this.board.push(row);
        }        
    }
    
    this.initiateCharaters = function() {
        for (var i = 0; i < 80; i++) {
            var char1 = new Character('cow', 5, 5)
            this.charactersOnBoard.push(char1);
            
        }

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
        
    }
    
    this.createStyleAttr = function (attrs) {
        var result = '';
        for (var key in attrs) {
            result += key + ':' + attrs[key] + ';';
        }
        return result;
    }    
    
    this.runGameLoop = function () {
        console.log('loop');
        console.log(this.charactersOnBoard);
        for (var i = 0; i < this.charactersOnBoard; i++) {
            this.charactersOnBoard[i].doAction();
        }
    }
    
    this.stopGameLoopListner = function() {
        // adding listener to htmlNode - board 
        this.htmlNode.addEventListener('click', function(event) {
            console.log('ask stop');
//            console.log(event);
            clearInterval(event.target.intervalFunc);
        })
    }
    
    this.main = function() {
        this.generateBoard();
        this.initiateCharaters();
        this.createHtmlNode();
        this.displayBoard();
//        this.htmlNode.intervalFunc = setInterval(this.runGameLoop, 500);
//        this.stopGameLoopListner();
    }
    
    this.main();
    
}