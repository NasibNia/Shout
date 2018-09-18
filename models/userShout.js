module.exports = function(sequelize, DataTypes){
    var UserShout = sequelize.define("UserShout",{
        thumbs: {
            type: DataTypes.BOOLEAN
        },
        up: {
            type: DataTypes.INTEGER
        }
    });

    return UserShout;
};