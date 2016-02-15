d3.json('matches.json', function(err, matches) {
  var data = matches.matches;
  var display = d3.select('.js-display');
  var svg = d3.select('svg');

  // Table
  var tdiv = display.append('div').classed('table-wrap', true);
  var table = d3.chart.table();
  table.data(data);
  table(tdiv);

  // Wins Losses Pie Chart
  function processWinsLosses(data) {
    var wins = 0,
        losses = 0,
        results = [];
    data.forEach(function(d) {
      return d.score == 5 ? wins++ : losses++;
    });
    results.push({ "label": "Wins", "value": wins })
    results.push({ "label": "Losses", "value": losses })
    return results;
  }
  var winsLossesGroup = svg.append('g').classed('win_loss_pie-group', true);
  var winsLossesPie = d3.chart.pie()
    .data(processWinsLosses(data))
    .width(200);
  winsLossesPie(winsLossesGroup);

  // Matches Per Class Pie Chart
  function processMatchesPerClass(data) {
    var hunters = 0,
        warlocks = 0,
        titans = 0,
        classes = [];

    data.forEach(function(d) {
      if (d.class == 'Hunter') {
        return hunters++;
      } else if (d.class == 'Warlock') {
        return warlocks++;
      } else if (d.class == 'Titan') {
        return titans++;
      }
    });

    if (hunters > 0) {
      classes.push({ "label": "Hunter", "value": hunters })
    }
    if (warlocks > 0) {
      classes.push({ "label": "Warlock", "value": warlocks })
    }
    if (titans > 0) {
      classes.push({ "label": "Titan", "value": titans })
    }

    return classes;
  }
  var matchesPerClassGroup = svg.append('g').classed('matches_per_class_pie-group', true)
  matchesPerClassGroup.attr('transform', 'translate(220, 0)')
  var matchesPerClassPie = d3.chart.pie()
    .data(processMatchesPerClass(data))
    .width(200);
  matchesPerClassPie(matchesPerClassGroup);

  // Matches Per Partner Pie Chart
  function processMatchesPerPartner(data) {
    var names = [],
        namesCount = {},
        namesDataset = [];

    data.forEach(function(d) {
      if ( names.indexOf(d.partner) == -1 ) {
        names.push(d.partner);
        namesCount[d.partner] = 1;
      } else {
        namesCount[d.partner]++;
      }
    });

    names.forEach(function(name) {
      namesDataset.push({ "label": name, "value": namesCount[name] });
    });

    return namesDataset;
  }
  var matchesPerPartnerGroup = svg.append('g').classed('matches_per_partner_pie-group', true);
  matchesPerPartnerGroup.attr('transform', 'translate(440, 0)')
  var matchesPerPartnerPie = d3.chart.pie()
    .data(processMatchesPerPartner(data))
    .width(200)
  matchesPerPartnerPie(matchesPerPartnerGroup);

  // Mathces Per Map Pie chart
  function processMatchesPerMap(data) {
    var maps = [],
        mapCount = {},
        mapDataset = [];

    data.forEach(function(d) {
      if ( maps.indexOf(d.map) == -1 ) {
        maps.push(d.map);
        mapCount[d.map] = 1;
      } else {
        mapCount[d.map]++;
      }
    });

    maps.forEach(function(map) {
      mapDataset.push({
        "label": map,
        "value": mapCount[map]
      });
    });

    return mapDataset;
  }
  var matchesPerMapGroup = svg.append('g').classed('matches_per_map_pie-group', true);
  matchesPerMapGroup.attr('transform', 'translate(660, 0)')
  var matchesPerMapPie = d3.chart.pie()
    .data(processMatchesPerMap(data))
    .width(200)
  matchesPerMapPie(matchesPerMapGroup);

  // Kills Line Chart
  function processKills(data) {
    var kills = [];

    data.forEach(function(d) {
      kills.push({
        x: d.id,
        y: d.kills
      });
    });

    return kills;
  }
  var killsGroup = svg.append('g').classed('kills-lines-group', true);
  killsGroup.attr('transform', 'translate(30, 220)')
  var killLines = d3.chart.lines()
    .data(processKills(data))
    .xExtent(d3.extent(data, function(d) { return d.id; }))
    .yExtent(d3.extent(data, function(d) { return d.kills; }))
  killLines(killsGroup);

  // Assists Line Chart
  function processAssists(data) {
    var assists = [];

    data.forEach(function(d) {
      assists.push({
        x: d.id,
        y: d.assists
      });
    });

    return assists;
  }
  var assistsGroup = svg.append('g').classed('assists-lines-group', true);
  assistsGroup.attr('transform', 'translate(480, 220)')
  var assistsLines = d3.chart.lines()
    .data(processAssists(data))
    .xExtent(d3.extent(data, function(d) { return d.id; }))
    .yExtent(d3.extent(data, function(d) { return d.assists; }))
  assistsLines(assistsGroup);

  // Deaths Line Chart
  function processDeaths(data) {
    var deaths = [];

    data.forEach(function(d) {
      deaths.push({
        x: d.id,
        y: d.deaths
      });
    });

    return deaths;
  }
  var deathsGroup = svg.append('g').classed('deaths-lines-group', true);
  deathsGroup.attr('transform', 'translate(30, 480)')
  var deathsLines = d3.chart.lines()
    .data(processDeaths(data))
    .xExtent(d3.extent(data, function(d) { return d.id; }))
    .yExtent(d3.extent(data, function(d) { return d.deaths; }))
  deathsLines(deathsGroup);

  // Kill/Death Ratio Line Chart
  function killDeathRatio(kills, deaths) {
    deaths = deaths == 0 ? 1 : deaths;
    return parseFloat((kills / deaths).toFixed(2));
  }
  function processKillDeathRatio(data) {
    var kDRatios = [];
    data.forEach(function(d) {
      kDRatios.push({
        x: d.id,
        y: killDeathRatio(d.kills, d.deaths)
      });
    });
    return kDRatios;
  }
  var killDeathsGroup = svg.append('g').classed('kill_deaths-lines-group', true);
  killDeathsGroup.attr('transform', 'translate(480, 480)')
  var killDeathsLines = d3.chart.lines()
    .data(processKillDeathRatio(data))
    .xExtent(d3.extent(data, function(d) { return d.id; }))
    .yExtent(d3.extent(data, function(d) { return killDeathRatio(d.kills, d.deaths); }))
  killDeathsLines(killDeathsGroup);

  // Kill+Assists/Death Ratio Line Chart
  function killAssistDeathRatio(kills, assists, deaths) {
    deaths = deaths == 0 ? 1 : deaths;
    return parseFloat(((kills + assists) / deaths).toFixed(2));
  }
  function processKillAssistDeathRatio(data) {
    var kADRatios = [];
    data.forEach(function(d) {
      kADRatios.push({
        x: d.id,
        y: killAssistDeathRatio(d.kills, d.assists, d.deaths)
      });
    });
    return kADRatios;
  }
  var killAssistDeathsGroup = svg.append('g').classed('kill_assists_deaths-lines-group', true);
  killAssistDeathsGroup.attr('transform', 'translate(30, 740)')
  var killAssistDeathsLines = d3.chart.lines()
    .data(processKillAssistDeathRatio(data))
    .xExtent(d3.extent(data, function(d) { return d.id; }))
    .yExtent(d3.extent(data, function(d) { return killAssistDeathRatio(d.kills, d.assists, d.deaths); }))
  killAssistDeathsLines(killAssistDeathsGroup);
});
