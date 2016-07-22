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

// Import for type checking
import { Npc } from "../models/sprite";

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

    // Track random movement
    this.isSpriteMovementActive = false;

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
    this._spriteRandomMovment();
    this._annimationLoop();
  }

  /**
  * @private
  * spriteRandomMovment {function}
  * Randomly move sprites around canvis
  */
  _spriteRandomMovment() {
    this.spriteMovement = setInterval(() => {
      this.npcs.forEach((npc) => {
        npc.moveRandom()
        this._updateBoard(npc);
      });
    }, 1000);

    this.isSpriteMovementActive = true;
  }

  /**
  * @private
  * _stopSpriteMovment {function}
  * Stop sprite movement board
  */
  _stopSpriteMovment() {
    clearInterval(this.spriteMovement);
    this.isSpriteMovementActive = false;
  }

  /**
  * @private
  * annimationLoop {function}
  * Re-render board
  */
  _annimationLoop() {
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
  * _tryHeroTalkToNPC {function}
  * Attempt to talk to npc
  */
  _tryHeroTalkToNPC() {
    /*
      Check all directional cases
      NOTE:
      A way to optimize this would be to find which
      direction the char is facing and only check that side
    */
    let isNPC = false;
    // Cache NPC reference
    let NPC;
    // Fall through
    if(this.Board[(this.hero.y + 1)][this.hero.x] instanceof Npc) {
      NPC = this.Board[(this.hero.y + 1)][this.hero.x];
      isNPC = true;
    }

    if(this.Board[(this.hero.y - 1)][this.hero.x] instanceof Npc) {
      NPC = this.Board[(this.hero.y - 1)][this.hero.x];
      isNPC = true;
    }

    if(this.Board[this.hero.y][(this.hero.x + 1)] instanceof Npc) {
      NPC = this.Board[this.hero.y][(this.hero.x + 1)];
      isNPC = true;
    }

    if(this.Board[this.hero.y][(this.hero.x - 1)] instanceof Npc) {
      NPC = this.Board[this.hero.y][(this.hero.x - 1)];
      isNPC = true;
    }

    if(isNPC && !this.VC.dialogOverlay.isActive && this.isSpriteMovementActive) {
      this._stopSpriteMovment();
      this.VC.dialogOverlay.toggleOverlay(NPC);
    } else if(isNPC) {
      this.VC.dialogOverlay.toggleOverlay(NPC);
      this._spriteRandomMovment();
    }
     // KEEP OLD IMPLIMENTATION IN LUE OF TESTING
    // switch(true) {
      // case (this.Board[(this.hero.y + 1)][this.hero.x] instanceof Npc):
      // case (this.Board[(this.hero.y - 1)][this.hero.x] instanceof Npc):
      // case (this.Board[this.hero.y][(this.hero.x + 1)] instanceof Npc):
      // case (this.Board[this.hero.y][(this.hero.x - 1)] instanceof Npc):
        // If overlay is active then toggle and start movement
        // if(!this.VC.dialogOverlay.isActive && this.isSpriteMovementActive) {
        //   this._stopSpriteMovment();
        //   this.VC.dialogOverlay.toggleOverlay();
        // } else {
        //   this.VC.dialogOverlay.toggleOverlay();
        //   this._spriteRandomMovment();
        // }
    // }
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
    // Enum movement keycodes
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;
    const SPACE = 32;

    window.addEventListener('keydown', (e) => {

        switch(e.keyCode) {
          case LEFT:
            this.hero.moveLeft();
            break;
          case UP:
            this.hero.moveUp();
            break;
          case RIGHT:
            this.hero.moveRight();
            break;
          case DOWN:
            this.hero.moveDown();
            break;
          case SPACE:
            // For exiting overlays
            if(this.VC.introOverlay.isActive) {
              // Intro overlay
              this.VC.introOverlay.toggleOverlay();
            }

            // Try and talk to npc
            this._tryHeroTalkToNPC();
            break;
          default:
            console.log("non movement key");
        }

        if([37, 38, 39, 40].indexOf(e.keyCode) !== -1) {
          // Then update sprite on board
          this._updateBoard(this.hero);
          // For Development
          // this.logBoard();
        }
    });
  }

}

export { AppController }