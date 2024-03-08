const Person = require("../models/person.model");
const {createToken} = require("../helper/createToken")


//Home
exports.home = async function (req, res) {
  try {
    res.status(404).json({ status: "ok", message: "This is Home Page" });
  } catch (error) {
    res.status(404).json({ status: "erro", message: "User not create" });
  }
};

//new person entry
exports.enterPerson = async function (req, res) {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    res.status(200).json({ msg: "ok", data: response });
  } catch (error) {
    res.status(404).json({ message: "person not insert on db" });
    console.log(error);
  }
};
//person login
exports.loginUser = async function (req, res) {
  const { username, password } = req.body;
  const user = await Person.findOne({ username: username });
  if (!user) {
    res.status(404).json({ msg: "data not found" });
  }
  const isPasswordMatch = await user.comparePassword(password);
  if (isPasswordMatch) {
    const payload = { username: user["username"], email: user["email"] };
    const accessToken = await createToken (payload);
    res
      .status(200)
      .json({ msg: "Log in Successfull", token: accessToken, data: user });
  } else {
    res.status(404).json({ msg: "invalid password" });
  }
};
// person find
exports.showPerson = async function (req, res) {
  try {
    const email = req.headers["email"]
    const data = await Person.find({email: email});

    res.status(404).json({ msg: "data fetched", data: data });
  } catch (error) {
    res.status(404).json({ message: "person not found" });
    console.log(error);
  }
};

// person find by work based
exports.showPersonWorkBased = async function (req, res) {
  try {
    const workType = req.params.workType;
    if (workType == "waiter" || workType == "manager" || workType == "chef") {
      const data = await Person.find({ work: workType });
      res.status(200).json({ msg: "data fetched", data: data });
    } else {
      res.status(404).json({ msg: "data not found" });
    }
  } catch (error) {
    res.status(404).json({ message: "person not found" });
    console.log(error);
  }
};

// person update
exports.updatePerson = async function (req, res) {
  try {
    const personId = req.params.id;
    const data = req.body;
    const updatePerson = await Person.findByIdAndUpdate(personId, data, {
      new: true,
      runValidators: true,
    });
    if (!updatePerson) {
      res.status(404).json({ message: "person not found" });
    }
    res.status(200).json({ message: "updated", data: updatePerson });
  } catch (error) {
    res.status(500).json({ message: "invalid credential" });
    console.log(error);
  }
};

// person delete
exports.deletePerson = async function (req, res) {
  try {
    const personId = req.params.id;
    const deletePerson = await Person.findByIdAndDelete(personId);
    if (!deletePerson) {
      res.status(404).json({ message: "person not found" });
    }
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    res.status(404).json({ message: "person not found" });
    console.log(error);
  }
};
