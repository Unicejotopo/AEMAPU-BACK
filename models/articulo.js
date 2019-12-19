const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from articulos order by fechaRegistro desc', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })

    });
}

const insert = ({ tipo, titulo, texto, imagen }, pUsuarioId) => {
    // console.log('leo:', texto);
    // let textoGuardar = texto.replace(/\n/g, '<br>');
    console.log(tipo, titulo, texto, imagen);
    return new Promise((resolve, reject) => {
        db.query('insert into articulos (tipo, titulo, texto, imagen, fanzineId, fechaRegistro, fk_usuario) values (?, ?, ?, ?, (select id from fanzines where activo = 1), ?, ?)', [tipo, titulo, texto, imagen, new Date(), pUsuarioId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

const getArticulosByUser = (pUsuarioId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from articulos where fk_usuario = ? order by fechaRegistro desc', [pUsuarioId], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })

    })

}

const getNumeroArticulos = (pUsuarioId) => {
    return new Promise((resolve, reject) => {
        db.query('select count(*) as numArticulos from articulos where fanzineId = (select id from fanzines where activo = 1) and fk_usuario = ?', [pUsuarioId], (err, row) => {
            if (err) reject(err);
            resolve(row[0]);
        })
    })

}


const getById = (pArticuloId) => {
    return new Promise((resolve, reject) => {
        db.query('select art.*, usu.nombre, usu.apellidos, usu.email from articulos art, usuarios usu where art.fk_usuario = usu.id and art.id = ?', [pArticuloId],
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
        db.query('delete from articulos WHERE fanzineId = (select id from fanzines where activo = 1)  AND articulos.id = ?', [pArticuloId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}
const deleteByIdAdmin = (pArticuloId) => {
    return new Promise((resolve, reject) => {
        db.query('delete from articulos WHERE articulos.id = ?', [pArticuloId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
}

const getArticulosByTipo = (pFanzineId, pTipo) => {
    // console.log('Tipo:', pTipo);
    return new Promise((resolve, reject) => {
        db.query('select * from articulos where fanzineId = ? and tipo = ?', [pFanzineId, pTipo,], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })
    })
}

module.exports = {
    getAll: getAll,
    insert: insert,
    getById: getById,
    deleteById: deleteById,
    deleteByIdAdmin: deleteByIdAdmin,
    getArticulosByUser: getArticulosByUser,
    getNumeroArticulos: getNumeroArticulos,
    getArticulosByTipo: getArticulosByTipo
}