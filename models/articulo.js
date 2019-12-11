const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from articulos order by fechaRegistro desc', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })

    });
}

const insert = ({ tipo, titulo, texto, imagen, fanzineId }, pUsuarioId) => {
    let textoGuardar = texto.replace(/\n/g, '<br>');
    return new Promise((resolve, reject) => {
        db.query('insert into articulos (tipo, titulo, texto, imagen, fanzineId, fechaRegistro, fk_usuario) values (?, ?, ?, ?, ?, ?,?)', [tipo, titulo, textoGuardar, imagen, fanzineId, new Date(), pUsuarioId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

const getArticulosByUser = (pUsuarioId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from articulos where fk_usuario = ?', [pUsuarioId], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })

    })

}

const getNumeroArticulos = (pFazineId) => {
    return new Promise((resolve, reject) => {
        db.query('select count(*) from articulos where fanzineId = ?', [pFazineId], (err, row) => {
            if (err) reject(err);
            resolve(row);
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
    insert: insert,
    getById: getById,
    deleteById: deleteById,
    getArticulosByUser: getArticulosByUser,
    getNumeroArticulos: getNumeroArticulos
}