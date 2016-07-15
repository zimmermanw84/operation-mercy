// Index
//  public/js/src/index.js
//
//  Created by Walt Zimmerman on 7/6/16.
//

// Models
import { Locke, Npc } from './models/sprite';
import { CollisionMatrix } from './models/board';
import { Overlay } from './models/overlay';

// Controllers
import { ViewController } from './controllers/viewController';
import { AppController } from './controllers/appController';


// Characters
const hero = new Locke;
const NPCs = [new Npc("Mog"), new Npc("Emporer"), new Npc("Gaurd"), new Npc("Kefka")];
// Overlays
const overlays = {intro: new Overlay("intro")};
// Locals
const viewController = new ViewController(overlays);
const BoardFactory = new CollisionMatrix;

BoardFactory.buildBoard()
  .then((Board) => {
    const AppCtrl = new AppController(viewController, Board, hero, NPCs);
    // AppCtrl.logBoard();
  })
  .catch((err) => { console.error(err); });
