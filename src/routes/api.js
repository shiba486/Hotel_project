
const router = require("express").Router()
const personController = require("../controllers/person.controller");
const menuController = require("../controllers/menu.controller");
const {authToken, jwtAuthMiddle} = require("../middlewares/auth.middleware")
// const passport = require("../middlewares/passport.middleware")
// router.use(passport.initialize())

router.get("/home",personController.home)
//person
router.post("/person",personController.enterPerson);
router.get("/login",personController.loginUser);

router.get("/person",authToken, personController.showPerson)
router.get("/person/:workType",jwtAuthMiddle,personController.showPersonWorkBased)
router.put("/person/:id",jwtAuthMiddle,personController.updatePerson)
router.delete("/person/:id",jwtAuthMiddle,personController.deletePerson)

//menu item
router.post("/menu",menuController.menuInsert)
router.get("/menu",jwtAuthMiddle,menuController.showMenuItem)
router.put("/menu/:id",jwtAuthMiddle,menuController.updateMenuItem)
router.delete("/menu/:id",jwtAuthMiddle,menuController.deleteMenuItem)
// personRouter.post("/logIn",personController.logIn)



module.exports =router