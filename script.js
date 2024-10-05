function init() {
    d3.csv("./data/parsed_gun.csv").then(function (data) {
      createLinechart(data, ".LineChart");
    });
  }