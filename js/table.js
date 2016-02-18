if (!d3.chart) {
  d3.chart = {};
}

d3.chart.table = function() {
  var div,
      data,
      columns = [],
      returns = {};

  function chart(container) {
    div = container;
    var table = container.append('div').classed('table', true);
    update();
  }

  chart.update = update;

  function update() {
    var table = div.select('.table');

    var thead = table.append('div').classed('table-head', true).append('div').classed('table-head-row', true);
    columns.forEach(function(column) {
      thead.append('div').classed('table-head-th', true).text(column);
    });

    var tbody = table.append('div').classed('table-body', true);

    var rows = tbody.selectAll('.table-body-row')
      .data(data, function(d) { return d.id; })

    var rowsEnter = rows.enter().append('div').classed('table-body-row', true);

    for (var i = 0; i < columns.length; i++) {
      var td = rowsEnter.append('div').classed('table-body-td', true)
      td.append('span').classed('table-body-td-faux_heading', true)
        .text(columns[i])
      td.append('span').classed('table-body-td-content', true)
        .text(returns[i]);
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

  chart.returns = function(value) {
    if (!arguments.length) return returns;
    returns = value;
    return chart;
  }

  return chart;
}