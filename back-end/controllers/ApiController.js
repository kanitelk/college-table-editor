const express = require("express");
const router = express.Router();
const initTable = require("./InitTable");
const Table = require("../models/Table");

router.get("/", (req, res) => {
  res.send("Server works!");
});

router.post("/new", async (req, res) => {
  d1 = new Date(req.body.startDate);
  d2 = new Date(req.body.endDate);
  let t = new Table({
    name: req.body.name,
    dates: [
      {
        date: d1,
        values: []
      },
      {
        date: d2,
        values: []
      }
    ],
    persons: [
      {
        id: 1,
        name: "",
        role: "Разработка интерфейса"
      },
      {
        id: 2,
        name: "",
        role: "Разработка требований"
      },
      {
        id: 3,
        name: "",
        role: "Разработка архитектуры"
      },
      {
        id: 4,
        name: "",
        role: "Разработка алгоритмов"
      },
      {
        id: 5,
        name: "",
        role: "Кодирование"
      },
      {
        id: 6,
        name: "",
        role: "Разработка тестов"
      },
      {
        id: 7,
        name: "",
        role: "Тестирование"
      },
      {
        id: 8,
        name: "",
        role: "Оформление результатов"
      }
    ]
  });

  try {
    let res1 = await t.save();
    res.json({
      success: 1,
      id: res1._id
    });
  } catch (error) {
    res.status(409).send(error);
  }
});

router.post("/setCell", async (req, res) => {
  const { tableName, date, userId, color, content } = req.body;
  let t = await Table.findOne({ name: tableName });
  let dateIndex = t.dates.findIndex(x => {
    let d1 = new Date(x.date);
    let d2 = new Date(date);
    return d1.getTime() === d2.getTime();
  });
  console.log(dateIndex);
  if (dateIndex === -1) {
    t.dates.push({
      date: date,
      values: {
        personId: userId,
        data: {
          color: color,
          value: content
        }
      }
    });
  } else {
    //console.log(t.dates[dateIndex].values);

    let valueIndex = t.dates[dateIndex].values.findIndex(x => {
      //console.log(x.personId, userId);

      return x.personId === +userId;
    });
    console.log(valueIndex);

    if (valueIndex === -1) {
      t.dates[dateIndex].values.push({
        personId: userId,
        data: {
          color: color,
          value: content
        }
      });
    } else {
      t.dates[dateIndex].values[valueIndex] = {
        personId: userId,
        data: {
          color: color,
          value: content
        }
      };
    }
  }
  try {
    await t.save();
    res.send("Cell updated");
  } catch (error) {
    res.status(409).send("Error while updating cell");
  }
});

router.post("/editPerson", async (req, res) => {
  const { tableName, userId, userName, role } = req.body;

  let t = await Table.findOne({ name: tableName });
  let personIndex = t.persons.findIndex(x => x.id === +userId);
  if (personIndex === -1) res.status(409).send("Person not found");
  else {
    t.persons[personIndex].name = userName;
    t.persons[personIndex].role = role;
    try {
      await t.save();
      res.send("Person updated");
    } catch (error) {
      res.status(409).send("Error while updating person");
    }
  }
});

router.post("/addPerson", async (req, res) => {
  const { tableName, userName, role } = req.body;
  let t = await Table.findOne({ name: tableName });
  let nextId = 1;
  t.persons.forEach(person => {
    if (person.id >= nextId) nextId = person.id + 1;
  });
  console.log(nextId);
  t.persons.push({
    id: nextId,
    name: userName,
    role: role
  });
  try {
    await t.save();
    res.send("Person added");
  } catch (error) {
    res.status(409).send("Error while adding person");
  }
});

router.post("/deletePerson", async (req, res) => {
  const { tableName, userId, userName, role } = req.body;

  let t = await Table.findOne({ name: tableName });
  let personIndex = t.persons.findIndex(x => x.id === +userId);
  if (personIndex === -1) res.status(409).send("Person not found");
  else {
    t.persons.splice(personIndex, 1);
    try {
      await t.save();
      res.send("Person deleted");
    } catch (error) {
      res.status(409).send("Error while deleting person");
    }
  }
});

router.get("/table/:name", async (req, res) => {
  let result = await Table.findOne({ name: req.params.name });
  if (!result) {
    res.status(404).send("Table not found");
    return;
  }
  res.send(initTable(result));
});

router.get("/tables", async (req, res) => {
  let result = await Table.find({});
  if (!result) {
    res.status(404).send("Tables not found");
    return;
  }
  result = result.map(table => {
    return {
      name: table.name,
      persons: table.persons.length
    };
  });
  res.send(result);
});

router.post("/deleteTable", async (req, res) => {
  let result = await Table.remove({ name: req.body.tableName });
  if (!result) {
    res.status(404).send("Table not found");
    return;
  } else {
    res.send("Table deleted");
  }
});

module.exports = router;
