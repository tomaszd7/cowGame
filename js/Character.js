
function Character(type, x, y) {
    // drawing by absolute position !!!

    this.WIDTH = 20;
    this.HEIGHT = 20;
    this.BORDER = 1;

    this.type = type;
    this.posX = x;
    this.posY = y;

    this.box = null;

    this.attrs = {
        height: this.HEIGHT + 'px',
        width: this.WIDTH + 'px',
        position: 'absolute',
        background: '#CCC',
        top: (this.posY  * (this.HEIGHT + this.BORDER * 2) + this.BORDER) + 'px',
        left:(this.posX * (this.WIDTH + this.BORDER * 2) + this.BORDER) + 'px',
        margin: '0' // add 1 px         
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