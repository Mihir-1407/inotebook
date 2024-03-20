const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{

    obj={
        a: 'Mihir',
        b: 1407
    }

    res.json(obj)
})

module.exports = router