var canvas = document.getElementById("picker");
var context = canvas.getContext("2d");
var colorWheel;
var shadePicker;
var mouseDown = false;

function init() {
  colorWheel = new ColorWheel(context);
  colorWheel.init(canvas.height / 2, canvas);

  shadePicker = new ShadePicker(context);
  shadePicker.init(colorWheel.radius * 2, 0, 20, canvas.height);

  // Setup event listeners
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mousemove", onMouseMove);
}

function onMouseDown() {
  mouseDown = true;
}

function onMouseUp() {
  mouseDown = false;
}

function onMouseMove() {
  if (mouseDown) {
    var x = event.clientX;
    var y = event.clientY;
    colorWheel.draw();
    colorWheel.cursor.move(event.clientX, event.clientY);
    // event.clientX
  }
}

init();
