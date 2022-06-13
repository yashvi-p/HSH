import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'LabelDatabase.db'});

const createDatabase = async () => {
  return db.transaction(function (txn) {
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name='label'",
      [],
      function (tx, res) {
        if (res.rows.length == 0) {
          txn.executeSql('DROP TABLE IF EXISTS label', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS label(label_id INTEGER PRIMARY KEY AUTOINCREMENT, key VARCHAR(255), en VARCHAR(255), fr VARCHAR(255), de VARCHAR(255), it VARCHAR(255))',
            [],
          );
        }
      },
    );
  });
};
const applyQuery = async (query, parameter) => {
  return new Promise(resolve => {
    db.transaction(function (tx) {
      tx.executeSql(query, parameter, (tx, results) => {
        resolve(results);
      });
    });
  });
};

const getLabel = (labelList, value, language) => {
  //store.getState().label
  //store.getState().applanguage

  if (labelList.length > 0) {
    return JSON.parse(labelList).map(entry => {
      if (entry.key == value) {
        return entry[language];
      }
    });
  }
};
const labelString = (labelList, value, language) => {
  if (labelList.length > 0) {
    var abc = getLabel(labelList, value, language);
    var filtered = abc.filter(function (el) {
      return el != null;
    });
    return filtered.toString();
  }
};

const getLabelValue = (arr, labelKey) => {
  const filteredResult = arr.find(e => e.label_key == labelKey);

  return filteredResult ? filteredResult.En : labelKey.replace(/_/g, ' ');
};

export {createDatabase, applyQuery, getLabel, labelString, getLabelValue};
