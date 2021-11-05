const router = require('express').Router();
const { Category, Product } = require('../../models');

// THE "API/CATEGORIES" ENDPOINT
// FIND ALL CATEGORIES, BE SURE TO INCLUDE ITS ASSOCIATED PRODUCTS

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: {
        model: Product,
        attributes: ['product_name']
      }
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// FIND ONE CATEGORY BY ITS "ID, BE SURE TO INCLUDE ITS ASSOCIATED PRODUCTS
router.get('/:id', async (req, res) => {
    try {
    const categoryData = await Category.findOne({ 
      where: {
        id: req.params.id
      },
      include: {
        model: Product,
        attributes: ['category_id']
      }
  });
      if (!categoryData) {
        res.status(404).json({ message: 'No category found with this ID!' });
        return;
      }
  
      res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

// CREATE A NEW CATEGORY
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.id.params
  });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});






// UPDATE A CATEGORY BY ITS "ID" VALUE
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.update(
      {
        category_name: req.body.category_name

      },
    {
      where: {
        id: req.params.id
      }
    })

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this ID!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

}
);

// DELETE A CATEGORY BY ITS "ID" VALUE
router.delete('/:id', async (req, res) => {
  try {   
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this ID!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }


});

module.exports = router;
