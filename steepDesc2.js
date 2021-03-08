//Steepest Descent in 2 Variable
export function SteepestDescent2(
    gradF, // the gradient function 
    x0 = [0,0], // the initial starting point we will use to find the minim
    alpha = 0.001,  // step size
    tolerance = 0.0001,  //  precision 
    maxIterations = 100000, // max number of iterations allowed to prevent hanging
    ) 
    {
      let steep2XY = [];
      let pk = 2 * tolerance
      let iteration = 0
      let x = x0
      steep2XY.push(x)
      while (true) {
        pk = alpha * gradF(x)[0]
        let x1 = x[0] - alpha * gradF(x)[0]
        let x2 = x[1] - alpha * gradF(x)[1]
        x = [x1 , x2]
        iteration++
        steep2XY.push(x)
        if (iteration > maxIterations) throw Error("Too many iterations")
        if (Math.abs(pk) < tolerance) {
          console.log('Steepest Descent with 2 variables')
          console.log(`Minimum occurs at ${x}`)
          console.log(`Iterations: ${iteration}`)
          return [x, steep2XY] //return the minimum and all the iteration values
    }
  }
}