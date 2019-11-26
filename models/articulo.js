const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from articulos', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })

    });
}

const getByFanzineId = (pArticuloId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from articulos where fanzineId = ?', [pArticuloId],
            (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            });
    })
}

const insert = ({ titulo, texto, imagen, fanzineId }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into articulos (titulo, texto, imagen, fanzineId) values (?, ?, ?, ?)', [titulo, texto, imagen, fanzineId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })

}

module.exports = {
    getAll: getAll,
    getByFanzineId: getByFanzineId,
    insert: insert
}