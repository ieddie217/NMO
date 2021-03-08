//Steepest Descent in 1 Variable
export function SteepestDescent1(
    gradF, // the gradient function 
    x0 = 0, // the initial starting point we will use to find the minim
    alpha = 0.01,  // step size (variable)
    maxIterations = 1000, // max number of iterations allowed to prevent hanging
    tolerance = 0.00001  //  precision
    ) 
    {
      let step1X = [];
      let pk = 2 * tolerance
      let iteration = 0
      let x = x0
      step1X.push(x)
      while (true) {
        pk = alpha * gradF(x) // search direction
        x -= pk
        iteration++
        step1X.push(x)
        if (iteration > maxIterations) throw Error("Too many iterations")
        if (Math.abs(pk) < tolerance) {
          console.log('Steepest Descent with 1 variable')
          console.log(`Minimum occurs at ${x}`)
          console.log(`Iterations: ${iteration}`)
          return [x, step1X] //return the minimum and all the iteration values
    }
  }
}