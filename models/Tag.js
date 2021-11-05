const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}


// DEFINE COLUMNS
Tag.init(
  {
    // TAG ID
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    // TAG-NAME
    tag_name: {
      type: DataTypes.STRING,
    }
  },

  // SEQUELIZE
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
