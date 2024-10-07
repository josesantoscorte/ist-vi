// idioms/linechart.js
function createLineChart(data) {
  const margin = { top: 20, right: 30, bottom: 30, left: 40 },
      width = 800 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

  const svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d.year, 0, 1)))
      .range([0, width]);

  const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.incidents)])
      .range([height, 0]);

  const line = d3.line()
      .x(d => x(new Date(d.year, 0, 1)))
      .y(d => y(d.incidents));

  const states = d3.groups(data, d => d.state);

  svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(d3.timeYear.every(1)).tickFormat(d3.timeFormat("%Y")));

  svg.append("g")
      .call(d3.axisLeft(y));

  const tooltip = d3.select("#tooltip");

  svg.selectAll(".line")
      .data(states)
      .enter().append("path")
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "darkgray")
      .attr("stroke-width", 1.5)
      .attr("d", d => line(d[1]))
      .on("mouseover", function(event, d) {
          d3.select(this).attr("stroke", "yellow").attr("stroke-width", 3);
          const totalIncidents = d3.sum(d[1], d => d.incidents);
          tooltip.html(`
              <strong>State:</strong> ${d[0]}<br>
              <strong>Total Incidents:</strong> ${totalIncidents}
          `)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px")
          .style("opacity", 1);
      })
      .on("mouseout", function() {
          d3.select(this).attr("stroke", "darkgray").attr("stroke-width", 1.5);
          tooltip.style("opacity", 0);
      })
      .on("mousemove", function(event) {
          tooltip.style("left", (event.pageX + 10) + "px")
                 .style("top", (event.pageY - 28) + "px");
      });
}