const Institution = require("../models/Institution");

const createInstitution = async (req, res) => {
  const institution = new Institution(req.body);
  try {
    const saveInstitution = await institution.save();
    res.status(200).json(saveInstitution);
  } catch (err) {
    res.status(500).json(err)
  }
}
const pushBooks = async (req, res) => {
  const institutionId = req.params.id;
  try {
    const institution = await Institution.findById(institutionId);
    //institution.books.push('');
    institution.books.concat(req.body);
    await institution.save();
  } catch (err) {
    res.status(500).json(err);
  }
}

const pullBooks = async (req, res) => {
  const institutionId = req.params.id;
  try {
    const institution = await Institution.findById(institutionId);
    //institution.books.pull('');
    institution.books.pull(req.body);
    await institution.save();
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateInstitution = async (req, res) => {
  try {
    const updatedInstitution = await Institution.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedInstitution);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteInstitution = async (req, res) => {
  try {
    await Institution.findByIdAndDelete(req.params.id);
    res.status(200).json("Institution has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getInstitution = async (req, res) => {
  try {
    const institution = await Institution.findById(req.params.id);
    res.status(200).json(institution);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getInstitutions = async (req, res) => {
  const qNew = req.query.new;
  let ids = req.query.ids;

  if (ids) {
    ids = ids.split(",");
  }

  try {
    let institutions;

    if (qNew) {
      institutions = await Institution.find().sort({ createdAt: -1 }).limit(1);
    }
    else if (ids) {
      institutions = await Institution.find({
        _id: {
          $in: ids,
        },
      });
    }
    else {
      institutions = await Institution.find();
    }
    res.status(200).json(institutions);
  } catch (err) {
    res.status(500).json(err);
  }
};



module.exports = { createInstitution, updateInstitution, deleteInstitution, getInstitution, getInstitutions, pushBooks, pullBooks };