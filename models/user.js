const bcrypt = require('bcryptjs');

module.exports = function(sequelize, dataTypes) {
    const User = sequelize.define("User", {
        username: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1, 30],
                notContains: ' ',
            }
        },
        password: {
            type: dataTypes.STRING
        },
        email: {
            type: dataTypes.STRING,
            isEmail: true,
            unique: true
        },
        bio: {
            type: dataTypes.STRING,
            validate: {
                len: [1, 200]
            }
        },
        profilePic: {
            type: dataTypes.STRING,
            defaultValue: "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
        }
    })

    User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
    }

    User.addHook('beforeCreate', (user) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    })

    return User;
}