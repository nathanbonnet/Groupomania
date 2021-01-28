const sql = require("./db.js");

// constructor
const Article = function(article, userId) {
  this.title = article.title;
  this.content = article.content;
  this.image = article.image;
  this.users_id = userId;
};

Article.create = (newArticle, result) => {
  sql.query("INSERT INTO articles SET ?", newArticle, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created article: ", { id: res.insertId, ...newArticle });
    result(null, { id: res.insertId, ...newArticle });
  });
};

Article.findById = (articleId, result) => {
  sql.query(`SELECT * FROM articles WHERE id = ${articleId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found article: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Article with the id
    result({ kind: "not_found" }, null);
  });
};

Article.getAll = result => {
  sql.query("select a.id, a.title, a.users_id, a.content, a.date, u.firstName, u.lastName from articles a inner join users u on a.users_id = u.id;", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("articles: ", res);
    result(null, res);
  });
};

Article.getAllByOwner = (id, result) => {
  sql.query(
    "select a.id, a.title, a.users_id, a.content, a.date, u.firstName, u.lastName from articles a inner join users u on a.users_id = u.id WHERE u.id = ?;",
    [id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("articles: ", res);
      result(null, res);
    }
  );
};

Article.updateById = (id, article, result) => {
  sql.query(
    "UPDATE articles SET title = ?, content = ?, image = ? WHERE id = ?",
    [article.title, article.content, article.image, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Article with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated article: ", { id: id, ...article });
      result(null, { id: id, ...article });
    }
  );
};

Article.remove = (id, result) => {
  sql.query("DELETE FROM articles WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Article with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted article with id: ", id);
    result(null, res);
  });
};

Article.removeAll = result => {
  sql.query("DELETE FROM articles", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} articles`);
    result(null, res);
  });
};

module.exports = Article;