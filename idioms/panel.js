function createPanel() {
    const width = 650;
    const height = 400;
    const hexRadius = 20;

    const svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const hexbin = d3.hexbin()
        .radius(hexRadius)
        .extent([[0, 0], [width, height]]);

    // Generate points in a clustered manner to form a landmass
    const points = [];
    const centerX = width / 2;
    const centerY = height / 2;
    const clusterRadius = 100;

    for (let i = 0; i < 200; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.random() * clusterRadius;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        points.push([x, y]);
    }

    const color = d3.scaleSequential(d3.interpolateViridis)
        .domain([0, 20]);

    svg.append("g")
        .selectAll("path")
        .data(hexbin(points))
        .enter().append("path")
        .attr("d", hexbin.hexagon())
        .attr("transform", d => `translate(${d.x},${d.y})`)
        .attr("fill", d => color(d.length))
        .attr("stroke", "black");
}
