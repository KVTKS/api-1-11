const {connection, router} = require('../config');

//find Kehadiran
router.get('/kehadiran',  (req, res) => {
    var query = req.query;
    validation="SELECT * FROM ke as K JOIN pelajar as P on K.id_p=P.id_pelajar WHERE idj="+query.idj+" AND tarikh='"+query.date+"'";

    connection.query(validation, function (err, rows, field) {
        if (!err) {
//            console.log('rows: ', rows);
            res.json(rows);
        } else {
            throw err;
        }
    });
});

router.get('/kehadiran/kelas',  (req, res) => {
    var query = req.query;
    
    var sql = "SELECT DISTINCT kelas FROM jadual WHERE sesi="+query.id+"order by slot";

    connection.query(sql, function (err, rows, field) {
        if (!err) {
           console.log('rows: ', rows);
            res.json(rows);
        } else {
            throw err;
        }
    });
});

router.get('/kehadiran/pelajar',  (req, res) => {
    var query = req.query;

    var sql = "SELECT a.*, b.hari, b.slot,c.subjek FROM ke a INNER JOIN jadual b ON a.idj=b.idj INNER JOIN subjek c ON c.idsub=b.id_sub WHERE id_p ="+query.id;

    connection.query(sql, function (err, rows, field) {
        if (!err) {
//            console.log('rows: ', rows);
            res.json(rows);
        } else {
            throw err;
        }
    });
});

router.get('/kehadiran/pelajarBySubjek',  (req, res) => {
    var query = req.query;

    var sql = "SELECT a.*, b.id_sub, b.sesi, b.kelas, c.subjek, d.nama_pelajar FROM ke a INNER JOIN jadual b ON a.idj=b.idj INNER JOIN subjek c ON b.id_sub=c.idsub INNER JOIN pelajar d ON a.id_p=d.id_pelajar WHERE b.id_pen="+query.id;

    connection.query(sql, function (err, rows, field) {
        if (!err) {
//            console.log('rows: ', rows);
            res.json(rows);
        } else {
            throw err;
        }
    });
});

module.exports = router;