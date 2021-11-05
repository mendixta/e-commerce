const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// GET ALL PRODUCTS
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
  const productData = await Product.findAll({
    include: [
      {
        model: Category,
        attributes: ['category_name']
      },
      {
        model: Tag,
        attributes: ['tag_name']
      }
    ]
  });
  if (!productData) {
    res.status(404).json({ message: 'No product found with this ID!' });
    return;
  }

  res.status(200).json(productData);
} catch (err) {
  res.status(500).json(err);
}  

});

// GET ONE PRODUCT
router.get('/:id', async (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
    try {
      const productData = await Product.findOne({
        where: {
          id: req.params.id

        },
        include: [{
          model: Category,
          attributes: ["category_name"]
        },
        {
        model: Tag,
        attributes: ["tag_name"]
        },
      ]
    });
    if (!productData) {
      res.status(404).json({ message: 'No product found with this id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }  
  
});

// CREATE NEW PRODUCT
/* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
router.post('/', async (req, res) => {

  Product.create(req.body)
    .then((product) => {
      // IF THERE'S PRODUCT TAGS, WE NEED TO CREATE PAIRINGS TO BULK CREATE IN THE PRODUCT TAG MODEL
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // IF NO PRODUCT TAGS, JUST RESPOND
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// UPDATE PRODUCT
router.put('/:id', (req, res) => {
  // UPDATE PRODUCT DATA
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // FIND ALL ASSOCIATED TAGS FROM PRODUCT-TAG
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // GET LIST OF CURRENT TAG_IDS
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // CREATE FILTERED LIST OF NEW TAG_IDS
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // FIGURE OUT WHICH ONES TO REMOVE
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // RUN BOTH ACTIONS
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // CONSOLE.LOG (ERR)
      res.status(400).json(err);
    });
});



// DELETE ONE PRODUCT BY ITS "ID" VALUE
router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(productData => {
      if (!productData) {
        res.status(404).json({ message: 'No Product found with that ID!' });
        return;
      }
      res.json(productData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

module.exports = router;
