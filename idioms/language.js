const params = new URLSearchParams(window.location.search);
var language = params.get("LG");
if (language != "EN" && language != "PT") language = "EN";
switch (language) {
  case "EN":
    document.title = "Gun Violence Dashboard";
    break;
  case "PT":
    document.title = "Painel de Violencia Armada";
    break;
  default:
    document.title = "Gun Violence Dashboard";
    break;
}

const hexagonMap = {
  title: {
    EN: "Hexagon Map: Average wine score per year",
    PT: "Mapa de Hexágonos: Pontuação média de vinho por ano",
  },
  yAxis: {
    EN: "Average score",
    PT: "Pontuação Média",
  },
  xAxis: {
    EN: "Year",
    PT: "Ano",
  },
  info: {
    EN: "Average score: ",
    PT: "Pontuação Média: ",
  },
};

const lineChart = {
  title: {
    EN: "Line Chart: Average wine score per year",
    PT: "Gráfico de linhas: Pontuação média de vinho por ano",
  },
  yAxis: {
    EN: "Average score",
    PT: "Pontuação Média",
  },
  xAxis: {
    EN: "Year",
    PT: "Ano",
  },
  info: {
    EN: "Average score: ",
    PT: "Pontuação Média: ",
  },
};

const scatterPlot = {
  title: {
    EN: "Scatter Plot: Average wine score per year",
    PT: "Gráfico de Dispersão: Pontuação média de vinho por ano",
  },
  yAxis: {
    EN: "Average score",
    PT: "Pontuação Média",
  },
  xAxis: {
    EN: "Year",
    PT: "Ano",
  },
  info: {
    EN: "Average score: ",
    PT: "Pontuação Média: ",
  },
};
