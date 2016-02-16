d3.json('matches.json', function(err, matches) {
  var data = matches.matches;
  var display = d3.select('.js-display');

  // Table
  var tdiv = display.append('div').classed('table-wrap', true);
  var table = d3.chart.table();
  table.data(data);
  table(tdiv);

  // Wins Losses Pie Chart
  var winsLossesGroup = display.append('div').classed('pie-wrap win_loss_pie-group', true);
  var winsLossesPie = d3.chart.pie()
    .data(_winsLosses(data))
    .title('Wins & Losses')
  winsLossesPie(winsLossesGroup);

  // Matches Per Class Pie Chart
  var matchesPerClassGroup = display.append('div').classed('pie-wrap matches_per_class_pie-group', true)
  var matchesPerClassPie = d3.chart.pie()
    .data(_matchesPerClass(data))
    .title('Matches/Class')
  matchesPerClassPie(matchesPerClassGroup);

  // Matches Per Partner Pie Chart
  var matchesPerPartnerGroup = display.append('div').classed('pie-wrap matches_per_partner_pie-group', true);
  var matchesPerPartnerPie = d3.chart.pie()
    .data(_matchesPerPartner(data))
    .title('Matches/Partner')
  matchesPerPartnerPie(matchesPerPartnerGroup);

  // Matches Per Map Pie chart
  var matchesPerMapGroup = display.append('div').classed('pie-wrap matches_per_map_pie-group', true);
  var matchesPerMapPie = d3.chart.pie()
    .data(_matchesPerMap(data))
    .title('Matches/Map')
  matchesPerMapPie(matchesPerMapGroup);

  // Kills Line Chart
  var killsGroup = display.append('div').classed('lines-wrap kills-lines-group', true);
  var killLines = d3.chart.lines()
    .data(_kills(data))
    .xExtent(d3.extent(data, function(d) { return d.id; }))
    .yExtent(d3.extent(data, function(d) { return d.kills; }))
  killLines(killsGroup);

  // Assists Line Chart
  var assistsGroup = display.append('div').classed('lines-wrap assists-lines-group', true);
  var assistsLines = d3.chart.lines()
    .data(_assists(data))
    .xExtent(d3.extent(data, function(d) { return d.id; }))
    .yExtent(d3.extent(data, function(d) { return d.assists; }))
  assistsLines(assistsGroup);

  // Deaths Line Chart
  var deathsGroup = display.append('div').classed('lines-wrap deaths-lines-group', true);
  var deathsLines = d3.chart.lines()
    .data(_deaths(data))
    .xExtent(d3.extent(data, function(d) { return d.id; }))
    .yExtent(d3.extent(data, function(d) { return d.deaths; }))
  deathsLines(deathsGroup);

  // Kill/Death Ratio Line Chart
  var killDeathsGroup = display.append('div').classed('lines-wrap kill_deaths-lines-group', true);
  var killDeathsLines = d3.chart.lines()
    .data(_killDeathRatio(data))
    .xExtent(d3.extent(data, function(d) { return d.id; }))
    .yExtent(d3.extent(data, function(d) { return killDeathRatio(d.kills, d.deaths); }))
  killDeathsLines(killDeathsGroup);

  // Kill+Assists/Death Ratio Line Chart
  var killAssistDeathsGroup = display.append('div').classed('lines-wrap kill_assists_deaths-lines-group', true);
  var killAssistDeathsLines = d3.chart.lines()
    .data(_killAssistDeathRatio(data))
    .xExtent(d3.extent(data, function(d) { return d.id; }))
    .yExtent(d3.extent(data, function(d) { return killAssistDeathRatio(d.kills, d.assists, d.deaths); }))
  killAssistDeathsLines(killAssistDeathsGroup);

  // Scores
  var scoresGroup = display.append('div').classed('lines-wrap scores-lines-group', true)
  var scoresLines = d3.chart.lines()
    .data(_scores(data))
    .xExtent(d3.extent(data, function(d) { return d.id; }))
    .yExtent(d3.extent(data, function(d) { return d.score; }))
  scoresLines(scoresGroup);
});
