
import { SteepestDescent1 } from './steepDesc1.js';
import { Newton1 } from './newton1.js'
import { SteepestDescent2} from './steepDesc2.js'


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

//The gradient of our objective function
const gradF = (x) => (4 * x - 9) * x * x;
function fdvalues() {
    const functDataDX = [];
    const functDataDY = [];
    for(let i = 0; i< 2.5; i+= 0.01){
        functDataDX.push(i)
        functDataDY.push(gradF(i))
      }
    return [functDataDX, functDataDY]
}
const fdData = fdvalues();
const fdX = fdData[0];
const fdY = fdData[1];

//Hessian matrix of our objective function
const hessF = (x) => (12*x*x - 18*x)

//Steepest Descent with 1 variable Iteration Values
const sd1Ret = SteepestDescent1(gradF,2);
const sd1X = sd1Ret[1];
const sd1Y = [];
for(let i = 0; i < sd1X.length; i+= 1){
    sd1Y.push(f(sd1X[i]))
}
const sd1Xmin = sd1Ret[0];
const sd1Ymin = f(sd1Xmin);

// Populate steepest descent with 1 variable table
function populateSteep1Table(){
  const steepTable = document.querySelector("#steep1Table")
  for(let i =0; i < sd1X.length/2; i++){
    const steep1Row = document.createElement('tr')

    const steep1RowIter = document.createElement('th')
    steep1RowIter.appendChild(document.createTextNode(i))
    const steep1Rowxk = document.createElement('td')
    steep1Rowxk.appendChild(document.createTextNode(sd1X[i].toFixed(5)))

    const steep1RowIter2 = document.createElement('th')
    steep1RowIter2.appendChild(document.createTextNode(i+21))
    const steep1Rowxk2 = document.createElement('td')
    steep1Rowxk2.appendChild(document.createTextNode(sd1X[i+21].toFixed(5)))
    
    steep1Row.appendChild(steep1RowIter)
    steep1Row.appendChild(steep1Rowxk)
    steep1Row.appendChild(steep1RowIter2)
    steep1Row.appendChild(steep1Rowxk2)
    steepTable.appendChild(steep1Row)
  }
}
populateSteep1Table()
//Newton with 1 variable Iteration Values
const newton1Ret = Newton1(gradF, hessF,2);
const newton1X = newton1Ret[1];
const newton1Y = [];
for(let i = 0; i < newton1X.length; i+= 1){
    newton1Y.push(f(newton1X[i]))
}
const newton1Xmin = sd1Ret[0];
const newton1Ymin = f(newton1Xmin);

//Populate newton method with 1 variable table
function populateNewton1Table(){
  const newton1Table = document.querySelector("#newton1Table")
  for(let i =0; i < newton1X.length; i++){
    const newton1Row = document.createElement('tr')

    const newton1RowIter = document.createElement('th')
    newton1RowIter.appendChild(document.createTextNode(i))
    const newton1Rowxk = document.createElement('td')
    newton1Rowxk.appendChild(document.createTextNode(newton1X[i].toFixed(9)))

    
    newton1Row.appendChild(newton1RowIter)
    newton1Row.appendChild(newton1Rowxk)
    newton1Table.appendChild(newton1Row)
  }
}
populateNewton1Table()

//Our second example function: 0.5x^2 + 5/2y^2
function TestFunc(X, fxprime) {
  fxprime = fxprime || [0, 0];
  var x = X[0], y = X[1];
  fxprime[0] = x;
  fxprime[1] = 5*y;
  return 0.5 *x*x + 2.5 *y*y;
}

//Gradient of the above function
function gradTest(X) {
  var x = X[0], y = X[1];
  return [x, 5*y];
}
//Run Steepest Descent Program with TestFunc and initial points [5,1] and alpha = 1/3
var steep2Ret = SteepestDescent2(gradTest, [5,1], 0.333)
var steep2XY = steep2Ret[1]

// Create Table for steepest descent with 2 variables
function populateSteep2Table(){
  const steepTable = document.querySelector("#steep2Table")
  for(let i =0; i < steep2XY.length; i++){
    const steep1Row = document.createElement('tr')

    const steep1RowIter = document.createElement('th')
    steep1RowIter.appendChild(document.createTextNode(i))
    const steep1Rowxk = document.createElement('td')
    steep1Rowxk.appendChild(document.createTextNode(steep2XY[i][0].toFixed(7) + "\u00A0\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0" + steep2XY[i][1].toFixed(7)))
    const steep1F = document.createElement('td')
    steep1F.appendChild(document.createTextNode(TestFunc(steep2XY[i]).toFixed(7)))
    const steep1gradF = document.createElement('td')
    steep1gradF.appendChild(document.createTextNode(gradTest(steep2XY[i])[0].toFixed(7)+ "\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0\u00A0"+gradTest(steep2XY[i])[1].toFixed(7) ))
    steep1Row.appendChild(steep1RowIter)
    steep1Row.appendChild(steep1Rowxk)
    steep1Row.appendChild(steep1F)
    steep1Row.appendChild(steep1gradF)
    steepTable.appendChild(steep1Row)
  }
}
populateSteep2Table()
// store x and y values at each iteration separately for plots.
var steep2X = [];
var steep2Y = [];
for(let i = 0; i < steep2XY.length; i++){
  steep2X.push(steep2XY[i][0])
  steep2Y.push(steep2XY[i][1])
}

//Steepest Descent with 2 variables with alpha = 0.1
try {
  SteepestDescent2(gradTest, [5,1], 0.1)
} catch(err) {
  console.log(err)
}

//Steepest Descent with 2 variables with alpha = 0.66
try {
  SteepestDescent2(gradTest, [5,1], 0.66)
} catch(err) {
  console.log(err)
}


// Plots
var functionGraph = {
    x: fX,
    y: fY,
    type: 'scatter',
    name: 'f(x)'
  };
  var gradientGraph = {
    x: fdX,
    y: fdY,
    type: 'scatter',
    name: "f'(x)"
  };

  var gradientGraphRoot = {
    x: [sd1Xmin],
    y: [0],
    type: 'scatter',
    mode: 'markers',
    name: "root",
    marker: {
        size: 20,
        color: 'green',
        line: {
          color: 'black',
          width: 0.5
        }
    }
  };
  var steepest1DescentMethod = {
    x: sd1X,
    y: sd1Y,
    mode: 'markers',
    type: 'scatter',
    name: 'iteration values',
    marker: {
        size: 15,
        line: {
          color: 'black',
          width: 0.5
        }
    }
  };
  var gradientDescentMin = {
    x: [sd1Xmin], 
    y: [sd1Ymin],
    mode:'markers',
    type:'scatter',
    name: "minimum point",
    marker: {
        size: 15,
        line: {
          color: 'black',
          width: 0.5
        }
    }
  };

  var newtonMethod = {
    x: newton1X,
    y:  newton1Y,
    type: 'scatter',
    name: 'iteration values',
    marker: {
        size: 15,
        line: {
          color: 'black',
          width: 0.5
        }
    }
  }

  var newtonMin = {
    x: [newton1Xmin], 
    y: [newton1Ymin],
    mode:'markers',
    type:'scatter',
    name: "minimum point",
    marker: {
        size: 15,
        line: {
          color: 'black',
          width: 0.5
        }
    }
  };
  var GradientGraphlayout = {
    title: 'Gradient Graph',
    autosize: true,
    font: {
        family: 'Courier New, monospace',
        size: 24,
        color: 'black'
      },
    height: 700,
    automargin:true,
    paper_bgcolor: '#fffff1 ',
    plot_bgcolor: 'beige'
  };
  var SteepestDescent1layout = {
    title: 'Steepest Descent Method',
    autosize: true,
    font: {
        family: 'Courier New, monospace',
        size: 24,
        color: 'black'
      },
    height: 800,
    automargin:true,
    paper_bgcolor: '#fffff1 ',
    plot_bgcolor: 'beige',
    xaxis: {
      range: [1.5, 2.5],
      autorange: false
    },
    yaxis: {
      range: [-7, -4],
      autorange: false
    },
  };
  var Newton1layout = {
    title: 'Newton Method',
    autosize: true,
    font: {
        family: 'Courier New, monospace',
        size: 24,
        color: 'black'
      },
    height: 800,
    automargin:true,
    paper_bgcolor: '#fffff1 ',
    plot_bgcolor: 'beige',
    xaxis: {
      range: [1.5, 2.5],
      autorange: false
    },
    yaxis: {
      range: [-7, -4],
      autorange: false
    },
  };
  var steep2Data = 
  {
    // z: steep2Z,
    x: steep2X,
    y: steep2Y,
    type: 'markers',
    name: 'iteration values'
  };

  var steep2DataStartEnd = {
    x: [5],
    y: [1],
    type: 'scatter',
    mode: 'markers',
    name: 'start'
  }
  var contourLayout = {
    title: 'Iteration Values',
    autosize: true,
    font: {
        family: 'Courier New, monospace',
        size: 24,
        color: 'black'
      },
    height: 700,
    automargin:true,
    paper_bgcolor: '#fffff1 ',
    plot_bgcolor: 'beige',
    xaxis: {
      range: [-6, 6],
      autorange: false
    },
    yaxis: {
      range: [-2, 2],
      autorange: false
    },
  
  }
  var newtonPlotLayout = {
    title: 'Iteration Values',
    autosize: true,
    font: {
        family: 'Courier New, monospace',
        size: 24,
        color: 'black'
      },
    height: 700,
    automargin:true,
    paper_bgcolor: '#fffff1 ',
    plot_bgcolor: 'beige',
    xaxis: {
      range: [-1, 6],
      autorange: false
    },
    yaxis: {
      range: [-1, 2],
      autorange: false
    },
  
  }

var newton2Data = {
  x: [5, 0],
  y: [1, 0],
  type: 'markers', 
  name: 'iteration values'
}
  var data1 = [gradientGraph, gradientGraphRoot ];
  var data2 = [functionGraph,  steepest1DescentMethod, gradientDescentMin];
  var data3 = [functionGraph, newtonMethod, newtonMin]

  Plotly.newPlot('Gradient Graph', data1, GradientGraphlayout);
  Plotly.newPlot('Steepest Descent 1 Variable', data2, SteepestDescent1layout);
  Plotly.newPlot('Newton Method 1 Variable', data3, Newton1layout);
  Plotly.newPlot('conPlot', [steep2Data, steep2DataStartEnd], contourLayout);
  Plotly.newPlot('newton2Plot', [newton2Data], newtonPlotLayout)


  