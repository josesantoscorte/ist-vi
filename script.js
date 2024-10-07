function init() {
  d3.csv("../data/parsed_gun.csv").then(data => {
    // Filter out the data where the year is 2013
    const filteredData = data.filter(d => +d.year !== 2013);
    // Create the line chart
    createHexagonMap();
    createLineChart(filteredData);
    createPanel();
    createScatterPlot();
  });
}
