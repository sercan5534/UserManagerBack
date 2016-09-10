module.exports = function(sequelize,DataTypes){
    return sequelize.define('Groups',{
        id:{ type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        name: DataTypes.STRING,
        description: DataTypes.STRING
    });
};