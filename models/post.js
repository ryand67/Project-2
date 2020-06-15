module.exports = function(sequelize, dataTypes) {
    const Post = sequelize.define('Post', {
        body: {
            type: dataTypes.STRING
        },
        likes: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        }
    })

    Post.associate = function(models){
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }

    return Post;
}