const { UserGame } = require('./models');

module.exports = (app) => {
    // READ ALL USER
    app.get('/user-games', (req, res) => {
        UserGame.findAll()
        .then(UserGame => {
            res.status(200).json(UserGame)
        }).catch((err) => {
            res.status(500).json({
                status: '500',
                message: err
            });
        });
    });

    // CREATE USER
    app.post('/user-games', (req, res) => {
        UserGame.create({
            userName: req.body.username,
            password: req.body.password,
            email: req.body.email,
            gender: req.body.gender
        }).then((created) => {
            res.status(201).json(created)
        }).catch((err) => {
            res.status(500).json({
                status: '500',
                message: err
            });
        })
    })

    // READ USER BY ID
    app.get('/user-games/:id', (req, res) => {
        UserGame.findByPk(req.params.id)
        .then((read) => {
            res.status(200).json(read)
        }).catch((err) => {
            res.status(500).json({
                status: '500',
                message: err
            })
        })
    })

    // UPDATE USER
    app.put('/user-games/:id', (req, res) => {
        UserGame.update({
            userName: req.body.username,
            password: req.body.password,
            email: req.body.email,
            gender: req.body.gender
        }, {
            where: {
                id: req.params.id
            }
        }).then((updates) => res.status(200).json(updates))
        .catch((err) => {
            res.status(422).json({
                status: '422',
                message: "Can't update user games"
            })
        })
    })

    // DELETE USER
    app.delete('/user-games/:id', (req, res) => {
        UserGame.destroy({
            where: {
                id: req.params.id
            }
        }).then((deleted) => {
            res.status(200).json({
                status: 200,
                message: 'User successfully deleted.'
            })
        })
        .catch((err) => {
            res.status(500).json({
                status: 500,
                message: err
            })
        })
    })

    return app;
};