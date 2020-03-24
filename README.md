# Signature

> Converting signatures to pictures using canvas.

## Usage

```html
<canvas id="canvas"></canvas>

<script src="signature"></script>
<script>
  var signature = new Signature({
    el: document.getElementById('canvas'),
    lineWidth: 5                       // default value is 10.
  })

  signature.saveAsDataUrl()            // return base64 url.
  signature.saveAsFile('image.png')    // return file type data. Filename is optional.
  signature.download('image.png')      // download png image. Filename is optional.
</script>
```