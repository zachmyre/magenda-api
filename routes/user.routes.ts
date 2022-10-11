const router = require("express").Router();

router.get("/info", async (req: any, res: any) => {
  return res.status(200).send("oh so you want some info huh?");
});

module.exports = router;
