//  index router
//  routes/index.js
//
//  Created by Walt Zimmerman on 7/6/16.
//

"use strict";

// Deeps
const express = require('express');
const router = express.Router();

// Controllers
const mainController = require("../controllers/main");

// Render entire web app
router.get('*', mainController.appDispatcher);

module.exports = router;