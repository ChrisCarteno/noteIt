'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notebook extends Model {
    static associate(models) {
      Notebook.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",

      });
      Notebook.hasMany(models.Note, {
        foreignKey: "NotebookId",
        onDelete: 'CASCADE',
        hooks: true,
      });
    }
  };

  Notebook.init({
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [0, 80],
      },
    },
  }, {
    sequelize,
    modelName: 'Notebook',
    defaultScope: {
      attributes: {
        exclude: [
          "createdAt",
          "updatedAt",
        ]
      }
    },
  });
  
  return Notebook;
};