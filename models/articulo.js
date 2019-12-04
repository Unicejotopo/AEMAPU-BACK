const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from articulos order by fechaRegistro desc', (err, rows) => {
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

const insert = ({ tipo, titulo, texto, imagen, fanzineId, fechaRegistro }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into articulos (tipo, titulo, texto, imagen, fanzineId, fechaRegistro) values (?, ?, ?, ?, ?, ?)', [tipo, titulo, texto, imagen, fanzineId, new Date()], (err, result) => {
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

const deleteById = (pArticuloId) => {
    return new Promise((resolve, reject) => {
        db.query('delete from articulos where id = ?', [pArticuloId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}
module.exports = {
    getAll: getAll,
    getByFanzineId: getByFanzineId,
    insert: insert,
    getById: getById,
    deleteById: deleteById
}