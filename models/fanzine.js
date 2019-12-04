const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM fanzines order by id desc', (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        })
    });
};



module.exports = {

    getAll: getAll

};