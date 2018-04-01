import Sprite from '../base/sprite'


const IMG_SRC = 'images/building.png'
const IMG_WIDTH = 416
const IMG_HEIGHT = 328



export default class Building extends Sprite {

  constructor(ctx) {
    super(IMG_SRC, IMG_WIDTH, IMG_HEIGHT)
  }

  update() {

  }


  render(ctx, x, y, w, h, scale) {

    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      0 + 15 * scale + x,
      0 - 50 * scale + y,
      w - 30 * scale,
      h + 40 * scale
    )

    // 绘制图像边框，用于调试比例
    // ctx.save()
    // ctx.fillStyle = "#000000";
    // ctx.strokeStyle = '#f60'
    // ctx.setLineDash([2, 2]); 
    // ctx.lineWidth = 1;
    // ctx.fillRect(10, 10, 40, 40)
    // ctx.strokeRect(x, y, w, h)
    // ctx.restore()

  }
}
