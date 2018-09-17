module.exports = function(sequelize , DataTypes){
    var Shout = sequelize.define("Shout" , {
        body:{
            type: DataTypes.TEXT,
            allowNull : false,
            len:{
                args : [0,200],
                msg : 'Name is too long'
                }
        }
    });

    Shout.associate = function(models){
        Shout.belongsToMany(models.User, {through: {model : models.UserShout}});
    };
    return Shout;
};