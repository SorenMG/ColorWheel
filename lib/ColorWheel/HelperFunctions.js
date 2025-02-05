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

function rgbToHsl (r,g,b) {
  var computedH = 0;
  var computedS = 0;
  var computedL = 0;

  r = r / 255; g = g / 255; b = b / 255;
  var minRGB = Math.min(r,Math.min(g, b));
  var maxRGB = Math.max(r,Math.max(g, b));

  // Black-gray-white
  if (minRGB==maxRGB) {
    computedL = minRGB;
    return HSLArrayToObject(0, 0, computedL);
  }

  // Colors other than black-gray-white:
  var d = (r==minRGB) ? g-b : ((b==minRGB) ? r-g : b-r);
  var h = (r==minRGB) ? 3 : ((b==minRGB) ? 1 : 5);
  computedH = 60 * (h - d / (maxRGB - minRGB));
  computedS = (maxRGB - minRGB) / maxRGB;
  computedL = maxRGB;
  return HSLArrayToObject(computedH, computedS, computedL);
}

function HSLArrayToObject(h, s, l) {
  return {h: h, s: s, l: l};
}

function getPixelColor(x, y, context) {
  return context.getImageData(x, y, 1, 1).data;
}

function convertDataToRGB(data) {
  return { r: data[0], g: data[1], b: data[2], a: data[3] };
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}
