const {connection, router} = require('../config');

//find SUbjek
router.get('/jadual',  (req, res) => {
    var query = req.query;
    
    var sql = "SELECT a.*,b.subjek, c.bahagian AS bhg FROM jadual a INNER JOIN subjek b ON a.id_sub=b.idsub INNER JOIN bahagian c ON a.bahagian=c.id WHERE a.id_pen="+query.id;

    connection.query(sql, function (err, rows, field) {
        if (!err) {
           console.log('rows: ', rows);
            res.json(rows);
        } else {
            throw err;
        }
    });
});

router.get('/jadualKelas',  (req, res) => {
    var query = req.query;
    
    var sql = "SELECT DISTINCT kelas FROM jadual WHERE sesi="+query.id;

    connection.query(sql, function (err, rows, field) {
        if (!err) {
           console.log('rows: ', rows);
            res.json(rows);
        } else {
            throw err;
        }
    });
});

router.get('/jadualHari',  (req, res) => {
    var query = req.query;
    
    var sql = "SELECT DISTINCT hari FROM jadual WHERE sesi="+query.sesi+" AND kelas="+query.kelas;

    connection.query(sql, function (err, rows, field) {
        if (!err) {
           console.log('rows: ', rows);
            res.json(rows);
        } else {
            throw err;
        }
    });
});

router.get('/jadualSlot',  (req, res) => {
    var query = req.query;
    
    var sql = "SELECT * from jadual WHERE bahagian="+query.bahagian+" AND id_pen="+query.id_pen+ " AND hari='"+query.hari+"'";
    
    connection.query(sql, function (err, rows, field) {
        if (!err) {
           console.log('rows: ', rows);
            res.json(rows);
        } else {
            throw err;
        }
    });
});

router.get('/jadualPelajar',  (req, res) => {
    var query = req.query;
    
    var sql = "SELECT * from pelajar WHERE bahagian="+query.bahagian+ " AND kelas="+query.kelas+ " AND sesi="+query.sesi;

    connection.query(sql, function (err, rows, field) {
        if (!err) {
           console.log('rows: ', rows);
            res.json(rows);
        } else {
            throw err;
        }
    });
});

router.get('/getJadualID',  (req, res) => {
    var query = req.query;
    // "SELECT idj,id_pen FROM jadual  WHERE sesi=1 AND kelas=1 AND HARI='ISNIN' AND slot=1"
    var sql = "SELECT idj FROM jadual WHERE sesi="+query.sesi+ " AND kelas="+query.kelas+" AND slot="+query.slot+" AND hari='"+query.hari+"'";

    connection.query(sql, function (err, rows, field) {
        if (!err) {
           console.log('rows: ', rows);
            res.json(rows);
        } else {
            throw err;
        }
    });
});

router.get('/IDSUB',  (req, res) => {
    var query = req.query;
    // "SELECT idj,id_pen FROM jadual  WHERE sesi=1 AND kelas=1 AND HARI='ISNIN' AND slot=1"
    var sql = "SELECT id_sub FROM subjek WHERE subjek="+query.subjek+ " AND kod="+query.kod;

    connection.query(sql, function (err, rows, field) {
        if (!err) {
           console.log('rows: ', rows);
            res.json(rows);
        } else {
            throw err;
        }
    });
});


router.post("/saveKehadiran", function(req, res) {
    console.log('reqqqqq', req.body[0].date);
    res.json(req.body);
    myArray=req.body;
    idj = req.body[0].idj
    date = req.body[0].date;

    validation="SELECT * FROM ke as K JOIN pelajar as P on K.id_p=P.id_pelajar WHERE idj="+idj+" AND tarikh='"+date+"'";

    connection.query(validation, function (err, rows, field) {
        if (!err) {
            if (rows.length == 0){
                console.log('insert ');
                myArray.forEach(function(value){
                   
                        var sql = "INSERT INTO ke (idj, id_p, kehadiran, tarikh ) VALUES ('" + value.idj + "', '" + value.id_pelajar + "', '"+value.kehadiran+"', '" + value.date + "')";
                        connection.query(sql, function (err, rows, field) {
                            if (!err) {
                                
                            } else {
                                throw err;
                            }
                        });
                    
                    console.log(value);
                    
                });
            }
            else {
                console.log('update data ');
                myArray.forEach(function(value){
                    
                        var sql = " UPDATE ke SET kehadiran='"+value.kehadiran+"' where id_p='"+ value.id_pelajar +"' AND tarikh='" + value.date + "'";
                        
                        connection.query(sql, function (err, rows, field) {
                            if (!err) {
                                
                            } else {
                                throw err;
                            }
                        });
                
                    console.log(value);
                    
                });
            }
        } else {
            throw err;
        }
    });
   
  });

module.exports = router;