import Sprite from '../base/sprite'


const IMG_SRC = 'images/player.png'
const IMG_WIDTH = 146
const IMG_HEIGHT = 212



export default class Player extends Sprite {

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
      0 + 25 * scale + x,
      0 - 40 * scale + y,
      w - 50 * scale,
      h + 0
    )

  }
}
