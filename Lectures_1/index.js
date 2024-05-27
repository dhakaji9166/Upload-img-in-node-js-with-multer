const path = require("path");
const express = require("express");
const multer = require('multer');

const app = express();
const port = 8080;

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`); // Use originalname
    }
});

const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    return res.render("homepage");
});

app.post("/upload", upload.single('profileImage'), (req, res) => {
    console.log("Form data:", req.body); 
    console.log("File data:", req.file); 
    return res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is started now on port ${port}`);
});
