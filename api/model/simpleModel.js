const mysql=require('mysql');
const con=require('../../config/db');

const simpleText=function(stext){
    this.simpletext=stext.simpletext;
};
simpleText.create=(newsText,result) => {
    con.query("INSERT INTO simpletext SET ?",newsText,(err,res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created text: ", { id: res.insertId, ...newsText });
        result(null, { id: res.insertId, ...newsText });
    });
};
simpleText.findById=(id,result)=>{
    con.query(`SELECT * FROM simpletext WHERE id = ${id}`, (err, res)=>{
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found text: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};
simpleText.getAll=(simpletext,result)=>{
    let query = "SELECT * FROM simpletext";
    if (title) {
        query += ` WHERE title LIKE '%${simpletext}%'`;
    }
    con.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("text: ", res);
    result(null, res);
  });
}
simpleText.updateById = (id, stext, result) => {
    sql.query(
      "UPDATE simpletext SET simpletext = ?,  WHERE id = ?",
      [stext.text, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated text: ", { id: id, ...stext });
        result(null, { id: id, ...stext });
      }
    );
  };
simpleText.remove = (id, result) => {
    sql.query("DELETE FROM simpletext WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted simpletext with id: ", id);
      result(null, res);
    });
  };
  
simpleText.removeAll = result => {
    sql.query("DELETE FROM simpletext", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} simpletexts`);
      result(null, res);
    });
  };
  
  module.exports = simpleText;