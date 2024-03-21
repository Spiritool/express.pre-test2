var express = require('express');
var router = express.Router();
var connection = require('../config/database.js');
const Model_kapal = require('../model/Model_Kapal.js');
const Model_Pemilik = require('../model/Model_Pemilik.js');
const Model_DPI = require('../model/Model_DPI.js');
const Model_Alat_Tangkap = require('../model/Model_Alat_Tangkap.js');

router.get('/', async function (req, res, next) {
    let rows = await Model_kapal.getAll();
    res.render('kapal/index', {
        data: rows
    });
});

router.get('/create', async function (req, res, next) {
    let rows = await Model_Pemilik.getAll();
    let rows2 = await Model_DPI.getAll();
    let rows3 = await Model_Alat_Tangkap.getAll();
    res.render('kapal/create', {
        nama_kapal: '',
        id_pemilik: '',
        id_dpi: '',
        id_alat_tangkap: '',
        data_pemilik: rows,
        data_dpi: rows2,
        data_alat: rows3,
    })
})

router.post('/store', async function (req, res, next) {
    try {
        let { nama_kapal, id_pemilik, id_dpi, id_alat_tangkap } = req.body;
        let Data = {
            nama_kapal,
            id_pemilik,
            id_dpi, 
            id_alat_tangkap
        }
        await Model_kapal.Store(Data);
        req.flash('success', 'Berhasil menyimpan data');
        res.redirect('/kapal');
    } catch {
        req.flash('error', 'Terjadi kesalahan pada fungsi')
        res.redirect('/kapal')
    }
})

router.get('/edit/(:id)', async function (req, res, next) {
    let id = req.params.id;
    let rows1 = await Model_Pemilik.getAll();
    let rows2 = await Model_DPI.getAll();
    let rows3 = await Model_Alat_Tangkap.getAll();
    let rows = await Model_kapal.getId(id);
    res.render('kapal/edit', {
        id: rows[0].id_kapal,
        nama_kapal: rows[0].nama_kapal,
        id_dpi: rows[0].id_dpi,
        id_pemilik: rows[0].id_pemilik,
        id_alat_tangkap: rows[0].id_alat_tangkap,
        data_pemilik: rows1,
        data_dpi: rows2,
        data_alat: rows3,
    })
})



router.post('/update/(:id)', async function (req, res, next) {
    try {
        let id = req.params.id;
        let { nama_kapal, id_dpi, id_pemilik, id_alat_tangkap } = req.body;
        let Data = {
            nama_kapal: nama_kapal,
            id_dpi: id_dpi,
            id_pemilik: id_pemilik,
            id_alat_tangkap: id_alat_tangkap,
        }
        await Model_kapal.Update(id, Data);
        req.flash('success', 'Berhasil mengubah data');
        res.redirect('/kapal')
    } catch {
        req.flash('error', 'terjadi kesalahan pada fungsi');
        res.redirect('/kapal');
    }
})

router.get('/delete/(:id)', async function (req, res) {
    let id = req.params.id;
    await Model_kapal.Delete(id);
    req.flash('success', 'Berhasil menghapus data');
    res.redirect('/kapal')
})

module.exports = router;