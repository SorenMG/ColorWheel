function ShadePicker(context) {
  this.x = 0;
  this.y = 0;
  this.padding = 16;
  this.height = 100;
  this.width = 40;
  this.hue = 0;
  this.saturation = 100;

  this.init = function(x, y, width, height) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;

    this.draw(0);
  }

  this.draw = function() {
    var gradient = context.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
    gradient.addColorStop(1, 'hsl('+this.hue+', '+this.saturation+'%, 0%)');
    gradient.addColorStop(.5, 'hsl('+this.hue+', '+this.saturation+'%, 50%)');
    gradient.addColorStop(0, 'hsl('+this.hue+', '+this.saturation+'%, 100%)');
    context.fillStyle = gradient;
    context.fillRect(this.x + this.padding, this.y, this.width, this.height);
  }

  this.changeHue = function(hue, saturation) {
    this.hue = hue;
    this.saturation = saturation * 100;
    this.draw();
  }
}
