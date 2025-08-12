import jsonServer from 'json-server';
import jwt from 'jsonwebtoken';

const app = jsonServer.create();
const router = jsonServer.router('src/db.json');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

const MOCKED_SECRET = "your_secret_key"
app.db = router.db;
app.use(jsonServer.bodyParser);

app.post('/auth/login', (req, res) => {
    const body = req.body;
    const user = app.db.get('users').find({ email: body.email, password: body.password }).value();

    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if(user) {
        const access_token = jwt.sign({ email: body.email, sub: user.id }, MOCKED_SECRET, { expiresIn: '1h' });
        res.status(200).json({ access_token });
    }else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});

app.use(router);

app.listen(3000, () => {
    console.log('JSON Server is running on http://localhost:3000');
});
