const {connection, router} = require('../config');

//find SUbjek
router.get('/subjek',  (req, res) => {
    var sql = "SELECT * FROM subjek";

    connection.query(sql, function (err, rows, field) {
        if (!err) {
//            console.log('rows: ', rows);
            res.json(rows);
        } else {
            throw err;
        }
    });
});
//subjek by pengajar
router.get('/subjek/pengajar',  (req, res) => {
    var sql = "SELECT  DISTINCT b.subjek, b.idsub FROM jadual a INNER JOIN subjek b ON a.id_sub-b.idsub WHERE a.id_pen="+req.query.id+" GROUP BY b.idsub";

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