function Cursor(context) {
  this.x = 0;
  this.y = 0;
  this.size;
  this.color = "black";
  this.type;
  this.mouseDown = false;

  this.init = function(type, size) {
    this.type = type;
    this.size = size;
  }

  this.draw = function() {
    if (this.type == "circ") {
      context.beginPath();
      context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      context.strokeStyle = this.color;
      context.stroke();
    }
    else if (this.type == "tri") {
      context.beginPath();
      context.moveTo(this.x, this.y);
      context.lineTo(this.x - this.size, this.y + this.size);
      context.lineTo(this.x - this.size, this.y - this.size);
      context.fillStyle = this.color;
      context.fill();
      context.closePath();
    }
  }

  this.move = function(x, y) {
    this.x = x;
    this.y = y;
  }

  this.exceedsCircle = function(cx, cy, x, y, radius) {
    var dx = (x) - cx;
    var dy = (y) - cy;
    return dx*dx + dy*dy >= radius * radius // Use pythagoras equation to find distance
  }

  this.exceedsRect = function(x, y, height) {
    if (y < height && y >= 0 && x > this.x - 16) {
      return false;
    }
    return true;
  }
}
