import express from "express";
const app = express();
const port = 8000;
import bodyParser from "body-parser";
import pg from "pg";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "blogDB",
    password: "F3rd1n4ndP0rch3",
    port: 5442,
    });
    
    db.connect();

app.post("/signup", async (req, res) => {
    const namesignup = req.body.nameu;
    const passwordsignup = req.body.passu;
    const idsignup = req.body.idu;

    try {
        const check = await db.query('SELECT * FROM users WHERE user_id = $1', [idsignup]);
        if (check.rows.length > 0) {
            console.log(`Look at this guy ${namesignup}, who thinks he can steal some primary keys`);
            return res.json({error: "This user_ID is already occupied! GET YOUR OWN"});
        }
        await db.query('INSERT INTO users (name, password, user_id) VALUES ($1, $2, $3)',
            [namesignup, passwordsignup, idsignup]);
            res.json({message: "New User added"});
            console.log(`Welcome ${namesignup}, you are now cast into eternal apathy`);
    } catch (err) {
        console.error("NOTHING TO SEE HERE, MOVE ON");
        return res.json({error: "Stop making the website explode >:("});
    }
});

app.post("/signin", async (req, res) => {
    const idcheck = req.body.idi;
    const passwordcheck = req.body.passi;

    try {
        const check = await db.query('SELECT * FROM users WHERE user_id = $1 AND password = $2',
             [idcheck, passwordcheck]);
        if (check.rows.length === 0) {
            return res.json({error: "Ye got yer id 'r pw wrong th're, matey"});
        }
        console.log("Welcome back... Or rather, did you think you could ever leave? ha...hahaha...HAHAHAHAHAHAAAAAAHAHA");
        res.json({message: "We have a leak!"});
    } catch (err) {
        console.error("NOTHING TO SEE HERE, MOVE ON");
        return res.json({error: "Stop making the website explode >:("});
    }
});

app.get("/posts", (req, res) => {
    try {
        db.query('SELECT * FROM blogs', (err, blogs) => {
            const postedblogs = blogs.rows;
            res.json({postedblogs});
        });
    } catch (err) {
        ("Stop trying to make the website explode >:(", err)
    }
});

app.post("/pblog", (req, res) => {
    const blogtitle = req.body.blogT;
    const blogname = req.body.blogN;
    const blogcontent = req.body.blogC;
    const postedtime = new Date();

    db.query('INSERT INTO blogs (creator_name, title, body, date_created) VALUES ($1, $2, $3, $4)',
        [blogname, blogtitle, blogcontent, postedtime],
        () => {
            res.json({message: "More slop added"});
        }
    );
});

app.post("/edit", (req, res) => {
    const PID = req.body.id;
    const blogtitle = req.body.blogT;
    const blogname = req.body.blogN;
    const blogcontent = req.body.blogC;
    db.query('UPDATE blogs SET title = $1, creator_name = $2, body = $3 WHERE blog_id = $4',
        [blogtitle, blogname, blogcontent, PID]
    );
    res.json({message: "Post edited"});
});

app.post("/del", (req, res) => {
    const PID = req.body.id;
    db.query('DELETE FROM blogs WHERE blog_id = $1',
        [PID]
    );
    res.json({message: "Post nuked"});
});

app.listen(port, () => {
    console.log(`We're live on port ${port}`);
});