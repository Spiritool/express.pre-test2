var express = require('express');
var router = express.Router();
const Model_Users = require('../model/Model_Users');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    let id = req.session.userId;
    let Data = await Model_Users.getId(id);
    if(Data.length > 0) {
      //tambahkan kondisi pengecekan level
      if(Data[0].level_users != 1){
        res.redirect('/logout')
      }else{res.render('users/super', {
        title: 'Users Home',
        email: Data[0].email
      });
    }
    // akhir kondisi
    } else {
      res.status(401).json({ error: 'user tidak ada' })
    }
  } catch (error) {
    console.log(error)
    res.status(501).json('Butuh akses login');
  }
});

module.exports = router;
