function ShadePicker(context) {
  this.x;
  this.y;
  this.padding = 16;
  this.height;
  this.width;
  this.hue;
  this.saturation;
  this.cursor = new Cursor(context);

  this.init = function(x, y, width, height, canvas) {
    this.height = height;
    this.width = width;
    this.x = x;
    this.y = y;

    this.cursor.init("tri", 8);
    this.cursor.move(this.x + this.padding, this.height / 2);

    canvas.addEventListener("mousedown", function(event) {
      colorWheel.shadePicker.onMouseDown();
    });
    canvas.addEventListener("mouseup", function(event) {
      colorWheel.shadePicker.onMouseUp();
    });
    canvas.addEventListener("mousemove", function(event) {
      colorWheel.shadePicker.onMouseMove();
    });
  }

  this.draw = function() {
    var gradient = context.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
    gradient.addColorStop(1, 'hsl('+this.hue+', '+this.saturation+'%, 0%)');
    gradient.addColorStop(.5, 'hsl('+this.hue+', '+this.saturation+'%, 50%)');
    gradient.addColorStop(0, 'hsl('+this.hue+', '+this.saturation+'%, 100%)');
    context.fillStyle = gradient;
    context.fillRect(this.x + this.padding, this.y, this.width, this.height);
    this.cursor.draw();

    this.invokeColorChange();
  }

  this.invokeColorChange = function() {
    var pixelData = getPixelColor(this.cursor.x + 5, this.cursor.y, context);
    var rgb = convertDataToRGB(pixelData);
    var hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    var hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    colorDidChange(rgb, hex, hsl);
  }

  this.changeHue = function(hue, saturation) {
    this.hue = hue;
    this.saturation = saturation * 100;
    this.draw();
  }

  this.onMouseDown = function() {
    this.cursor.mouseDown = true;
  }

  this.onMouseUp = function() {
    this.cursor.mouseDown = false;
  }

  this.onMouseMove = function() {
    if (this.cursor.mouseDown) {
      var x = event.offsetX;
      var y = event.offsetY;
      if (!(this.cursor.exceedsRect(x, y, this.height))) {
        this.cursor.move(this.x + this.padding, y);
        this.redraw();
      }
    }
  }

  this.redraw = function() {
    context.clearRect(this.x, 0, 200, canvas.height);
    this.draw();
  }
}
