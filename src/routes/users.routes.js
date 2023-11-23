const { Router } = require("express");

const UsersController = require("../controllers/UsersController");
const usersController = new UsersController();

const ensureAuth = require("../middleware/ensureAuth");

const usersRoutes = Router();

usersRoutes.post("/", usersController.create);
usersRoutes.get("/",ensureAuth, usersController.show);

module.exports = usersRoutes;