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
    this.cellPX = 21.5;

    // Uninitalized canvas and context objects
    this.canvas;
    this.ctx;

    // Initialize ViewController
    this._init();
  }

  /**
  * @private
  * _init {function}
  * Initialize ViewController
  */
  _init() {
    this.canvas = document.createElement("canvas");
    this.canvas.style.position = "absolute";
    this.canvas.style.zIndex = "1";
    // this.canvas.style.overflow = "scroll";
    this.ctx = this.canvas.getContext("2d");

    // Set Props
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    // Append canvas object
    document.body.appendChild(this.canvas);
  }

  /**
  * @private
  * _bindInitEvents {function}
  * add necessary listeners
  */
  render(sprite) {
    // we can't add the source to the image upon sprite construction or it would load before we add the listener in the VC
    sprite.image.src = sprite.imgSrc;

    // Bind load event
    sprite.image.onload = () => {
      // this.ctx.scale(2,2);
      this.ctx.clearRect(0, 0, this.width, this.height)
      this.ctx.drawImage(sprite.image, (sprite.x*this.cellPX), (sprite.y*this.cellPX));
    }
  }

}



export { ViewController }
