# Color Wheel
Color Wheel is a Javascript library to create a color wheel with a canvas element

## Installation
Copy the files from the library folder into your project.

## Usage
First you need to import all the files into your HTML file
```html
<script src="lib/ColorWheel/HelperFunctions.js"></script>
<script src="lib/ColorWheel/ShadePicker.js"></script>
<script src="lib/ColorWheel/Cursor.js"></script>
<script src="lib/ColorWheel/ColorWheel.js"></script>
```
In order to initialize the color wheel, create a new instance of it and call the `init` method.
```javascript
var canvas = document.getElementById('canvas');
var colorWheel = new ColorWheel(canvas);
colorWheel.init();
```
To access the color values create a global variable called `colorDidChange`. This function has 3 parameters; RGB, HEX, HSL which is an object, a string, and an object respectively.
```javascript
function colorDidChange(rgb, hex, hsl) {
  // rgb = {r, g, b}
  // hex = string
  // hsl = {h, s, l}
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](LICENSE)
