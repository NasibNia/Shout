module.exports = function(sequelize, DataTypes){
    var User = sequelize.define("User",{
        name : {
            type: DataTypes.STRING
        },
        email: {
            type : DataTypes.STRING
        },
        imgUrl : DataTypes.STRING,
    });

    User.associate = (models) => {
        User.belongsToMany(models.Shout, {through : {model: models.UserShout}});
    };
    return User;
};

