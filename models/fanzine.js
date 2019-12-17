const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM fanzines WHERE activo = 0 order by id desc', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })
    });
};

const getByFanzineId = (pFanzineId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from articulos where fanzineId = ? order by fechaRegistro desc', [pFanzineId],
            (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
    })
}

const numeroArticulos = () => {
    return new Promise((resolve, reject) => {
        db.query('select numeroArticulos as numArtiTotal from fanzines where activo = 1', (err, row) => {
            if (err) reject(err);
            resolve(row[0]);
        })
    })

}

const fanzineActivo = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * from fanzines where activo = 1', (err, row) => {
            if (err) reject(err);
            resolve(row[0]);
        })
    })
}



module.exports = {

    getAll: getAll,
    getByFanzineId: getByFanzineId,
    numeroArticulos: numeroArticulos,
    fanzineActivo: fanzineActivo

};