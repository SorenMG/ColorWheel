// Append all scripts to document
// Include('HelperFunctions.js');
// Include('Cursor.js');
// Include('ShadePicker.js');
//
// function Include(src) {
//   var script = document.createElement('script')
//   script.src = src;
//   script.async = false;
//   document.body.appendChild(script);
//
// }

function ColorWheel(canvas) {
  // Variables
  this.radius = canvas.height / 2;
  this.x = this.radius;
  this.y = this.radius;
  this.context = canvas.getContext('2d');
  this.cursor = new Cursor(this.context);
  this.shadePicker = new ShadePicker(this.context);

  this.init = function() {
    // Move cursor to center;
    this.cursor.init("circ", 3);
    this.cursor.move(this.radius, this.radius);

    this.shadePicker.init(canvas.height, 0, 20, canvas.height, canvas);

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

    this.draw();
  }

  this.draw = function() {
    for(var angle=0; angle<=360; angle+=1){
      var startAngle = (angle-2)*Math.PI/180;
      var endAngle = angle * Math.PI/180;
      this.context.beginPath();
      this.context.moveTo(this.x, this.y);
      this.context.arc(this.x, this.y, this.radius, startAngle, endAngle, false);
      this.context.closePath();
      var gradient = this.context.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
      gradient.addColorStop(0,'hsl('+angle+', 10%, 100%)');
      gradient.addColorStop(1,'hsl('+angle+', 100%, 50%)');
      this.context.fillStyle = gradient;
      this.context.fill();
    }
    this.cursor.draw();

    // Parse to shade picker
    this.updateShadePicker(getPixelColor(this.cursor.x, this.cursor.y, this.context));
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

        this.redraw();
      }
    }
  }

  // Returns a four entry array of R, G, B, A
  this.updateShadePicker = function(pixelData) {
    var rgb = convertDataToRGB(pixelData);
    var hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    this.shadePicker.changeHue(hsl.h, hsl.s);
  }

  this.redraw = function() {
    this.context.clearRect(0, 0, this.radius * 2, canvas.height);
    this.draw();
  }
}
