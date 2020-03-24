export default class Signature {
  constructor(options = { el, lineWidth: 10 }) {
    this.canvas = options.el;
    this.ctx = this.canvas.getContext('2d');
    this.lineWidth = options.lineWidth;
    this.painting = false;
    this.lastPoint = { x: undefined, y: undefined };
    this.isMobile = document.body.ontouchstart !== undefined;

    if (this.isMobile) {
      this.canvas.addEventListener('touchstart', this.onStartDraw.bind(this));
      this.canvas.addEventListener('touchmove', this.onDrawing.bind(this));
      this.canvas.addEventListener('touchend', this.onDrawEnd.bind(this));
    } else {
      this.canvas.addEventListener('mousedown', this.onStartDraw.bind(this));
      this.canvas.addEventListener('mousemove', this.onDrawing.bind(this));
      this.canvas.addEventListener('mouseup', this.onDrawEnd.bind(this));
    }
  }

  onStartDraw(e) {
    let point = this.isMobile ? (point = e.touches[0]) : e;
    this.painting = true;
    let x = point.clientX;
    let y = point.clientY;
    this.lastPoint = { x, y };
  }

  onDrawing(e) {
    if (this.painting) {
      let point = this.isMobile ? (point = e.touches[0]) : e;
      let x = point.clientX;
      let y = point.clientY;
      let newPoint = { x, y };
      this.drawLine(this.lastPoint.x, this.lastPoint.y, newPoint.x, newPoint.y);
      this.lastPoint = newPoint;
    }
  }

  onDrawEnd() {
    this.painting = false;
  }

  drawLine(x1, y1, x2, y2) {
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  saveAsDataUrl() {
    return this.canvas.toDataURL('image/png');
  }

  saveAsFile(filename = 'sign.png') {
    const dataUrl = this.canvas.toDataURL('image/png');
    var arr = dataUrl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  download(filename = 'sign.png') {
    let dataUrl = this.canvas.toDataURL('image/png');
    let a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    a.target = '_blank';
    a.click();
  }
}
