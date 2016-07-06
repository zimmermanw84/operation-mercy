//  main Controller
//  contollers/index.js
//
//  Created by Walt Zimmerman on 7/6/16.
//

"use strict";

/*
  =====================================================================================
  Index appDispatcher

  Render client app

  NOTE: Kind of over build, but like to separate concerns in case need to build out more
  =====================================================================================
*/

const appDispatcher = (req, res, next) => {
  res.render("index");
};

module.exports = { appDispatcher };