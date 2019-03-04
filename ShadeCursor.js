function ShadeCursor(context) {
  this.x = 0;
  this.y = 0;
  this.height = 2;
  this.width;
  this.size = 8;
  this.color = "black";
  this.mouseDown = false;

  this.draw = function() {
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x - this.size, this.y + this.size);
    context.lineTo(this.x - this.size, this.y - this.size);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }

  this.move = function(x, y) {
    this.x = x;
    this.y = y;
  }

  this.exceedsRect = function(x, y, height) {
    if (y < height && y >= 0 && x > this.x - 16) {
      return false;
    }
    return true;
  }
}
