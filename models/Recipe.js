module.exports=function (sequelize, Sequelize) {
   var Recipe=sequelize.define('Recipes',{
          name: {
            type: Sequelize.STRING,
            field: 'name'
        },
        description: {
            type: Sequelize.STRING,
            field: 'descriptionRec'
        },
        difficulty: {
            type:Sequelize.STRING,
            field:'difficulty'
        }

    }, {
        timestamps: false
   });
   return Recipe;
};