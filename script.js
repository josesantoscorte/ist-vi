function init() {
  d3.csv("../data/parsed_gun.csv").then(data => {
    // Parse the data
    const parseDate = d3.timeParse("%Y-%m-%d");
    data.forEach(d => {
        d.date = parseDate(d.date);
        d.year = d.date.getFullYear();
    });
  
    // Aggregate data by year and state
    const incidentsByYearAndState = d3.rollup(data, v => v.length, d => d.year, d => d.state);
  
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