var canvas = document.getElementById("picker");
var context = canvas.getContext("2d");
var colorWheel = new ColorWheel(context);


// TO-DO:
/*
 - Make 1 cursor object
 - Make colors to objects
*/

function init() {
  colorWheel.init(canvas.height / 2, canvas);
}

function updateColors(pixelData) {

  //
  // // Update RGB label



  // Update HEX label
  // console.log(rgbToHex(r, g, b));

  // Update shade picker

}

function updateRGBLabels(rgb) {
  document.getElementById('red').innerText = 'R: ' + rgb.r;
  document.getElementById('green').innerText = 'G: ' + rgb.g;
  document.getElementById('blue').innerText = 'B: ' + rgb.b;
}

// Call this function to update labels
// 1. parameter: RGB object
// 2. parameter: HEX string
// 3. parameter: HSL object
function colorDidChange(rgb, hex, hsl) {
  // console.log(rgb, hex, hsl);

  updateRGBLabels(rgb);
}
