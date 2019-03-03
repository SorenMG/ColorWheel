function ShadePicker(context) {
  this.x = 0;
  this.y = 0;
  this.padding = 16;
  this.height = 100;
  this.width = 40;

  this.init = function(x, y, width, height) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;

    this.draw();
  }

  this.draw = function() {
    var gradient = context.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
    gradient.addColorStop(1, 'hsl(1, 100%, 0%)');
    gradient.addColorStop(0, 'hsl(1, 100%, 50%)');
    context.fillStyle = gradient;
    context.fillRect(this.x + this.padding, this.y, this.width, this.height);
  }
}
