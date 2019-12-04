const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from usuarios', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })
    });
}

const getByEmail = (pEmail) => {
    return new Promise((resolve, reject) => {
        db.query('select * from usuarios where email = ?', [pEmail], (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}


const insert = ({ nombre, apellidos, usuario, password, email, fechaRegistro }) => {
    return new Promise((resolve, reject) => {
        db.query('insert into usuarios (nombre, apellidos, usuario, password, email, fechaRegistro) values (?, ?, ?, ?, ?, ?)', [nombre, apellidos, usuario, password, email, new Date()], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })

}

module.exports = {
    getAll: getAll,
    getByEmail: getByEmail,
    insert: insert
}