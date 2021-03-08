//Newton Method Line search in 2 Variable
export function Newton2(
    gradF, // gradient of our function
    hessianF, // hessian of our function 
    x0 = [0,0], // the initial starting point we will use to find the minim
    maxIterations = 1000, // max number of iterations allowed to prevent hanging
    tolerance = 0.0000000000001,  //  tolerance
    ) 
    {
      let newton2XY = [];
      let pk = 2 * tolerance
      let iteration = 0
      let x = x0
      newton2XY.push(x)
      while (true) {
        //Calculate pk at each iteration
        pk = math.multiply(inverseHess(hessianF(x)), gradF(x)) 
        //update xk
        x = [parseFloat(x[0]) - parseFloat(pk[0]), parseFloat(x[1]) - parseFloat(pk[1])]
        iteration++
        newton2XY.push(x)
        if (iteration > maxIterations) throw Error("Too many iterations")
        // Repeat process until smaller than tolerance
        if (Math.abs(pk[0]) < tolerance && Math.abs(pk[1]) < tolerance) {
          console.log(`Newton Method with 2 Variable`)
          console.log(`Minimum occurs at ${x}`)
          console.log(`Iterations: ${iteration}`)
          return [x,newton2XY] //return the minimum and all the iteration values
        }          
      }
}

//helper function to calculate the inverse of a 2x2 matrix
function inverseHess(X) {
  var a = X[0][0]
  var b = X[0][1]
  var c = X[1][0]
  var d = X[1][1]
  let determinant = a*d - b*c;
  var newX0 = X[0].map(function(x) { return x * (1/determinant); });
  var newX1 = X[1].map(function(x) { return x * (1/determinant); });
  return [
    [newX1[1], -newX1[0]],
    [-newX0[1], newX0[0]]
  ]
}