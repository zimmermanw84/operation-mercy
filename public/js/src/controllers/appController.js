//  Application Controller
//  public/js/src/contollers/appController.js
//
//  Created by Walt Zimmerman on 7/9/16.
//

// Hero/Locke Starting position
const [heroX, heroY] = [19, 33];
// NPC starting Positions
const  NPC_STARTING_XY = {
  Mog: { x: 12, y: 14},
  Emporer: { x: 29, y: 9},
  Gaurd: { x: 41, y: 15},
  Kefka: { x: 54, y: 11}
}
/**
* AppController {object}
* @param ViewController {ViewController}
* @param Board {Board} - Map Matrix
* @param hero {Locke} - Locke Sprite object
* @param npcs {Array, NPC} - Array of npcs
*/
class AppController {
  constructor(ViewController, Board, hero, npcs) {
    this.VC = ViewController;
    this.Board = Board;
    this.hero = hero;
    this.npcs = npcs || [];

    // Initialize
    this._initSprites();
  }

  /**
  * @public
  * logBoard {function}
  * Console log the board
  */
  logBoard() {
    this.Board.forEach((row) => {
      console.log(row);
    });
  }

  /**
  * @private
  * _initSprites {function}
  * Put sprites into play
  */
  _initSprites() {
    this._bindHeroMovement();
    this._setInitSpritePosition();
    this._updateBoard(this.hero);
    this.spriteRandomMovment();
    this.annimationLoop();
  }

  /**
  * @private
  * spriteRandomMovment {function}
  * Randomly move sprites around canvis
  */
  spriteRandomMovment() {
    setInterval(() => {
      this.npcs.forEach((npc) => {
        npc.moveRandom()
        this._updateBoard(npc);
      });
    }, 1000);
  }

  /**
  * @private
  * annimationLoop {function}
  * Re-render board
  */
  annimationLoop() {
    setInterval(() => {
      this.VC.render([this.hero].concat(this.npcs));
    }, 50/*frame rate... kinda lol*/);
  }

  /**
  * @private
  * _setInitSpritePosition {function}
  * Set initial position of sprites
  */
  _setInitSpritePosition() {
    this.hero.setPosition(heroX, heroY);
    // Set more NPC sprites after
    this.npcs.forEach((npc) => {
      npc.setPosition(NPC_STARTING_XY[npc.name].x, NPC_STARTING_XY[npc.name].y);
      // Only need to update board during init for npcs
      this._updateBoard(npc);
    });
  }

  /**
  * @private
  * _updateBoard {function}
  * Place Sprite on board
  */
  _updateBoard(sprite) {
    // Make sure is coorinates placeable
    if(this._isPlacableOnBoard(sprite)) {
        this.Board[sprite.yLast][sprite.xLast] = 0;
        // Set new position on board
        this.Board[sprite.y][sprite.x] = sprite;
    } else {
      // reset position
      sprite.setPosition(sprite.xLast, sprite.yLast);
    }

  }

   /**
  * @private
  * _isPlacableOnBoard {function}
  * @return {Bool}
  * @param {Sprite}
  */
  _isPlacableOnBoard(sprite) {
    // MAX Matrix bounds
    if(sprite.x > 61 || sprite.y > 33) {
      return false;
    } else if (this.Board[sprite.y][sprite.x] !== 0) {
      return false;
    } else {
      return true;
    }
  }

  /**
  * @private
  * _bindHeroMovement {function}
  * bind keyboard event for hero movement
  */
  _bindHeroMovement() {
    window.addEventListener('keydown', (e) => {
        switch(e.keyCode) {
          case 37:
            console.log("Left", 37);
            this.hero.moveLeft();
            break;
          case 38:
            console.log("Up", 38)
            this.hero.moveUp();
            break;
          case 39:
            console.log("Right", 39)
            this.hero.moveRight();
            break;
          case 40:
            console.log("Down", 40)
            this.hero.moveDown();
            break;
          default:
            console.log("non movement key");
        }

        if([37, 38, 39, 40].indexOf(e.keyCode) !== -1) {
          // Then update sprite on board
          this._updateBoard(this.hero);
          // For Development
          // this.logBoard();
          if(this.VC.introOverlay.isActive) {
            // Hide on user input
            this.VC.introOverlay.toggleOverlay();
          }
        }
    });
  }

}

export { AppController }