'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Note extends Model {
      static associate(models) {
        Note.belongsTo(models.User, {
          foreignKey: "userId",
          as: "user",
        });
        Note.belongsTo(models.Notebook, {
          foreignKey: "notebookId",
          as: "notebook",
        });
      }
    };
    Note.init({
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      notebookId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      note: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [0, 1000]
        },
      },
    }, {
      sequelize,
      modelName: 'Note',
      defaultScope: {
        attributes: {
          exclude: [
            "createdAt",
            "updatedAt",
          ]
        }
      },
    });

  Note.getAll = async function () {
    return await Note.findAll();
  };
  Note.findByNotebookId = async function (notebookId) {
    return await Note.findAll({
      where: {
        notebookId
      },
    });
  };
  
  return Note;
};