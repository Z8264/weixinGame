import Sprite from '../base/sprite'


const IMG_SRC = 'images/square.png'
const IMG_WIDTH = 177
const IMG_HEIGHT = 133



export default class Road extends Sprite {

  constructor(ctx) {
    super(IMG_SRC, IMG_WIDTH, IMG_HEIGHT)
  }

  update() {
    
  }


  render(ctx,x,y,w,h,scale) {

    ctx.drawImage(
      this.img,
      0,
      0,
      this.width,
      this.height,
      0 + 13 * scale + x,
      0 - 1 * scale + y,
      w - 26 * scale,
      h
    )

  }
}
