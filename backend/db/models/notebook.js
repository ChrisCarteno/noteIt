'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notebook = sequelize.define('Notebook', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {});

  Notebook.create = async function (userId, name) {
    const notebook = await Notebook.create({
      userId,
      name
    });
    return await Notebook.findByPk(notebook.id);
  }
  Notebook.associate = function(models) {
    // associations can be defined here
    
  };
  
  return Notebook;
};