const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from usuarios order by fechaRegistro desc', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })
    });
}

const getById = (pId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from usuarios where id = ?', [pId], (err, rows) => {
            if (err) reject(err);
            resolve(rows[0]);
        })
    })
}

const getByEmail = (pEmail) => {
    return new Promise((resolve, reject) => {
        db.query('select * from usuarios where email = ?', [pEmail], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

const insert = ({ nombre, apellidos, password, email, descripcion }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into usuarios (nombre, apellidos, password, email, descripcion, fechaRegistro) values (?, ?, ?, ?, ?, ?)', [nombre, apellidos, password, email, descripcion, new Date()], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })

}

module.exports = {
    getAll: getAll,
    getByEmail: getByEmail,
    insert: insert,
    getById: getById
}