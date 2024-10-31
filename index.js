import express from "express";
const app = express();
const port = 3000;
import bodyParser from "body-parser";
import pg from "pg";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/create", (req, res) => {
    res.render("create.ejs");
});

app.get("/signup", (req, res) => {
    res.render("signup.ejs", {error: null});
});

app.get("/signin", (req, res) => {
    res.render("signin.ejs", {error: null});
});

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
            return res.render("signup.ejs", {error: "This user_ID is already occupied! GET YOUR OWN"});
        }
        await db.query('INSERT INTO users (name, password, user_id) VALUES ($1, $2, $3)',
            [namesignup, passwordsignup, idsignup]);
            res.redirect("/signin");
            console.log(`Welcome ${namesignup}, you are now cast into eternal apathy`);
    } catch (err) {
        console.error("NOTHING TO SEE HERE, MOVE ON");
        return res.render("signup.ejs", {error: "Stop making the website explode >:("});
    }
});



app.post("/signin", async (req, res) => {
    const idcheck = req.body.idi;
    const passwordcheck = req.body.passi;

    try {
        const check = await db.query('SELECT * FROM users WHERE user_id = $1 AND password = $2',
             [idcheck, passwordcheck]);
        if (check.rows.length === 0) {
            return res.render("signin.ejs", {error: "Ye got yer id 'r pw wrong th're, matey"});
        }
        console.log("Welcome back... Or rather, did you think you could ever leave? ha...hahaha...HAHAHAHAHAHAAAAAAHAHA");
        res.redirect("/");
    } catch (err) {
        console.error("NOTHING TO SEE HERE, MOVE ON");
        return res.render("signin.ejs", {error: "Stop making the website explode >:("});
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
            res.redirect("/");
        }
    );
});

app.get("/", (req, res) => {
    db.query('SELECT * FROM blogs', (err, blogs) => {
        const postedblogs = blogs.rows;
        res.render("index.ejs", {postedblogs});
    });
});

app.post("/edit", (req, res) => {
    const PID = req.body.id;
    const blogtitle = req.body.blogT;
    const blogname = req.body.blogN;
    const blogcontent = req.body.blogC;
    db.query('UPDATE blogs SET title = $1, creator_name = $2, body = $3 WHERE blog_id = $4',
        [blogtitle, blogname, blogcontent, PID]
    );
    res.redirect("/");
});

app.post("/del", (req, res) => {
    const PID = req.body.id;
    db.query('DELETE FROM blogs WHERE blog_id = $1',
        [PID]
    );
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Check me out mom, I am on port ${port}`);
});
