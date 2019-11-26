const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from articulos', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })

    });
}

const getByFanzineId = (pFanzineId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from articulos where fanzineId = ? order by fechaRegistro desc', [pFanzineId],
            (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
    })
}

const insert = ({ titulo, texto, imagen, fanzineId }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into articulos (titulo, texto, imagen, fanzineId, fechaRegistro) values (?, ?, ?, ?, ?)', [titulo, texto, imagen, fanzineId, new Date()], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })

}
const getById = (pArticuloId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from articulos where id = ?', [pArticuloId],
            (err, rows) => {
                if (err) reject(err);
                if (rows.length == 1) {
                    resolve(rows[0]);
                } else {
                    reject('Articulo no encontrado');
                }

            });
    })
}

module.exports = {
    getAll: getAll,
    getByFanzineId: getByFanzineId,
    insert: insert,
    getById: getById
}