const db = require('../models');

module.exports = function(app){
    app.post('/api/post', (req, res) => {
        db.Post.create({
            body: req.body.body,
            authorId: req.body.authorId
        }).then((result) => {
            res.json(result);
        })
    })

    //Grab all of the posts
    app.get('/api/post', (req, res) => {
        db.Post.findAll({
            order: ['createdAt', 'DESC']
        }).then((result) => {
            res.json(result);
            res.render('home', {post: result});
        })
    })

    //Delete post with id
    app.delete('/api/post/:id', (req, res) => {
        db.Post.destroy({where: {id: req.params.id}}).then((result) => {
            res.json(result);
        })
    })
}