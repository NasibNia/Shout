module.exports = function(sequelize , DataTypes){
    var Shout = sequelize.define("Shout" , {
        body:{
            type: DataTypes.TEXT,
            allowNull : false,
            len:{
                args : [0,200],
                msg : 'text is too long'
                }
        },
        location : DataTypes.STRING,
        owner: DataTypes.STRING,
        image : DataTypes.STRING,
    });

    Shout.associate = function(models){
        Shout.belongsToMany(models.User, {through: {model : models.UserShout}});
    };
    return Shout;
};