module.exports = function(sequelize , DataTypes){
    var Shout = sequelize.define("Shout" , {
        body:{
            type: DataTypes.TEXT,
            allowNull : false,
            len:{
                args : [0,200],
                msg : 'Name is too long'
                }
        },
        // count : DataTypes.INTEGER,
        // status :{
        //     type : DataTypes.BOOLEAN ,
        //     defaultValue : false
        // },
        // location : DataTypes.STRING
        owner: DataTypes.STRING


    });

    Shout.associate = function(models){
        Shout.belongsToMany(models.User, {through: {model : models.UserShout}});
    };
    return Shout;
};