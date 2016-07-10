//  Application Controller
//  public/js/src/contollers/appController.js
//
//  Created by Walt Zimmerman on 7/9/16.
//

// Hero/Locke Starting position
const [heroX, heroY] = [19, 33];
// NPC starting Positions
const  NPC_STARTING_XY = {
  Mog: { x: 12, y: 14}
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
    this._bindHeroMovement();
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
    this._setInitSpritePosition();

    // console.log("INIT SPRITES hero passed to update", this.hero)
    this._updateBoard(this.hero);
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
      // Check to ses if cell is moveable
      if(this.Board[sprite.y][sprite.x] === 0) {
        // reset last board position
        this.Board[sprite.yLast][sprite.xLast] = 0;
        // Set new position on board
        this.Board[sprite.y][sprite.x] = sprite;
      } else {
        // If not a moveable cell reset sprite position
        sprite.setPosition(sprite.xLast, sprite.yLast);
        this.Board[sprite.y][sprite.x] = sprite;
      }

      // Rerender in view
      this.VC.render(sprite, this.npcs);
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
    if(sprite.x > 61 || sprite.y > 33) return false;
    // Check for NPCs and return false
    // else if(this.Board[sprite.y][sprite.x] instanceof Npc) return false;
    else return true;
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
          this.logBoard();
        }
    });
  }

}

export { AppController }