var db = openDatabase('mydb', '1.0', 'DB', 2 * 1024 * 1024);
db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS timings (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT ,timing INTEGER,created_at varchar(100))');

});

function addTiming(timings) {
    db.transaction(function(tx) {
        var dt = new Date();
        var createdAt = dt.toISOString();
        tx.executeSql("insert into timings (timing,created_at) values('" + timings + "','" + createdAt + "')");

        
    });
}

function getTimingForAday(date) {
    return new Promise(function(resolve, reject) {
        db.transaction(function(tx) {
            tx.executeSql("select * from timings where date(created_at)=date('" + date + "')", [], function(tx, result) {
                resolve(result.rows || [])
            });
        });
    })
}
