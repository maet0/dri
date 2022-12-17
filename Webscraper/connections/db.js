

 function setDataWithoutUser (data)  {
    connection.connect(function(err) {
        if (err) throw err;
        console.log('Connected to the MySQL database');
      });
      
}

 function setDataWithUser({firstname, lastname, email, telnr}){
    connection.connect(function(err) {
        if (err) throw err;
        console.log('Connected to the MySQL database');
      });
      connection.createQuery(`INSERT INTO contact (first_name, last_name, email, telnr) VALUES (${firstname},${lastname},${email},${telnr})`,(error, results, fields) => {
        if(error) throw error;
        console.log("Results: "+ results);
        console.log("Fields: " +fields);
      });
      connection.end();
}

