//  Board
//  public/js/src/models/board.js
//
//  Created by Walt Zimmerman on 7/8/16.
//

import Q from '../../vendor/Q';

// Promise
const Promise = Q.Promise;

/**
* @private
* CollisionMatrix {object}
* An matrix representation of the collision map
*/
class CollisionMatrix {
  constructor() {
    this.spritesheet = new Image();
    this.spritesheet.src = "assets/sprites/CollisionMap.png";

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");

    this.matrix = [];
    this.tiles = [];
    this.isBoardLoaded = false;
    this.tileHeight = 22;
    this.tileWidth = 22;
    this.tileCount = 4;
  }

  /**
  * @public
  * buildBoard {function}
  * Take a collision image(png) and build a matrix
  * @return {Promise} Board
  */
  buildBoard() {

    return Promise((resolve, reject) => {

      // Sprite sheet load event
      this.spritesheet.onload = (event) => {
        // Determine dimensions of the board/canvas
        let tilesX = Math.floor(this.spritesheet.width / this.tileWidth);
        let tilesY = Math.floor(this.spritesheet.height / this.tileHeight);

        this.canvas.width = this.spritesheet.width;
        this.canvas.height = this.spritesheet.height;
        // use canvas context to draw spritesheet/collision map so we can iterate over it
        this.ctx.drawImage(this.spritesheet, 0, 0);

        // Build a 1d array of 22x22 pixel image data
        for(var i=0; i<tilesY; i++) {
          for(var j=0; j<tilesX; j++) {
            this.tiles.push(this.ctx.getImageData(j*this.tileWidth, i*this.tileHeight, this.tileWidth, this.tileHeight));
          }
        }

        // Turn 1d array into 2d array of image data
        while(this.tiles.length) this.matrix.push(this.tiles.splice(0, tilesX));

        // Temp Board
        let Board = [];
        // Temp Board row
        let boardRow = [];

        // Build board
        this.matrix.forEach((imgDataRow, index, array) => {
          imgDataRow.forEach((imgDataCell) => {
            if(imgDataCell.data[0] === 0 && imgDataCell.data[1] === 0 &&
              imgDataCell.data[2] === 0 && imgDataCell.data[3] === 255) {
              boardRow.push(1);
            } else {
              boardRow.push(0);
            }
          });

          console.log(boardRow.length)
          // Push row into board
          Board.push(boardRow);
          // After last iteration
          if(index + 1 === array.length) {
            // Return Board
            resolve(Board);
          } else {
            // Reset row
            boardRow = [];
          }
        });

      }
    });
  }

}

export { CollisionMatrix }