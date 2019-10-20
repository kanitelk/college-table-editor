const Table = {
  persons: [
    {
      id: 1,
      name: "Person 1",
      role: "Role 1"
    },
    {
      id: 2,
      name: "Person 2",
      role: "Role 2"
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
};

export default Table;
