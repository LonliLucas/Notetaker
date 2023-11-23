const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const db = require('../db/db.json');
console.log(db)

router.get('/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err)  console.error(err);
        res.json(JSON.parse(data));
    })
});


router.post('/notes', ({ body }, res) => {
    const { title, text } = body;
    const payload = {
        title,
        text,
        id: uuidv4()
    }
    const postData = [...db, payload]
    
    fs.writeFileSync('db/db.json', JSON.stringify(postData), (err, data) => {
        if (err)  console.error(err);
        res.json({data, message: "data successfully added!"});
    })
});

module.exports = router;