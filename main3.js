import { SteepestDescentLineSearch} from './steepestDescent.js'
import { SteepestDescent2} from './steepDesc2.js'
import { Newton2 } from './newton2.js'

//Rosenbrock function
function Rosenbrock(X, fp) {
  fp = fp || [0, 0];
  var x = X[0], y = X[1];
  fp[0] = 400 * x * x * x - 400 * y * x + 2 * x - 2;
  fp[1] = 200 * y - 200 * x * x;
  return (1 - x) * (1 - x) + 100 * (y - x * x) * (y - x * x);
}
//Gradient of the rosenbrock fuction
function gradRosenbrock(X) {
  var x = X[0], y = X[1];
  return [400 * x * x * x - 400 * y * x + 2 * x - 2, 200 * y - 200 * x * x]
}

function hessRosenbrock(X) {
  var x=X[0], y= X[1];
  return[
    [2+800*x*x+400*(x*x-y), -400*x],
    [-400*x, 200]
  ]
}
//Run steepestdescent method with rosenbrock function, with the default alpha value of 0.001, and a tolerance of 0.00001
try{
  console.log("Rosenbrock with Steepest Descent:")
  console.log("alpha = 0.001")
  SteepestDescent2(gradRosenbrock, [-1,1], 0.001, 0.00001)
} catch(err){
    console.log('Error: Too many iterations')
}
//Run steepestdescent method with rosenbrock function, with alpha value of 0.01 with default tolerance value

try{
  console.log("Rosenbrock with Steepest Descent:")
  console.log("alpha = 0.01")
  SteepestDescent2(gradRosenbrock, [-1,1], 0.01)

} catch(err){
    console.log('Error: Too many iterations')
}

var SteepestDescentLineRet = SteepestDescentLineSearch(Rosenbrock, [-1,1]);
console.log("Rosenbrock with wolfe line search: " + SteepestDescentLineRet.x);

// Contour plot values of rosenbrock function
var zArr = [];
var xArr = [-2, -1, 0, 1, 2];
var yArr = [-2, -1, 0, 1, 2];
for(let i = -2; i<= 2; i++){
  var zsubArr = [];
  for(let j = -2; j <= 2; j++){
    zsubArr.push(Rosenbrock([i,j]))
  }
  zArr.push(zsubArr)
}

// Newton with 2 variables on rosenbrock with initial guess of [-1,1]
const newton2ret = Newton2(gradRosenbrock, hessRosenbrock, [-1,1])
const newton2XY = newton2ret[1];
const newton2X = [];
const newton2Y = [];
//Create and display table of Newton2 Rosenbrock values
function populateNewton1Table(){
  const newton2Table = document.querySelector("#newton2Table")
  for(let i =0; i < newton2XY.length; i++){
    const newton2Row = document.createElement('tr')
    const newton2RowIter = document.createElement('th')
    newton2RowIter.appendChild(document.createTextNode(i))
    const newton2Rowxk = document.createElement('td')
    newton2Rowxk.appendChild(document.createTextNode(newton2XY[i][0] + "\u00A0\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0" + newton2XY[i][1]))
    newton2X.push(newton2XY[i][0])
    newton2Y.push(newton2XY[i][1])
    newton2Row.appendChild(newton2RowIter)
    newton2Row.appendChild(newton2Rowxk)
    newton2Table.appendChild(newton2Row)
  }
}
populateNewton1Table()

// Plot
  var threeddata = 
  {
    z: zArr,
    x: xArr,
    y: yArr,
    type: 'contour',
    contours: {
      start: 0,
      end:  3600,
      size: 100
    },
    dx: 10,
    x0: 5,
    dy: 10,
    y0: 10
  };

var rosenbrocklayout = {
  title: 'Rosenbrock Contour',
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

}
var newton2Data = 
{
  x: newton2X,
  y: newton2Y,
  type: 'markers',
  name: 'iteration values',
  marker: {
    size: 10,
    line: {
      color: 'black',
      width: 0.5
    }
}
};
var newton2Start ={
  x: [-1],
  y: [1],
  mode:'markers',
  type:'scatter',
  name: "start",
  marker: {
      size: 10,
      color: 'green',
      line: {
        color: 'black',
        width: 0.5
      }
  }
}
var newton2Min = {
  x: [1], 
  y: [1],
  mode:'markers',
  type:'scatter',
  name: "minimum",
  marker: {
      size: 10,
      color: 'orange',
      line: {
        color: 'black',
        width: 0.5
      }
  }
};
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
    range: [-2, 2],
    autorange: false
  },
  yaxis: {
    range: [-4, 4],
    autorange: false
  },

}


  Plotly.newPlot('3dplot', [threeddata], rosenbrocklayout);
  Plotly.newPlot('newton2Plot', [newton2Data, newton2Start,newton2Min], contourLayout);
  