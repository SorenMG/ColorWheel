function ColorWheel(context) {
  // Variables
  this.x;
  this.y;
  this.radius;
  this.counterClockwise = false;
  this.cursor = new Cursor(context);
  this.shadePicker = new ShadePicker(context);

  this.init = function(radius, canvas) {
    // Initialize color wheel
    this.radius = radius;
    this.x = radius;
    this.y = radius;

    // Initialize cursor;
    // this.cursor = new Cursor(context);
    this.cursor.move(this.radius, this.radius);

    this.shadePicker.init(canvas.height, 0, 20, canvas.height, canvas);
    this.updateShadePicker(getPixelColor(this.cursor.x, this.cursor.y));

    this.draw();

    // Setup event listeners
    canvas.addEventListener("mousedown", function(event) {
      colorWheel.onMouseDown();
    });
    canvas.addEventListener("mouseup", function(event) {
      colorWheel.onMouseUp();
    });
    canvas.addEventListener("mousemove", function(event) {
      colorWheel.onMouseMove();
    });
  }

  this.draw = function() {
    for(var angle=0; angle<=360; angle+=1){
      var startAngle = (angle-2)*Math.PI/180;
      var endAngle = angle * Math.PI/180;
      context.beginPath();
      context.moveTo(this.x, this.y);
      context.arc(this.x, this.y, this.radius, startAngle, endAngle, this.counterClockwise);
      context.closePath();
      var gradient = context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
      gradient.addColorStop(0,'hsl('+angle+', 10%, 100%)');
      gradient.addColorStop(1,'hsl('+angle+', 100%, 50%)');
      context.fillStyle = gradient;
      context.fill();
    }
    this.cursor.draw();
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
      if (!(this.cursor.exceedsCircle(this.radius, this.radius, x, y, this.radius))) {
        this.cursor.move(x, y);

        // Do color calculations
        // updateColors(getPixelColor(x, y));
        this.updateShadePicker(getPixelColor(x, y));
        this.redraw();
      }
    }
  }

  // Returns a four entry array of R, G, B, A


  this.updateShadePicker = function(pixelData) {
    var rgb = convertDataToRGB(pixelData);
    var hsl = rgb2hsv(rgb.r, rgb.g, rgb.b);
    this.shadePicker.changeHue(hsl[0], hsl[1]);
  }

  this.redraw = function() {
    clearCanvas();
    this.draw();
    this.shadePicker.draw();
  }
}
