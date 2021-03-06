const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from tipo', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })
    })
}

module.exports = {
    getAll: getAll
}