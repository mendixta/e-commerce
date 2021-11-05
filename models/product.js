// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
const { Category } = require('.');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
     // PRODUCT ID
     id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

      // PRODUCT NAME
      product_name: {
        type: DataTypes.STRING,
        allowNull: false
      },

      // PRICE
      price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true
      }
    },

    // STOCK 
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true
      }
    },

    // CATEGORY_ID
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id', 
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
