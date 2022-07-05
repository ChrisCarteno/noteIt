'use strict';

module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
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
        }
  },{
      defaultScope: {
        attributes: {
          exclude: [ 'createdAt', 'updatedAt']
        }
      },

  });
  Notebook.associate = function(models) {
    // associations can be defined here
    Notebook.belongsTo(models.User, { foreignKey: 'userId', as: "user" });
    Notebook.hasMany(models.Note, { foreignKey: 'notebookId', onDelete: 'CASCADE' ,hooks: true});
  };
  return Notebook;
};
