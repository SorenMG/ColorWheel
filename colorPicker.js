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

  // Setup correct colors
  updateColors(getPixelColor(colorWheel.cursor.x, colorWheel.cursor.y));

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
    var x = event.offsetX;
    var y = event.offsetY;
    if (!(colorWheel.cursor.exceedsCircle(colorWheel.radius, colorWheel.radius, x, y, colorWheel.radius))) {
      colorWheel.cursor.move(x, y);

      // Do color calculations
      // updateColors(getPixelColor(x, y));
      updateShadePicker(getPixelColor(x, y));
      redraw();
    }
  }
}

// Returns a four entry array of R, G, B, A
function getPixelColor(x, y) {
  return context.getImageData(x, y, 1, 1).data;
}

function updateShadePicker(pixelData) {
  var r = pixelData[0];
  var g = pixelData[1];
  var b = pixelData[2];
  var hsl = rgb2hsv(r, g, b);
  shadePicker.changeHue(hsl[0], hsl[1]);
}

function updateColors(pixelData) {

  //
  // // Update RGB label
  // document.getElementById('red').innerText = 'R: ' + r;
  // document.getElementById('green').innerText = 'G: ' + g;
  // document.getElementById('blue').innerText = 'B: ' + b;


  // Update HEX label
  // console.log(rgbToHex(r, g, b));

  // Update shade picker

}

function redraw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  colorWheel.draw();
  shadePicker.draw();
}

// Color convertion
// Source: http://www.javascripter.net/faq/rgbtohex.htm
function rgbToHex(R,G,B) { return toHex(R)+toHex(G)+toHex(B) }
function toHex(n) {
  n = parseInt(n,10);
  if (isNaN(n)) return "00";
  n = Math.max(0,Math.min(n,255));
  return "0123456789ABCDEF".charAt((n-n%16)/16)
      + "0123456789ABCDEF".charAt(n%16);
}

function rgb2hsv (r,g,b) {
  var computedH = 0;
  var computedS = 0;
  var computedV = 0;

  r=r/255; g=g/255; b=b/255;
  var minRGB = Math.min(r,Math.min(g,b));
  var maxRGB = Math.max(r,Math.max(g,b));

  // Black-gray-white
  if (minRGB==maxRGB) {
    computedV = minRGB;
    return [0,0,computedV];
  }

  // Colors other than black-gray-white:
  var d = (r==minRGB) ? g-b : ((b==minRGB) ? r-g : b-r);
  var h = (r==minRGB) ? 3 : ((b==minRGB) ? 1 : 5);
  computedH = 60*(h - d/(maxRGB - minRGB));
  computedS = (maxRGB - minRGB)/maxRGB;
  computedV = maxRGB;
  return [computedH,computedS,computedV];
}

init();
