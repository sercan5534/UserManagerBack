module.exports = function(sequelize,DataTypes){
    return sequelize.define('Users2Group',{
        id:{ type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
        groupId: {
            type: DataTypes.INTEGER,
            references:{
                model: Groups,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            references:{
                model: Users,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            }
        }
    }, {
        indexes: [
            {
                unique: true, fields: ['email']
            }
        ]
    });
};
