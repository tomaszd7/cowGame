
function CowBoard() {
    
    this.WIDTH = 10;
    this.HEIGHT = 10;
    this.SIZE = 22;
    this.board = [];
    this.charactersOnBoard = [];
    
    this.htmlNode = null;
    
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
        var char1 = new Character('cow', 3, 2)
        this.charactersOnBoard.push(char1);
        
    }
    
    this.createHtmlNode = function() {
        var body = document.getElementsByTagName('body');
        this.htmlNode = document.createElement('div');
        this.htmlNode.setAttribute('style', this.createStyleAttr(this.boardAttrs));
        body[0].appendChild(this.htmlNode);        
    }
    
    this.displayBoard = function() {
        console.log(this.htmlNode);
        for (var i = 0; i < this.charactersOnBoard.length; i++) {            
            var char = this.charactersOnBoard[i].getBox();
            console.log(this.charactersOnBoard[i]);
            this.htmlNode.appendChild(char);
            console.log(this.htmlNode);
        }        
        
    }
    
    this.createStyleAttr = function (attrs) {
        var result = '';
        for (var key in attrs) {
            result += key + ':' + attrs[key] + ';';
        }
        return result;
    }    
    
    this.main = function() {
        this.generateBoard();
        this.initiateCharaters();
        this.createHtmlNode();
        this.displayBoard();
    }
    
    this.main();
    
}