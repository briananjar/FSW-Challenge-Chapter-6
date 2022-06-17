const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const routes = require('./routes')(router, {});
const path = require('path');
const port = 3000;
const { UserGame, UserGameBiodata, UserGameHistory } = require('./models');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"));

/**
 * API
 * 
 */
app.use('/api', routes);

/**
 * URL PAGES
 * 
 */
// Login Page
app.get('/', (req, res) => {
    res.render('pages/login');
});

// Dashboard Page
app.get('/dashboard', (req, res) => {
    res.render('pages/dashboard', {
        page_name: 'dashboard'
    });
});

// Users Page
app.get('/users', async (req, res) => {
    const users = await UserGame.findAll();

    res.render('pages/users/view', {
        page_name: 'users',
        users: users
    });
});

app.get('/users/show/:id', async (req, res) => {
    const user = await UserGame.findByPk(req.params.id);

    res.render('pages/users/detail', {
        page_name: 'userUpdate',
        id: user.id,
        username: user.userName,
        password: user.password,
        email: user.email,
        gender: user.gender
    });
})

app.get('/users/create', async (req, res) => {
    res.render('pages/users/create', {
        page_name: 'userCreate'
    });
});

app.post('/users/create', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const gender = req.body.gender;

    const user = UserGame.create({
        userName: username,
        password: password,
        email: email,
        gender: gender
    }).then(() => {
        res.redirect('/users');
    }).catch((err) => {
        console.log(err);
    });
});

app.get('/users/update/:id', async (req, res) => {
    const user = await UserGame.findByPk(req.params.id);

    res.render('pages/users/update', {
        page_name: 'userUpdate',
        id: user.id,
        username: user.userName,
        email: user.email,
        gender: user.gender
    });
});

app.post('/users/edit/:id', (req, res) => {
    const id = req.params.id;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const gender = req.body.gender;

    const user = UserGame.update({
        userName: username,
        password: password,
        email: email,
        gender: gender
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/users');
    }).catch((err) => {
        console.log(err);
    });
});

app.get('/users/delete/:id', (req, res) => {
    UserGame.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/users');
    }).catch((err) => {
        console.log(err);
    });
});

// Biodata Page
app.get('/biodata', async (req, res) => {
    const biodata = await UserGameBiodata.findAll();

    res.render('pages/biodata/view', {
        page_name: 'biodata',
        biodata: biodata
    });
});

app.get('/biodata/show/:id', async (req, res) => {
    const biodata = await UserGameBiodata.findByPk(req.params.id);

    res.render('pages/biodata/detail', {
        page_name: 'biodataUpdate',
        id: biodata.id,
        fullName: biodata.fullName,
        address: biodata.address,
        phoneNumber: biodata.phoneNumber,
        hobby: biodata.hobby
    });
})

app.get('/biodata/create', async (req, res) => {
    res.render('pages/biodata/create', {
        page_name: 'biodataCreate'
    });
});

app.post('/biodata/create', (req, res) => {
    const fullName = req.body.fullName;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    const hobby = req.body.hobby;

    const biodata = UserGameBiodata.create({
        fullName: fullName,
        address: address,
        phoneNumber: phoneNumber,
        hobby: hobby
    }).then(() => {
        res.redirect('/biodata');
    }).catch((err) => {
        console.log(err);
    });
});

app.get('/biodata/update/:id', async (req, res) => {
    const biodata = await UserGameBiodata.findByPk(req.params.id);

    res.render('pages/biodata/update', {
        page_name: 'biodataUpdate',
        id: biodata.id,
        fullName: biodata.fullName,
        address: biodata.address,
        phoneNumber: biodata.phoneNumber,
        hobby: biodata.hobby
    });
});

app.post('/biodata/edit/:id', (req, res) => {
    const id = req.params.id;
    const fullName = req.body.fullName;
    const password = req.body.password;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    const hobby = req.body.hobby;

    const biodata = UserGameBiodata.update({
        fullName: fullName,
        password: password,
        address: address,
        phoneNumber: phoneNumber,
        hobby: hobby
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/biodata');
    }).catch((err) => {
        console.log(err);
    });
});

app.get('/biodata/delete/:id', (req, res) => {
    UserGameBiodata.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/biodata');
    }).catch((err) => {
        console.log(err);
    });
});

// History Page
app.get('/history', async (req, res) => {
    const history = await UserGameHistory.findAll();

    res.render('pages/history/view', {
        page_name: 'history',
        history: history
    });
});

app.get('/history/show/:id', async (req, res) => {
    const history = await UserGameHistory.findByPk(req.params.id);

    res.render('pages/history/detail', {
        page_name: 'historyUpdate',
        id: history.id,
        playingDuration: history.playingDuration,
        levelUser: history.levelUser,
        score: history.score
    });
})

app.get('/history/create', async (req, res) => {
    res.render('pages/history/create', {
        page_name: 'historyCreate'
    });
});

app.post('/history/create', (req, res) => {
    const playingDuration = req.body.playingDuration;
    const levelUser = req.body.levelUser;
    const score = req.body.score;

    const history = UserGameHistory.create({
        playingDuration: playingDuration,
        levelUser: levelUser,
        score: score
    }).then(() => {
        res.redirect('/history');
    }).catch((err) => {
        console.log(err);
    });
});

app.get('/history/update/:id', async (req, res) => {
    const history = await UserGameHistory.findByPk(req.params.id);

    res.render('pages/history/update', {
        page_name: 'historyUpdate',
        id: history.id,
        playingDuration: history.playingDuration,
        levelUser: history.levelUser,
        score: history.score
    });
});

app.post('/history/edit/:id', (req, res) => {
    const id = req.params.id;
    const playingDuration = req.body.playingDuration;
    const levelUser = req.body.levelUser;
    const score = req.body.score;

    const history = UserGameHistory.update({
        playingDuration: playingDuration,
        levelUser: levelUser,
        score: score
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect('/history');
    }).catch((err) => {
        console.log(err);
    });
});

app.get('/history/delete/:id', (req, res) => {
    UserGameHistory.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.redirect('/history');
    }).catch((err) => {
        console.log(err);
    });
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
})