const express = require("express");
const router = express.Router();

const Table = require("../models/Table");

router.get("/", (req, res) => {
  res.send("Hello");
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
    persons: []
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

router.get("/table/:name", async (req, res) => {
  let result = await Table.findOne({ name: req.params.name });
  if (!result) {
    res.status(404).send("Table not found");
    return;
  }
  res.send(initTable(result));
});

const initTable = table => {
  // ! DATES
  let res = {};
  res.dates = table.dates.sort((a, b) => new Date(a.date) - new Date(b.date));
  let d1 = new Date(res.dates[0].date);
  let d2 = new Date(res.dates[res.dates.length - 1].date);
  console.log(d1, d2);

  while (d1 < d2) {
    let r = res.dates.findIndex(
      x => new Date(x.date).getTime() === d1.getTime()
    );

    if (r === -1) {
      res.dates.push({
        date: d1.getTime(),
        values: []
      });
    }
    d1.setDate(d1.getDate() + 1);
  }
  res.dates = res.dates.sort((a, b) => new Date(a.date) - new Date(b.date));

  // !CELLS
  res.persons = table.persons;
  return res;
};

module.exports = router;
