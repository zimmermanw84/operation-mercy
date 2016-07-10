//  Index
//  public/js/src/index.js
//
//  Created by Walt Zimmerman on 7/6/16.
//

import { Locke } from './models/sprite';
import { ViewController } from './controllers/viewController';
import { AppController } from './controllers/appController';
import { CollisionMatrix } from './models/board';

const viewController = new ViewController;
const BoardFactory = new CollisionMatrix;
const hero = new Locke;

BoardFactory.buildBoard()
  .then((Board) => {
    const AppCtrl = new AppController(viewController, Board, hero);
    AppCtrl.logBoard();
  })
  .catch((err) => { console.error(err); });
