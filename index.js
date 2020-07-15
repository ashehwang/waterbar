const svg = d3.select('svg');
// svg.style('background-color', 'red');

const width = +svg.attr('width')
const height = +svg.attr('height')

const render = data => {

    const margin = { top: 20, right: 20, bottom: 20, left: 80 };
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const xScale = d3.scaleBand()
        .domain(data.map( d => d.action ))
        .range([0, innerWidth])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, 1500])
        .range([0, innerHeight])

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    g.append('g').call(d3.axisLeft(yScale));
    g.append("g")
      .call(d3.axisBottom(xScale))
      .attr("transform", `translate(0, ${innerHeight})`);

    g.selectAll('rect').data(data)
        .enter().append('rect')
        .attr('x', d => xScale(d.action))
        .attr('width', xScale.bandwidth())
        .attr('height', d => yScale(d.water));
};

d3.csv('./src/data.csv').then(data => {
    data.forEach( d => {
        d.water = +d.water;
    });
    render(data);
});