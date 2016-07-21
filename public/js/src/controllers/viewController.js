//  Canvas View Controller
//  public/js/src/controllers/viewController.js
//
//  Created by Walt Zimmerman on 7/8/16.
//

import Q from '../../vendor/Q';

// Promise
const Promise = Q.Promise;

/**
* ViewController {object}
* @param overlays {Array} - Overlay objects to control intro overlay and dialog box
* @params height {Number}, width {Number} - Optional
*/

class ViewController {

  constructor(overlays={},height, width) {
    // Overlay props
    this.introOverlay = overlays["intro"];
    this.dialogOverlay = overlays["dialog"];

    // Hard coded for background img dimensions
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
    this.canvas.style.position = "relative";
    this.canvas.style.zIndex = "1";
    this.ctx = this.canvas.getContext("2d");
    // Set Props
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    // Append canvas object
    document.getElementById("canvas-container").appendChild(this.canvas);
  }

  /**
  * @public
  * render {function}
  * add necessary listeners
  */
  render(sprites) {
    // we can't add the source to the image upon sprite construction or it would load before we add the listener in the VC
    sprites.map((sprite) => { sprite.image.src = sprite.imgSrc});
    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height)

    // Bind load event
    sprites[0].image.onload = () => {

      // Draw NPCS
      sprites.forEach((sprite) => {
        this.ctx.drawImage(sprite.image, (sprite.x*this.cellPX), (sprite.y*this.cellPX));
      });

    }
  }

}

export { ViewController }
