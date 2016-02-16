/*
 * Data Processes
 * Functions used to create the proper datasets for various visualizations
**/

// Wins vs Losses
function _winsLosses(data) {
  var wins = 0,
      losses = 0,
      results = [];

  data.forEach(function(d) {
    return d.score == 5 ? wins++ : losses++;
  });

  results.push({
    "label": "Wins",
    "value": wins
  })

  results.push({
    "label": "Losses",
    "value": losses
  })

  return results;
}

// Matches/Class
function _matchesPerClass(data) {
  var hunter = 0,
      warlock = 0,
      titan = 0,
      classes = [];

  data.forEach(function(d) {
    if (d.class == 'Hunter') {
      return hunter++;
    } else if (d.class == 'Warlock') {
      return warlock++;
    } else if (d.class == 'Titan') {
      return titan++;
    }
  });

  if (hunter > 0) {
    classes.push({
      "label": "Hunter",
      "value": hunter
    });
  }

  if (warlock > 0) {
    classes.push({
      "label": "Warlock",
      "value": warlock
    });
  }

  if (titan > 0) {
    classes.push({
      "label": "Titan",
      "value": titan
    });
  }

  return classes;
}

// Matches/Partner
function _matchesPerPartner(data) {
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

// Matches/Map
function _matchesPerMap(data) {
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

// Kills
function _kills(data) {
  var kills = [];

  data.forEach(function(d) {
    kills.push({
      x: d.id,
      y: d.kills
    });
  });

  return kills;
}

// Assists
function _assists(data) {
  var assists = [];

  data.forEach(function(d) {
    assists.push({
      x: d.id,
      y: d.assists
    });
  });

  return assists;
}

// Deaths
function _deaths(data) {
  var deaths = [];

  data.forEach(function(d) {
    deaths.push({
      x: d.id,
      y: d.deaths
    });
  });

  return deaths;
}

// Kill/Death Ratios
function _killDeathRatio(data) {
  var kDRatios = [];

  data.forEach(function(d) {
    kDRatios.push({
      x: d.id,
      y: killDeathRatio(d.kills, d.deaths)
    });
  });

  return kDRatios;
}

// Kill+Assist/Death Ratios
function _killAssistDeathRatio(data) {
  var kADRatios = [];
  data.forEach(function(d) {
    kADRatios.push({
      x: d.id,
      y: killAssistDeathRatio(d.kills, d.assists, d.deaths)
    });
  });
  return kADRatios;
}

// Score
function _scores(data) {
  var scores = [];

  data.forEach(function(d) {
    scores.push({
      x: d.id,
      y: d.score
    });
  });

  return scores;
}
