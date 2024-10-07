function createScatterPlot(){
        const data = Array.from({ length: 100 }, () => ({
                x: Math.random() * 100,
                y: Math.random() * 100
        }));

        const svgWidth = 500, svgHeight = 500;

        const margin = { top: 20, right: 30, bottom: 30, left: 40 },
        width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

        const svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleLinear()
                .domain([0, 100])
                .range([0, width]);

        const y = d3.scaleLinear()
                .domain([0, 100])
                .range([height, 0]);

        svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

        svg.append("g")
                .call(d3.axisLeft(y));

        svg.selectAll("dot")
                .data(data)
                .enter().append("circle")
                .attr("cx", d => x(d.x))
                .attr("cy", d => y(d.y))
                .attr("r", 5)
                .attr("fill", "blue");
}