/*
 * @router: To handle routes pointing to /spotify
 * @desc: to automate token reload and refresh
 */

require('dotenv').config();
const express = require('express');

// load logger
const logger = require('./../bin/logger/logger');

// load tracks schema from database
const Tracks = require('./../bin/database/track.schema');

// create instance of Router
const router = express.Router();

// Nothing Much to handle on homepage
router.get('/', (req, res) => {
  res.json(req.query);
});

router.post('/delete', (req, res)=>{
  if(!req.body.id){
    return res.json({
      error: true,
      message: 'post body should contain id'
    });
  }
    // now be thanos and delete
    Tracks.deleteOne({
      id: req.body.id
    }, (err)=>{
      if(err){
        return res.json({
          error: true,
          payload: err
        });
      }else{
        logger.error(`Deleting Track ${req.body.id}`);
        return res.json({
          error: false,
          message: "song deleted"
        });
      }
    });
});

// export everything !
module.exports = router;
