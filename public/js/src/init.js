//  Init
//  public/js/src/init.js
//
//  Created by Walt Zimmerman on 7/6/16.
//

/*
  =====================================================================================
  initCanvas @private {function}

  @return {Object} Cavas Context Object
  @params height {Number}, width {Number}
  Initialize canvas and add to dom
  =====================================================================================
*/

const initCanvas = (height, width) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  // Set Props
  canvas.width = width //512;
  canvas.height = height //480;
  // Append canvas object
  document.body.appendChild(canvas);

  return ctx;
};


/*
  =====================================================================================
  initBackgroundImg @private {function}

  @return {void}
  @param src {String}
  Add Background img to canvas
  =====================================================================================
*/

const initBackgroundImg = (src, context) => {
  const background = new Image();
  background.src = src;

  // Bind load event
  background.onload = () => {
    console.log("onload fired")
    context.scale(2,2);
    context.drawImage(background,0,0);
  };
};


// @public - Init Canvas
const init = () => {
  let ctx = initCanvas(window.innerHeight, window.innerWidth);
  initBackgroundImg("assets/sprites/thamasa.png", ctx);
};



export { init }
