import Sprite from '../base/sprite'
import Road from '../element/road.js'
import Building from '../element/building.js'
import B3 from '../element/b3.js'

import Player from '../element/player'

// 常量
const screenWidth = window.innerWidth
const screenHeight = window.innerHeight

const IMG_SRC = 'images/square.png'
const IMG_WIDTH = 177
const IMG_HEIGHT = 133

const MAP = [0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 3, 3, 3,
  0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 3, 3, 3,
  0, 0, 0, 0, 0, 2, 2, 1, 0, 0, 1, 3, 3, 3,
  0, 0, 0, 1, 0, 2, 2, 1, 0, 0, 1, 2, 2, 0,
  3, 3, 3, 1, 1, 1, 1, 1, 0, 0, 1, 2, 2, 0,
  3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 1, 2, 2, 0,
  3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 1, 2, 2, 0,
  0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
  0, 2, 2, 2, 2, 3, 3, 3, 2, 2, 0, 0, 0, 0,
  0, 0, 0, 2, 2, 3, 3, 3, 2, 2, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 0, 0, 0, 0
];


/**
 * 游戏背景类
 * 提供update和render函数实现背景功能
 */
export default class Map extends Sprite {
  constructor(ctx) {
    super(IMG_SRC, IMG_WIDTH, IMG_HEIGHT)

    this.road = new Road(ctx)
    this.building = new Building(ctx)
    this.b3 = new B3(ctx)
    this.player = new Player(ctx)

    this.size = 14
    this.w = 177
    this.h = 130
    this.scale = .4

    this.left = 0
    this.top = 0

    this.map = (function (MAP, size) {
      let o = {}
      let i = 0
      for (let y = 1; y <= size; y++) {
        for (let x = 1; x <= size; x++) {
          o[x + '_' + y] = MAP[i] ? MAP[i] : 0
          i++
        }
      }
      return o
    })(MAP, this.size)

    this.maxToLeft = (function (me) {
      let max = me.w * me.size * me.scale - screenWidth
      if (max < 0) return 0
      return max
    })(this);

    this.maxToTop = (function (me) {
      let max = (me.h * me.size * me.scale - screenHeight) / 2
      if (max < 0) return 0
      return max
    })(this)

    this.center = {
      x: 5,
      y: 8
    }

    this.targetPos = {
      x: 8,
      y: 8
    }

    this.isMoving = false
  }

  update() {
    // this.left -= 0.5
    // this.scale += 0.0005
    // this.setScale(this.scale)
    // if(this.scale > 1) this.scale = 0.1
    // if (this.left <= -500)
    // this.left = 0

    // this.scale += 0.001
    // this.setScale(this.scale)
    // if(this.scale>0.5) this.scale = 0.1

    // if(this.center.x >= 14) this.center.x = 1
    // this.center.x += 0.1
    // this.setCenter(this.center.x,this.center.y)
    this.setCenter(5, 8)

  }

  moveTo(x, y) {
    this.targetPos = {
      x: x,
      y: y
    }
    this.isMoving = true
  }

  getOffSet(x, y) {
    let scale = this.scale,
      w = this.w * scale,
      h = this.h * scale,
      l = screenWidth / 2,
      t = screenHeight / 2
    let left = - (x - 1) * w / 2 - (y - 1) * w / 2 + l - w / 2
    let top = (x - 1) * h / 2 - (y - 1) * h / 2 + t - h / 2
    return { left, top }
  }

  setOffSet(x, y) {
    let o = this.getOffSet(x, y)
    this.left = o.left
    this.top = o.top
  }

  setScale(scale) {
    this.scale = scale
    this.setOffSet(this.center.x, this.center.y)
  }

  setCenter(x, y) {
    this.center = {
      x: x,
      y: y
    }
    this.setOffSet(this.center.x, this.center.y)
  }

  drawSquareBorder(ctx, x, y) {
    const scale = this.scale
    const w = this.w * scale
    const h = this.h * scale

    let xw = (x - 1) * w / 2 + (y - 1) * w / 2 + this.left
    let yh = -(x - 1) * h / 2 + (y - 1) * h / 2 + this.top
    ctx.lineWidth = .5
    ctx.strokeStyle = '#69c'
    ctx.beginPath()
    ctx.moveTo(0 + xw, h / 2 + yh)
    ctx.lineTo(w / 2 + xw, 0 + yh)
    ctx.lineTo(w + xw, h / 2 + yh)
    ctx.lineTo(w / 2 + xw, h + yh)
    ctx.lineTo(0 + xw, h / 2 + yh)
    ctx.closePath()
    ctx.stroke()

  }

  render(ctx) {
    const scale = this.scale
    const w = this.w * scale
    const h = this.h * scale

    // 绘制网格，用于调试网格对齐
    for (var y = this.size; y > 0; y--) {
      for (var x = this.size; x > 0; x--) {
        this.drawSquareBorder(ctx, x, y)
      }
    }


    /**
     * 绘制地图上的建筑单位
     * 
     * 
     */
    let mapIsRender = {}
    for (let i = 1; i < this.size * 2; i++) {
      for (let n = 1; n <= (this.size - i >= 0 ? i : this.size * 2 - i); n++) {

        //计算坐标
        let x, y
        if (i <= this.size) {
          x = this.size - (i - n)
          y = n
        } else {
          x = n
          y = i - this.size + n
        }

        // 偏移量
        let xw = (x - 1) * w / 2 + (y - 1) * w / 2 + this.left
        let yh = -(x - 1) * h / 2 + (y - 1) * h / 2 + this.top

        // 绘制建筑
        if (this.map[x + '_' + y]) {
          let size = this.map[x + '_' + y]

          if (mapIsRender[x + '_' + y]) continue
          if (mapIsRender[x + '_' + y] === 0) {
            if (size == 1) this.road.render(ctx, xw, yh - h * (size - 1) / 2, w * size, h * size, scale)
            if (size == 2) this.building.render(ctx, xw, yh - h * (size - 1) / 2, w * size, h * size, scale)
            if (size == 3) this.b3.render(ctx, xw, yh - h * (size - 1) / 2, w * size, h * size, scale)

            // 绘制人物
            if (x == this.center.x && y == this.center.y) {
              this.player.render(ctx, xw, yh - h * (size - 1) / 2, w * size, h * size, scale)
            }

            continue
          }

          for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
              mapIsRender[(x - i) + '_' + (y + j)] = true
            }
          }

          mapIsRender[(x - size + 1) + '_' + y] = 0
        }

        

      }
    }

  }
}
