if (!d3.chart) {
  d3.chart = {};
}

d3.chart.lines = function() {
  var div,
      svg,
      graph,
      data,
      xExtent,
      yExtent,
      xLabel,
      yLabel,
      margin = { top: 40, right: 40, bottom: 40, left: 40 },
      width = 750 - margin.right - margin.left,
      height = (width * (9/16)) - margin.top - margin.bottom;

  function chart(container) {
    div = container;
    svg = div.append('svg').classed('lines', true)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)

    graph = svg.append('g').classed('lines-graph', true)
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

    graph.append('g').classed('lines-x-axis', true)
      .attr('transform', 'translate(0, ' + height + ')')
    graph.append('g').classed('lines-y-axis', true)
    graph
      .append('text').classed('lines-x-label', true)
      .attr({
        x: width / 2,
        y: height + ((margin.top + margin.bottom) / 2),
        'text-anchor': 'middle'
      })
      .text(xLabel)

    graph
      .append('text').classed('lines-y-label', true)
      .attr({
        x: 0,
        y: height / 2,
        'text-anchor': 'middle',
        'transform': 'translate(' + (((height + margin.left + (margin.right / 2)) / 2) * -1) + ',' + ((height / 2)) + ') rotate(270)'
      })
      .text(yLabel)
    update();
  }

  chart.update = update;

  function update() {
    var xScale = d3.scale.linear()
      .domain(xExtent)
      .range([0, width])

    var yScale = d3.scale.linear()
      .domain(yExtent)
      .range([height, 0])

    var xAxis = d3.svg.axis()
      .scale(xScale)
      .orient('bottom')

    var yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')

    var xAxisGroup = div.select('.lines-x-axis')
    var yAxisGroup = div.select('.lines-y-axis')
    xAxis(xAxisGroup)
    yAxis(yAxisGroup)

    var line = d3.svg.line()
      .x(function(d) { return xScale(d.x); })
      .y(function(d) { return yScale(d.y); })

    graph
      .append('path').classed('lines-graph-line', true)
      .attr('d', line(data))
      .on('mouseover', function(d) {
        d3.select(this).style('opacity', 1);
      })
      .on('mouseleave', function(d) {
        d3.select(this).style('opacity', .25);
      })

    graph.selectAll('graph-dot')
      .data(data)
      .enter()
      .append('circle').classed('lines-graph-dot', true)
      .attr({
        r: 3.5,
        cx: function(d,i) { return xScale(d.x); },
        cy: function(d,i) { return yScale(d.y); }
      })
  }

  chart.data = function(value) {
    if (!arguments.length) return data;
    data = value;
    return chart;
  }

  chart.xExtent = function(value) {
    if (!arguments.length) return xExtent;
    xExtent = value;
    return chart;
  }

  chart.yExtent = function(value) {
    if (!arguments.length) return yExtent;
    yExtent = value;
    return chart;
  }

  chart.xLabel = function(value) {
    if (!arguments.length) return xLabel;
    xLabel = value;
    return chart;
  }

  chart.yLabel = function(value) {
    if (!arguments.length) return yLabel;
    yLabel = value;
    return chart;
  }

  chart.width = function(value) {
    if (!arguments.length) return width;
    width = value;
    return chart;
  }

  chart.height = function(value) {
    if (!arguments.length) return height;
    height = value;
    return chart;
  }

  return chart;
}