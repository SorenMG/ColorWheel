function Cursor(context) {
  this.x = 0;
  this.y = 0;
  this.radius = 3;
  this.color = "black";
  this.mouseDown = false;

  this.draw = function() {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
    context.strokeStyle = this.color;
    context.stroke();
  }

  this.move = function(x, y) {
    this.x = x;
    this.y = y;
    // this.draw();
  }

  this.contains = function(x, y) {
    if (this.x - this.radius < x && this.x + this.radius > x) {
      if (this.y - this.radius < y && this.y + this.radius > y) {
        return true;
      }
    }
    return false;
  }
}
