import SQLite from 'react-native-sqlite-storage';

export const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);
const closeDatabase = db => {
  if (db) {
    console.log('Closing DB');
    db.close()
      .then(status => {
        console.log('Database CLOSED');
      })
      .catch(error => {
        this.errorCB(error);
      });
  } else {
    console.log('Database was not OPENED');
  }
};

export const createTable = (db, tableobject) => {
  Object.keys(tableobject).map(key => {
    // var tablename = Object.keys(tableobject)[0];
    // PRAGMA table_info(table_name);
    var modelobject = tableobject[key];
    var query = 'CREATE TABLE IF NOT EXISTS ' + key + ' (';
    Object.keys(modelobject).forEach(k =>
      k != 'uniquefields'
        ? (query += k + ' ' + modelobject[k] + ', ')
        : (query += ' UNIQUE (' + modelobject[k] + ')  '),
    );
    query = query.substr(0, query.length - 2);
    query += ' );';
    db.transaction(tx => {
      tx.executeSql(
        query,
        //   'CREATE TABLE IF NOT EXISTS ' +
        //     'Users ' +
        //     '(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, dob TEXT, dor TEXT, sclass TEXT, ischild BOOLEAN);',
      );
    });
    console.log(' table ', key, 'created', query);
  });
};

export const deleteTable = (db, tableobject) => {
  var tablename = Object.keys(tableobject)[0];
  var query = 'DROP TABLE IF EXISTS ' + tablename + ' ';
  db.transaction(tx => {
    tx.executeSql(query);
  });
  console.log(tablename, ' table deleted');
};
export const truncateTable = (db, tableobject) => {
  var tablename = Object.keys(tableobject)[0];
  var query = 'DELETE FROM ' + tablename + ';';
  db.transaction(tx => {
    tx.executeSql(query);
  });
  console.log(tablename, ' table truncated');
};
export const deleteRows = (db, tablename, condition = 'id = 0') => {
  //   DELETE FROM artists_backup
  // WHERE artistid = 1;
  var query = 'DELETE FROM ' + tablename + ' WHERE ' + condition + ';';
  try {
    db.transaction(async tx => {
      tx.executeSql(query);
    });
    console.log('delete rows complete');
  } catch (error) {
    console.log(error);
  }
};

export const updateOrCreaterow = async (db, tablename, object) => {
  // Keep all fields
  var query = 'INSERT OR REPLACE INTO ' + tablename + ' (';

  Object.keys(object).map(k => (query += k + ', '));

  query = query.substr(0, query.length - 2) + ' ) VALUES (';
  Object.keys(object).map(k => (query += '?, '));
  query = query.substr(0, query.length - 2) + ');';

  var values = [];
  Object.keys(object).map(k => values.push(object[k]));
  console.log(query, values);
  try {
    await db.transaction(async tx => {
      await tx.executeSql(query, values);
    });
  } catch (error) {
    console.log(error);
  }

  `insert or replace into Book (ID, Name, TypeID, Level, Seen) values (
      (select ID from Book where Name = "SearchName"),
      "SearchName",
       5,
       6,
       (select Seen from Book where Name = "SearchName"));`;
};

export const storeData = async (
  db,
  tablename,
  object,
  lengthcheckkeys,
  usenotexist = false,
) => {
  // var tablename = Object.keys(tableobject)[0];
  // Make sure your input data is consistent (integer, string etc.)
  // console.log(
  //   'in set userdata**************************************************************',
  // );
  var query = 'INSERT INTO ' + tablename + ' (';

  Object.keys(object).map(k => (query += k + ', '));
  query = query.substr(0, query.length - 2) + ' ) VALUES (';
  Object.keys(object).map(k => (query += '?, '));
  query = query.substr(0, query.length - 2) + ');';
  var values = [];
  Object.keys(object).map(k => values.push(object[k]));
  usenotexist
    ? (query += 'WHERE NOT EXISTS (SELECT * FROM ' + tablename + ')')
    : null;
  console.log(query, values);
  if (lengthcheckkeys.legth > 0) {
    for (let i = 0; i < lengthcheckkeys.legth; i++) {
      if (object[lengthcheckkeys[i]].length == 0) {
        Alert.alert('Warning!', 'Please write your data.');
        return;
      }
    }
  }
  //   console.log(query);

  try {
    await db.transaction(async tx => {
      // console.log('in setUserData', object);
      await tx.executeSql(query, values);
    });
    // console.log('set data complete');
    // getDataTest(db, tablename);
    // navigation.navigate('Home');
  } catch (error) {
    console.log(error);
  }
};

export const getColumns = (db, tablename) => {
  var query = 'PRAGMA table_info(' + tablename + ')';

  try {
    db.transaction(tx => {
      tx.executeSql(query, [], (tx, results) => {
        var len = results.rows.length;
        console.log(
          '#############################Coulumns####################################',
        );
        Array.apply(0, Array(len).fill(0))
          .map(function (_, b) {
            return b;
          })
          .map(i =>
            console.log(results.rows.item(i).name, results.rows.item(i).type),
          );
        console.log(
          '#############################Coulumns####################################',
        );
      });
    });
  } catch (error) {
    return error;
    console.log('error in getDataTest');
    // console.log(error);
    // return [];
  }
};

export const getDataTest = (db, tablename) => {
  var query = 'SELECT * FROM ' + tablename;
  console.log(query);
  var keys2retrieve = ['id'];
  try {
    db.transaction(tx => {
      tx.executeSql(query, [], (tx, results) => {
        var len = results.rows.length;
        console.log('results.rows.length ', tablename, results.rows.length);
        if (len > 0) {
          var allusers = [];
          for (let i = 0; i < len; i++) {
            var myarr = {};

            // allusers += results.rows.item(i).name + ', ';
            keys2retrieve.map(k => (myarr[k] = results.rows.item(i)[k]));
            allusers.push(myarr);
          }
          console.log(allusers[0]);
        }
      });
    });
  } catch (error) {
    return error;
    console.log('error in getDataTest');
    // console.log(error);
    // return [];
  }
};

// export const storeDataArray = async (db, tablename, objectArray) => {
//   // var tablename = Object.keys(tableobject)[0];
//   // Make sure your input data is consistent (integer, string etc.)
//   console.log(
//     'in set userdata**************************************************************',
//   );
//   var query = 'INSERT INTO ' + tablename + ' (';

//   Object.keys(object).map(k => (query += k + ', '));
//   query = query.substr(0, query.length - 2) + ' ) VALUES (';
//   Object.keys(object).map(k => (query += '?, '));
//   query = query.substr(0, query.length - 2) + ');';
//   objectArray.forEach(object => {
//     var values = [];
//     Object.keys(object).map(k => values.push(object[k]));

//     try {
//       db.transaction(async tx => {
//         // console.log('in setUserData', object);
//         tx.executeSql(query, values);
//       });
//       console.log('set data complete');
//       // navigation.navigate('Home');
//     } catch (error) {
//       console.log(error);
//     }
//   });
//   console.log('set data complete');
// };

export const getDataLocal = (db, tablename, keys2retrieve, setUserData) => {
  var query = 'SELECT *   ';
  // keys2retrieve.map(k => (query += k + ', '));
  query = query.substr(0, query.length - 2) + ' FROM ' + tablename;
  console.log(query);
  try {
    db.transaction(tx => {
      tx.executeSql(query, [], (tx, results) => {
        var len = results.rows.length;
        console.log('results.rows.length ', tablename, results.rows.length);
        if (len > 0) {
          var allusers = [];
          for (let i = 0; i < len; i++) {
            var myarr = {};
            // console.log('results.rows.length ', i, results.rows.length);
            // allusers += results.rows.item(i).name + ', ';
            keys2retrieve.map(k => (myarr[k] = results.rows.item(i)[k]));
            allusers.push(myarr);
          }
          // console.log(allusers[0]);
          // return allusers;
          setUserData(allusers);
        }
      });
    });
  } catch (error) {
    return error;
    // console.log('error in set');
    // console.log(error);
    // return [];
  }
};

export const getData = (db, tablename, keys2retrieve, setUserData, other) => {
  console.log('*******************start getdata', other);
  try {
    getDataLocal(db, tablename, keys2retrieve, setUserData);
  } catch (error) {
    console.log('error in set');
    console.log(error);
  }
  // console.log('*******************end getdata', other);
};

export const getDataWithextrafieldWithFilter = (
  db,
  tablename,
  keys2retrieve,
  setUserData,
  extrafieldsObject,
  myfilter,
) => {
  var query = 'SELECT ';
  keys2retrieve.map(k => (query += k + ', '));
  query = query.substr(0, query.length - 2) + ' FROM ' + tablename;
  console.log(query);
  try {
    db.transaction(tx => {
      tx.executeSql(query, [], (tx, results) => {
        var len = results.rows.length;
        if (len > 0) {
          var allusers = [];
          for (let i = 0; i < len; i++) {
            var myarr = {};
            keys2retrieve.map(k => (myarr[k] = results.rows.item(i)[k]));
            allusers.push(myarr);
          }

          let temp = allusers
            .filter(
              e =>
                e[Object.keys(myfilter)[0]] ==
                myfilter[Object.keys(myfilter)[0]],
            )
            .map(e => {
              Object.keys(extrafieldsObject).map(k => {
                e[k] = extrafieldsObject[k];
              });
              return e;
            });
          console.log('temp', temp);
          setUserData(temp);
          console.log(
            '########################setUserData############################',
          );
        }
      });
    });
  } catch (error) {
    console.log('error in set');
    console.log(error);
    // console.log('error in set');
    // console.log(error);
    // return [];
  }
};
export const getDataWithextrafield = (
  db,
  tablename,
  keys2retrieve,
  setUserData,
  extrafieldsObject,
  myfilter,
) => {
  var query = 'SELECT ';
  keys2retrieve.map(k => (query += k + ', '));
  query = query.substr(0, query.length - 2) + ' FROM ' + tablename;
  console.log(query);
  try {
    db.transaction(tx => {
      tx.executeSql(query, [], (tx, results) => {
        var len = results.rows.length;
        if (len > 0) {
          var allusers = [];
          for (let i = 0; i < len; i++) {
            var myarr = {};
            // console.log('results.rows.length ', i, results.rows.length);
            // allusers += results.rows.item(i).name + ', ';
            keys2retrieve.map(k => (myarr[k] = results.rows.item(i)[k]));
            allusers.push(myarr);
          }

          let temp = allusers.map(e => {
            Object.keys(extrafieldsObject).map(k => {
              e[k] = extrafieldsObject[k];
            });
            return e;
          });
          console.log('temp', temp);
          setUserData(temp);
          console.log(
            '########################setUserData############################',
          );
        }
      });
    });
  } catch (error) {
    console.log('error in set');
    console.log(error);
    // console.log('error in set');
    // console.log(error);
    // return [];
  }
};

export const getDataIncludefield = (
  db,
  tablename,
  keys2retrieve,
  setUserData,
  other,
) => {
  console.log('*******************start getdata', other);
  var query = 'SELECT ';
  keys2retrieve.map(k => (query += k + ', '));
  query = query.substr(0, query.length - 2) + ' FROM ' + tablename;
  console.log(query);
  try {
    db.transaction(tx => {
      tx.executeSql(query, [], (tx, results) => {
        // console.log('results.rows.length ', results.rows.length);
        var len = results.rows.length;
        console.log(
          '1111111111111111111111111111111111111111111111111111111111111111111111111111111',
        );
        console.log('results.rows.length ', other, results.rows);
        console.log(
          '11111111111111111111111111111111111111111111111111111111111111111111111111111111111',
        );
        if (len > 0) {
          var allusers = [];

          for (let i = 0; i < len; i++) {
            var myarr = {};
            // console.log('results.rows.length ', i, results.rows.length);
            // allusers += results.rows.item(i).name + ', ';
            keys2retrieve.map(k => (myarr[k] = results.rows.item(i)[k]));
            allusers.push(myarr);
            console.log(myarr);
          }
          // console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);

          //   console.log(allusers);
          console.log('*******************end getdata in for', other);
          setUserData(allusers);
          //   return allusers;

          // setAllusers(allusers);
        }
      });
    });
  } catch (error) {
    console.log('error in set');
    console.log(error);
    // return [];
  }
  console.log('*******************end getdata end', other);
};
export const getLastrow = (
  db,
  tablename,
  keys2retrieve,
  setUserData,
  other,
) => {
  console.log('*******************start getdata', other);
  var query = 'SELECT ';
  keys2retrieve.map(k => (query += k + ', '));
  query = query.substr(0, query.length - 2) + ' FROM ' + tablename;
  query = query + ' WHERE   id = (SELECT MAX(id)  FROM ' + tablename + ' )';
  //   console.log(query);
  try {
    db.transaction(tx => {
      tx.executeSql(query, [], (tx, results) => {
        var len = results.rows.length;
        if (len > 0) {
          var allusers = [];
          for (let i = 0; i < len; i++) {
            var myarr = {};
            keys2retrieve.map(k => (myarr[k] = results.rows.item(i)[k]));
            allusers.push(myarr);
            console.log(myarr);
          }

          console.log('*******************end getdata in for', other);
          setUserData(allusers);
        }
      });
    });
  } catch (error) {
    console.log('error in set');
    console.log(error);
    // return [];
  }
  console.log('*******************end getdata end', other);
};
export const getMaxvalueData = (
  db,
  tablename,
  keys2retrieve,
  setUserData,
  maxval_key,
  other,
) => {
  var query = 'SELECT ';
  keys2retrieve.map(k => (query += k + ', '));
  query = query.substr(0, query.length - 2) + ' FROM ' + tablename;
  query =
    query +
    ' WHERE   id = (SELECT MAX( ' +
    maxval_key +
    ' )  FROM ' +
    tablename +
    ' )';
  //   console.log(query);
  try {
    db.transaction(tx => {
      tx.executeSql(query, [], (tx, results) => {
        var len = results.rows.length;
        if (len > 0) {
          var allusers = [];
          for (let i = 0; i < len; i++) {
            var myarr = {};
            keys2retrieve.map(k => (myarr[k] = results.rows.item(i)[k]));
            allusers.push(myarr);
            console.log(myarr);
          }

          console.log('*******************end getdata in for', other);
          setUserData(allusers);
        }
      });
    });
  } catch (error) {
    console.log('error in set');
    console.log(error);
    // return [];
  }
  console.log('*******************end getdata end', other);
};
