module.exports = function(sequelize, Sequelize) {

    var Link = sequelize.define('Links', {
        
    }, {
        timestamps: false
    });
    
    return Link;
};
