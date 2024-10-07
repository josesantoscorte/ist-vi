function createHexagonMap(containerId) {
    // Define the dimensions of the SVG container
    const width = 960;
    const height = 600;

    // Create an SVG container
    const svg = d3
        .select(containerId)
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const hexbin = d3Hexbin()
        .extent([
            [0, 0],
            [width, height],
        ])
        .radius(20);

    // Load the geographic data
    d3.json("path/to/us-states.json").then((us) => {
        // Define a projection
        const projection = d3.geoAlbersUsa()
            .scale(1000)
            .translate([width / 2, height / 2]);

        // Define a path generator
        const path = d3.geoPath().projection(projection);

        // Convert the geographic data to hexbin points
        const points = [];
        us.features.forEach((feature) => {
            const centroid = path.centroid(feature);
            points.push(centroid);
        });

        // Generate the hexagons
        const hexagons = hexbin(points);

        // Draw the hexagons
        svg.append("g")
            .selectAll("path")
            .data(hexagons)
            .enter()
            .append("path")
            .attr("d", hexbin.hexagon())
            .attr("transform", (d) => `translate(${d.x},${d.y})`)
            .attr("fill", "steelblue")
            .attr("stroke", "white")
            .attr("stroke-width", 1);
    });
}