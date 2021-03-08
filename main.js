import { Bisect } from './bisect.js';

//Our objective function graph values;
const f = (x) =>  x*x*x*x-3*x*x*x+2;
function fvalues() {
    const functDataX = [];
    const functDataY = [];
    for(let i = 0; i< 2.5; i+= 0.01){
        functDataX.push(i)
        functDataY.push(f(i))
      }
    return [functDataX, functDataY]
}
const fData = fvalues();
const fX = fData[0];
const fY = fData[1];


//Bisection iteration values
const bisectRet = Bisect(f,0.5,2);
const bisectX = bisectRet[1];
const bisectY = [];
for(let i = 0; i < bisectX.length; i+= 1){
    bisectY.push(f(bisectX[i]))
}

//Create bisection table 
function populateBisectionTable(){
  const bisectTable = document.querySelector("#bisectionTable")
  for(let i =0; i < bisectX.length/2; i++){
    const bisectRow = document.createElement('tr')
    const bisectRowIter = document.createElement('th')
    bisectRowIter.appendChild(document.createTextNode(i))
    const bisectRowC = document.createElement('td')
    bisectRowC.appendChild(document.createTextNode(bisectX[i].toFixed(11)))
    const bisectRowfC = document.createElement('td')
    bisectRowfC.appendChild(document.createTextNode(f(bisectX[i].toFixed(11))))

    const bisectRowIter2 = document.createElement('th')
    bisectRowIter2.appendChild(document.createTextNode(i+17))
    const bisectRowC2 = document.createElement('td')
    bisectRowC2.appendChild(document.createTextNode(bisectX[i+17].toFixed(11)))
    const bisectRowfC2 = document.createElement('td')
    bisectRowfC2.appendChild(document.createTextNode(f(bisectX[i+1].toFixed(11))))

    bisectRow.appendChild(bisectRowIter)
    bisectRow.appendChild(bisectRowC)
    bisectRow.appendChild(bisectRowfC)
    bisectRow.appendChild(bisectRowIter2)
    bisectRow.appendChild(bisectRowC2)
    bisectRow.appendChild(bisectRowfC2)
    bisectTable.appendChild(bisectRow)
  }
}
populateBisectionTable();

// Plots
var functionGraph = {
    x: fX,
    y: fY,
    type: 'scatter',
    name: 'f(x)'
  };

  var bisectionMethod = {
    x: bisectX,
    y: bisectY,
    mode: 'markers',
    type: 'scatter',
    name: "iteration values",
    marker: {
        size: 15,
        line: {
          color: 'black',
          width: 0.5
        }
    }
  };

var Bisectionlayout = {
    title: 'Bisection Method',
    autosize: true,
    font: {
        family: 'Courier New, monospace',
        size: 24,
        color: 'black'
      },
    height: 1000,
    automargin:true,
    paper_bgcolor: '#fffff1 ',
    plot_bgcolor: 'beige',
    xaxis: {
      range: [0.5, 1.5],
      autorange: false
    },
    yaxis: {
      range: [-2, 2],
      autorange: false
    },
  };

  var data0 = [functionGraph, bisectionMethod]
  Plotly.newPlot('Bisect', data0, Bisectionlayout);
  //


  