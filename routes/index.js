var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

/* GET home page. */
router.get("/hola", function (req, res, next) {
  res.json({ mensaje: "Hola Mundo" });
});

module.exports = router;
