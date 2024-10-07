function init() {
  d3.csv("../data/parsed_gun.csv").then(data => {
    // Filter out the data where the year is 2013
    const filteredData = data.filter(d => +d.year !== 2013);
  
    // Aggregate data by year and state
    const incidentsByYearAndState = d3.rollup(filteredData, v => v.length, d => +d.year, d => d.state);
  
    // Convert the nested map to an array of objects
    const incidentsArray = [];
    incidentsByYearAndState.forEach((states, year) => {
        states.forEach((incidents, state) => {
            incidentsArray.push({ year, state, incidents });
        });
    });
  
    // Create the line chart
    createLineChart(incidentsArray);
  });
}
