module.exports=function(sequelize, Sequelize)
{
    var Ingredient = sequelize.define('Ingredients', {
    name: {
        type: Sequelize.STRING,
        field: 'name'
        
    },
      description: {
        type: Sequelize.STRING,
        field: 'description',
        
    },
     url: {
        type: Sequelize.STRING,
        field: 'url'
    }
}, {
    timestamps: false,
    tableName: 'Ingredients'
});

return Ingredient;
};
