const sql = require("./db.js");

// constructor
const Sharing = function(sharing) {
  this.content = sharing.content;
  this.articles_id = sharing.articles_id;
  this.users_id = sharing.users_id;
};

Sharing.create = (newSharing, result) => {
  sql.query("INSERT INTO sharings SET ?", newSharing, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created sharing: ", { id: res.insertId, ...newSharing });
    result(null, { id: res.insertId, ...newSharing });
  });
};

Sharing.findByUserId = (userId, result) => {
  sql.query(`SELECT * FROM sharings WHERE users_id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found sharing: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Sharing with the id
    result({ kind: "not_found" }, null);
  });
};

Sharing.findByArticleId = (articleId, result) => {
  sql.query(`SELECT * FROM sharings WHERE articles_id = ${articleId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found sharing: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Sharing with the id
    result({ kind: "not_found" }, null);
  });
};


Sharing.getAll = result => {
  sql.query("SELECT * FROM sharings", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("sharings: ", res);
    result(null, res);
  });
};

Sharing.remove = (id, result) => {
  sql.query("DELETE FROM sharings WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Sharing with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted sharing with id: ", id);
    result(null, res);
  });
};

Sharing.removeAll = result => {
  sql.query("DELETE FROM sharings", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} sharings`);
    result(null, res);
  });
};

module.exports = Sharing;