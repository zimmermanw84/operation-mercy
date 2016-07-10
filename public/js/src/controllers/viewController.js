//  Canvas View Controller
//  public/js/src/canvasVC.js
//
//  Created by Walt Zimmerman on 7/8/16.
//

import Q from '../../vendor/Q';

// Promise
const Promise = Q.Promise;

/**
* ViewController {object}
* @params height {Number}, width {Number} - Optional
*/

class ViewController {

  constructor(height, width, backgroundImgSrc) {
    this.height = 768 || height; // height of background image
    this.width = 1366 || width; // width of background image
    this.backgroundImgSrc = backgroundImgSrc || "assets/sprites/ResizedMap.png"
    this.background = new Image();

    // Uninitalized canvas and context objects
    this.canvas;
    this.ctx;

    // Initialize ViewController
    this._init();
  }

  /**
  * @public
  * drawSprite {function}
  * Draw sprite
  */
  drawSprite(sprite) {
    console.log("DRAWING SPRITE DEFORE LOAD")
    sprite.image.onload = () => {
      console.log("DRAWING SPRITE")
      this.ctx.drawImage(sprite.image, sprite.x, sprite.y);
    }
  }

  /**
  * @private
  * _init {function}
  * Initialize ViewController
  */
  _init() {
    this._buildAndAppendCanvas();
    // this._drawBackgroundImg();
    // this.render();
  }

  /**
  * @private
  * _buildAndAppendCanvas {function}
  * Build canvas and append to DOM
  */
  _buildAndAppendCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.style.position = "absolute";
    this.canvas.style.zIndex = "1";
    // this.canvas.style.overflow = "scroll";
    this.ctx = this.canvas.getContext("2d");

    // Set Props
    this.canvas.width = this.width // window.innerWidth;
    this.canvas.height = this.height //window.innerHeight;480;
    // Append canvas object
    document.body.appendChild(this.canvas);
  }

  /**
  * @private
  * _drawBackgroundImg {function}
  * Draw background Img on canvas
  */
  _drawBackgroundImg() {
    this.background.src = this.backgroundImgSrc;
  }

  /**
  * @private
  * _bindInitEvents {function}
  * add necessary listeners
  */
  render(sprite) {
      // Bind load event
    console.log("RENDER", sprite.image)
    let spriteImg = new Image;
    spriteImg.src = "assets/sprites/lock_thumb.png"
    // document.body.appendChild(sprite.image);
    spriteImg.onload = () => {
      // this.ctx.scale(2,2);
      this.ctx.clearRect(0, 0, this.width, this.height)
      console.log("RENDER With sprite")
      this.ctx.drawImage(spriteImg, (sprite.x*22), (sprite.y*22));

      // this.ctx.drawImage(this.background,0,0);
    }
  }

}



export { ViewController }
