if (!d3.chart) {
  d3.chart = {};
}

d3.chart.table = function() {
  var div,
      data,
      columns = [],
      dataFunctions = {};

  function chart(container) {
    div = container;
    var table = container.append('table');
    update();
  }

  chart.update = update;

  function update() {
    var table = div.select('table');

    var thead = table.append('thead').append('tr');
    columns.forEach(function(column) {
      thead.append('th').text(column);
    });

    var rows = table.selectAll('tr.row')
      .data(data, function(d) { return d.id; })

    var rowsEnter = rows.enter().append('tr').classed('row', true);

    for (var i = 0; i < columns.length; i++) {
      rowsEnter.append('td').text(dataFunctions[i]);
    }
  }

  chart.data = function(value) {
    if (!arguments.length) return data;
    data = value;
    return chart;
  }

  chart.columns = function(value) {
    if (!arguments.length) return columns;
    columns = value;
    return chart;
  }

  chart.dataFunctions = function(value) {
    if (!arguments.length) return dataFunctions;
    dataFunctions = value;
    return chart;
  }

  return chart;
}