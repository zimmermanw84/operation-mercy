//  Canvas View Controller
//  public/js/src/canvasVC.js
//
//  Created by Walt Zimmerman on 7/6/16.
//

/**
* CanvasViewController {object}
* @params height {Number}, width {Number} - Optional
*/

class CanvasViewController {
  constructor(height, width, backgroundImgSrc) {
    this.height = height || window.innerHeight;
    this.width = width || window.innerWidth;
    this.backgroundImgSrc = backgroundImgSrc || "assets/sprites/thamasa.png"
    this.background = new Image();

    // Uninitalized canvas and context objects
    this.canvas;
    this.ctx;

    // Initialize CanvasViewController
    this._init();
  }

  /**
  * @private
  * _init {function}
  * Initialize CanvasViewController
  */
  _init() {
    this._buildAndAppendCanvas();
    this._drawBackgroundImg();
    this._bindInitEvents();
  }

  /**
  * @private
  * _buildAndAppendCanvas {function}
  * Build canvas and append to DOM
  */
  _buildAndAppendCanvas() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    // Set Props
    this.canvas.width = this.width //512;
    this.canvas.height = this.height //480;
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
  _bindInitEvents() {
      // Bind load event
    this.background.onload = () => {
      this.ctx.scale(2,2);
      this.ctx.drawImage(this.background,0,0);
    }
  }

}

export { CanvasViewController }
