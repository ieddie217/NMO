//Rosenbrock function
import { cauchyPoint, rhoK } from './cauchypoint.js'
import { TrustRegion } from './trustregion.js'
function Branin(X, fp) {
    fp = fp || [0, 0];
    var x = X[0], y = X[1];
    fp[0] = 2*(1.61-0.258*x)*(-0.129*x*x + 1.61*x + y - 6)-6.07*Math.sin(x);
    fp[1] = 2*(-0.129*x*x+1.61*x+y-6);
    return (y-0.129*x*x+1.61*x-6)*(y-0.129*x*x+1.61*x-6) + 6.07*Math.cos(x)+10
  }
  //Gradient of the rosenbrock fuction
  function gradBranin(X) {
    var x = X[0], y = X[1];
    return [2*(1.61-0.258*x)*(-0.129*x*x + 1.61*x + y - 6)-6.07*Math.sin(x), 2*(-0.129*x*x+1.61*x+y-6)]
  }
  function hessBranin(X) {
    var x=X[0], y= X[1];
    return[
      [2*(1.61-0.258*x)*(1.61-0.258*x)-0.516*(-0.129*x*x+1.61*x+y-6)-6.07*Math.cos(x), 2*(1.61-0.258*x)],
      [ 2*(1.61-0.258*x), 2]
    ]
  }

  const cpRet = cauchyPoint(gradBranin, hessBranin, [6,14], 2.0)
  console.log(`Cauchy Point calculated: pk = ${cpRet[1]}, ||pk|| = ${cpRet[0]}`)
console.log(`rhok = ${rhoK([6,14], cpRet[1], Branin, gradBranin, hessBranin)}`)
console.log(`x1 = ${[(6+parseFloat(cpRet[1][0])).toFixed(7),(14+parseFloat(cpRet[1][1])).toFixed(7)]}`)

let tr2x = [6, 5.747, 4.8, 1.668, 1.668, 2.887, 2.594, 3.063, 2.920, 3.108, 3.046, 3.127, 3.101, 3.135, 3.124, 3.139, 3.134, 3.140, 3.138]
let tr2y = [14, 12.015, 8.132, 4.235, 4.235, 3.956, 3.109, 2.958, 2.635, 2.556, 2.414, 2.380, 2.318, 2.304, 2.277, 2.271, 2.260, 2.257, 2.252]
let rhok = [0.999, 0.980, 0.578, -0.160, 0.729, 0.989, 0.956, 0.992, 0.996, 0.996, 1.001, 0.998, 1.001, 0.999, 1.000, 1.000, 1.000, 1.000, 1.000]
let deltak = [2, 4, 5, 5, 1.25, 1.25, 1.25, 1.25, 1.25, 1.25, 1.25, 1.25, 1.25, 1.25, 1.25, 1.25, 1.25, 1.25, 1.25 ]
let normpk = [2, 4, 5, 2.474, 1.250, 0.897, 0.493, 0.353, 0.204, 0.154, 0.088, 0.067, 0.038, 0.029, 0.016, 0.012, 0.007, 0.005, 0.003]

function populateTrustRegionTable(){
  const trustTable = document.querySelector("#trustRegionTable")
  for(let i =0; i < tr2x.length; i++){
    const trustRow = document.createElement('tr')

    const trustRowIter = document.createElement('th')
    trustRowIter.appendChild(document.createTextNode(i))
    const trustRowxk = document.createElement('td')
    trustRowxk.appendChild(document.createTextNode(tr2x[i].toFixed(3)+ "\u00A0\u00A0\u00A0\u00A0 \u00A0\u00A0\u00A0" +tr2y[i].toFixed(3)))
    const trustRowrho = document.createElement('td')
    trustRowrho.appendChild(document.createTextNode(rhok[i].toFixed(3)))
    const trustRowdelta = document.createElement('td')
    trustRowdelta.appendChild(document.createTextNode(deltak[i].toFixed(3)))
    const trustRownorm = document.createElement('td')
    trustRownorm.appendChild(document.createTextNode(normpk[i].toFixed(3)))

    trustRow.appendChild(trustRowIter)
    trustRow.appendChild(trustRowxk)
    trustRow.appendChild(trustRowrho)
    trustRow.appendChild(trustRowdelta)
    trustRow.appendChild(trustRownorm)
    trustTable.appendChild(trustRow)
  }
}
populateTrustRegionTable()