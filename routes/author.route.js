const express = require("express");
const router = express.Router();

const Author = require('../models/author.model');

router.get('/api/author', async(req, res, next) => {
    let authorList;
    try{
        authorList = await Author.find({});
        res.json({ authors: authorList });
    }catch(error){
        throw new Error('Not find any author!')
    }

    res.json({ authors: authorList });
});

router.post('/api/author', async(req, res, next) => {
    
}
)

module.exports = router;