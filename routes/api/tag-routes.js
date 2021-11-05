const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// THE "API/TAGS" ENDPOINT
// FIND ALL TAGS, BE SURE TO INCLUDE ITS ASSOCIATED PRODUCT DATA
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll(
      {
        include: {
          model: Product
        }
      });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// FIND A SINGLE TAG BY ITS "ID", BE SURE TO INCLUDE ITS ASSOCIATED PRODUCT DATA
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: {
        model: Product
      },
    });
    
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }  
});


// CREATE A NEW TAG
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body.tag_name);
    res.status(200).json(tagData);
  } catch(err) {
      res.status(400).json(err);
  }
});


// UPDATE A TAGS NAME BY ITS "ID VALUE
router.put('/:id', async (req, res) => { 
  try {
    const tagData = await Tag.update(
    {
      tag_name: req.body.tag_name
    }, 
    {
      where: {
        id: req.params.id
    },

    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this ID!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});


// DELETE ON TAG BY ITS "ID" VALUE
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this ID!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
