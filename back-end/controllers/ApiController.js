const express = require("express");
const router = express.Router();

const Table = require("../models/Table");

router.get("/", (req, res) => {
  res.send("Hello");
});

router.get("/new", async (req, res) => {
  let t1 = new Table({
    persons: [
      {
        id: 1,
        name: "Kirill",
        role: "Front-End"
      },
      {
        id: 2,
        name: "Vita",
        role: "Back-End"
      }
    ],
    dates: [
      {
        date: "2019-08-09",
        values: [
          {
            personId: 1,
            data: {
              color: "red",
              value: "RD"
            }
          },
          {
            personId: 2,
            data: {
              color: "yellow",
              value: "GR"
            }
          }
        ]
      },
      {
        date: "2019-08-11",
        values: [
          {
            personId: 2,
            data: {
              color: "blue",
              value: "123"
            }
          }
        ]
      },
      {
        date: "2019-08-12",
        values: [
          {
            personId: 1,
            data: {
              color: "gray",
              value: "RD"
            }
          },
          {
            personId: 2,
            data: {
              color: "yellow",
              value: "GR"
            }
          }
        ]
      }
    ]
  });

  let res1 = await t1.save();
  res.json({
    success: 1
  });
  console.log(res1);
});

router.get("/table/:id", async (req, res) => {
  let result;
  try {
    result = await Table.findOne({ _id: req.params.id });
  } catch (error) {
    res.status(404).send("Table not found");
  }
  res.send(initTable(result));
});

const initTable = table => {
  //console.log(table);

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
