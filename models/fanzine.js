const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM fanzines order by id desc', (err, rows) => {
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



module.exports = {

    getAll: getAll,
    getByFanzineId: getByFanzineId

};