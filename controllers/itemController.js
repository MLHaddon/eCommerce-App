import Items from '../models/itemsModel.js';


// Get all items
export const AllItems = async(req, res) => {
  try {
    const allItems = await Items.findAll({
      attributes: ['id', 'name', 'price', 'picture', 'description', 'more']
    });
    res.json(allItems);
  } catch (err) {
    console.log(err);
  }
}

// Get one item
export const OneItem = async(req, res) => {
  try {
    const item = await Items.findAll({
      where: {
        id: req.item.id
      }
    });
    res.json(item);
  } catch (err) {
    console.log(err);
  }
}

// Register new item (through admin panel)
export const RegisterItem = async( req, res) => {
  try {
    Items.create({
      id: id,
      name: name,
      price:price,
      picture:picture,
      description:description
    })
  } catch (err) {
    console.log(err);
  }
}

// Delete an item
export const DeleteItem = async(req, res) => {
  try {
    Items.delete({
      where: {
        id: req.item.id
      }
    });
  } catch (err) {
    console.log(err);
  }
}