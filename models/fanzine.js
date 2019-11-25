const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM fanzines', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })
    });
};



module.exports = {

    getAll: getAll

};