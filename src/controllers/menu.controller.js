const MenuItem = require("../models/menu.model");

//insert Menu
exports.menuInsert = async function (req, res) {
  try {
    const data = req.body;
    const newPerson = new MenuItem(data);
    const response = await newPerson.save();
    res.status(200).json({ msg: "ok", data: response });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "menu item not inserted" });
  }
};

//show Menu
exports.showMenuItem = async function (req, res) {
  try {
    const data = await MenuItem.find();

    res.status(200).json({ msg: "data fetched", data: data });
  } catch (error) {
    console.log(error);
    res.status(404).json({ msg: "data not fetched" });
  }
};

//update menu
exports.updateMenuItem = async function (req, res) {
  try {
    const menuId = req.params.id;
    const data = req.body;
    const updateMenu = await MenuItem.findByIdAndUpdate(menuId, data, {
      new: true,
      runValidators: true,
    });
    if (!updateMenu) {
      res.status(404).json({ message: "menu not found" });
    }
    res.status(200).json({ message: "updated", data: updateMenu });
  } catch (error) {
    res.status(500).json({ message: "invalid credential" });
    console.log(error);
  }
};

//delete menu
exports.deleteMenuItem = async function (req, res) {
  try {
    const MenuId = req.params.id
    const deleteMenu = await MenuItem.findByIdAndDelete(MenuId)
    if(!deleteMenu){
      res.status(404).json({ message: "menu not found" });
    }
    res.status(200).json({ message: "deleted", data: deleteMenu });
  } catch (error) {
    res.status(500).json({ message: "invalid credential" });
    console.log(error);
  }
};
