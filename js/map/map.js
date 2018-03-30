import Sprite from '../base/sprite'

const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const IMG_SRC = 'images/square.png'
const IMG_WIDTH = 177
const IMG_HEIGHT = 133

/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
  constructor(ctx) {
    super(IMG_SRC, IMG_WIDTH, IMG_HEIGHT)

    this.render(ctx)

    this.left = 0
    this.top = 200

    this.itemWidth = 130
    this.itemHeight = 100
  }

  update() {
    this.left -= 0.5

    if (this.left <= -500)
      this.left = 0
  }


  render(ctx) {
    const w = 130
    const h = 80
    var x = 0, y = 0;
    for (var x = 0; x < 50; x++) {
      for (var y = 0; y < 50; y++) {
        //中心点 100/2 100/2
        let xw = x * w / 2 + y * w / 2 + this.left
        let yh = -x * h / 2 + y * h / 2 + this.top
        ctx.lineWidth = 1
        ctx.strokeStyle = '#08c'
        ctx.beginPath()
        ctx.moveTo(0 + xw, h / 2 + yh)
        ctx.lineTo(w / 2 + xw, 0 + yh)
        ctx.lineTo(w + xw, h / 2 + yh)
        ctx.lineTo(w / 2 + xw, h + yh)
        ctx.lineTo(0 + xw, h / 2 + yh)
        ctx.closePath()
        ctx.stroke()

        ctx.drawImage(
          this.img,
          0,
          0,
          this.width,
          this.height,
          0 + 13 + xw,
          0 - 1 + yh,
          w - 26,
          h
        )
      }
    }

    // ctx.drawImage(
    //   this.img,
    //   0,
    //   0,
    //   this.width,
    //   this.height,
    //   0 + this.left,
    //   0 + this.top,
    //   w,
    //   h
    // )


    // ctx.drawImage(
    //   this.img,
    //   0,
    //   0,
    //   this.width,
    //   this.height,
    //   0,
    //   this.top,
    //   screenWidth,
    //   screenHeight
    // )
  }
}
