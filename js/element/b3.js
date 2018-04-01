import Sprite from '../base/sprite'


const IMG_SRC = 'images/b2.png'
const IMG_WIDTH = 642
const IMG_HEIGHT = 428



export default class Building extends Sprite {

  constructor(ctx) {
    super(IMG_SRC, IMG_WIDTH, IMG_HEIGHT)
  }

  update() {

  }


  render(ctx, x, y, w, h, scale) {

    // 绘制图像边框，用于调试比例
    // ctx.fillStyle = "#000000";
    // ctx.strokeStyle = '#ff00ff'
    // ctx.lineWidth = 1;
    // ctx.fillRect(10, 10, 40, 40)
    // ctx.strokeRect(x, y, w, h)

    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      0 + 15 * scale + x,
      0 - 35 * scale + y,
      w - 30 * scale,
      h + 22 * scale
    )

  }
}
