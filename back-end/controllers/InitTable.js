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

module.exports = initTable;
