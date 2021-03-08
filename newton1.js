//Newton Method Line search in 1 Variable
export function Newton1(
    gradF, // gradient of our function
    hessianF, // hessian of our function 
    x0 = 0, // the initial starting point we will use to find the minim
    maxIterations = 1000, // max number of iterations allowed to prevent hanging
    tolerance = 0.00001,  //  tolerance
    alpha = 1  // step size that is preset to 1
    ) 
    {
      let newton1X = [];
      let pk = 2 * tolerance // search direction
      let iteration = 0
      let x = x0
      newton1X.push(x)
      while (true) {
        pk = alpha * (gradF(x)/hessianF(x)) // our search direction
        x -= pk
        iteration++
        newton1X.push(x)
        if (iteration > maxIterations) throw Error("Too many iterations")
        if (Math.abs(pk) < tolerance) { // check to make sure that its sufficiently large enough change at each step
          console.log(`Newton Method with 1 Variable`)
          console.log(`Minimum occurs at ${x}`)
          console.log(`Iterations: ${iteration}`)
          return [x,newton1X]//return the minimum and all the iteration values
    }
  }
}