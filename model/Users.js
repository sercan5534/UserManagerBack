module.exports = function(sequelize,DataTypes){
    return sequelize.define('Users',{
        id:{ type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        description: DataTypes.STRING
    }, {
        indexes: [
            {
                unique: true, fields: ['email']
            }
        ]
    });
};