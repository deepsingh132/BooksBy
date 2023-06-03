const router = require("express").Router();
const userController = require("../controllers/user");


//INDEX
router.get("/", userController.index);

//SHOW
router.get('/find/:id',  userController.show);

//UPDATE
router.put('/:id', userController.update);

//DELETE
router.delete('/:id', userController.destroy);

//GET USER STATS
router.get("/stats", userController.getStats);


module.exports = router;
