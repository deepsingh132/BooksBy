const { createInstitution, updateInstitution, deleteInstitution, getInstitution, getInstitutions } = require("../controllers/institution");
const { verifyTokenAndAdmin } = require("../utils/verifyToken");

const router = require("express").Router();

router.post("/", verifyTokenAndAdmin, createInstitution);

router.put("/:id", verifyTokenAndAdmin,updateInstitution);

router.delete("/:id", verifyTokenAndAdmin, deleteInstitution);

router.get("/:id", getInstitution);

router.get("/", getInstitutions);

module.exports = router;