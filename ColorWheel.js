function ColorWheel(context) {
  // Variables
  this.x;
  this.y;
  this.radius;
  this.counterClockwise = false;
  this.cursor;

  this.init = function(radius) {
    // Initialize color wheel
    this.radius = radius;
    this.x = radius;
    this.y = radius;
    this.draw();

    // Initialize cursor;
    this.cursor = new Cursor(context);
    this.cursor.move(this.radius, this.radius);
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
  }
}
