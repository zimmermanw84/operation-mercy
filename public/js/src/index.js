//  Index
//  public/js/src/index.js
//
//  Created by Walt Zimmerman on 7/6/16.
//

import { Locke, Npc } from './models/sprite';
import { ViewController } from './controllers/viewController';
import { AppController } from './controllers/appController';
import { CollisionMatrix } from './models/board';

const viewController = new ViewController;
const BoardFactory = new CollisionMatrix;
const hero = new Locke;
const NPCs = [new Npc("Mog")];

BoardFactory.buildBoard()
  .then((Board) => {
    const AppCtrl = new AppController(viewController, Board, hero, NPCs);
    AppCtrl.logBoard();
  })
  .catch((err) => { console.error(err); });
