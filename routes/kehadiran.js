const {connection, router} = require('../config');

//find Kehadiran
router.get('/kehadiran',  (req, res) => {
    var sql = "SELECT * FROM kehadiran";

    connection.query(sql, function (err, rows, field) {
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

module.exports = router;