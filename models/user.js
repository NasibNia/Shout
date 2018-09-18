// var db = require("./index.js");
var bcrypt = require ('bcrypt-nodejs');
module.exports = function(sequelize, DataTypes){
    var User = sequelize.define("User",{
        name : {
            type: DataTypes.STRING,
            // allowNull: false,
            // unique: true,
            // validate: {
            //     len:{
            //         args : [0,10],
            //         msg : 'Name is too long'
            //         },
            //     // isUnique: db.validateIsUnique(
            //     //     'name',
            //     //     'This name address already exists!'
            //     //     )
            // }
        },
        email: {
            type : DataTypes.STRING,
            // validate : {
            //     len: {
            //         args: [5,10],
            //         msg : "password should be less than be bewtween 5 & 10 in length"
            //     },
            //     isAlphanumeric: {
            //         args: true,
            //         msg : 'password should contain only numbers and alphabets'
            //     }
            // }
        }
    //     {
    //     instanceMethods: {
    //       generateHash: function (password) {
    //         return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    //       },
    //       validPassword: function (password) {
    //         return bcrypt.compareSync(password, this.password);
    //       }
    //     }
    // }
    });

    User.associate = (models) => {
        User.belongsToMany(models.Shout, {through : {model: models.UserShout}});
    };
    return User;
};

