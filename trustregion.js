import { cauchyPoint, rhoK } from './cauchypoint.js'

//Trust Region using Cauchy Point  search in 2 Variable.
export function TrustRegion(
    f, //objective function
    gradF, // gradient of our function
    hessianF, // hessian of our function 
    x0 = [0,0], // the initial starting point we will use to find the minim
    deltak = 2.0, //starting deltak value
    deltaM = 5.0, //upper bound of delta,
    eta = 0.2,
    maxIterations = 1000, // max number of iterations allowed to prevent hanging
    tolerance = 0.000001,  //  tolerance
    ) 
    {

    let x= x0;
    let iteration = 0;
    while(true) {
        let cPret = cauchyPoint(gradF, hessianF, x, deltak)
        let pk = cPret[1];
        let normpk = cPret[0]
        let rho = rhoK(x, pk, f, gradF, hessianF)
        iteration++
        if(rho <= 0.75){
            deltak = 0.75*deltak
        } else {
            if(rho > 0.75 && normpk.toFixed(5) == deltak.toFixed(5)){
                deltak = Math.min(2*deltak, deltaM)
            } 
        }
        if( rho > eta){
            x = [parseFloat(x[0]) + parseFloat(pk[0]), parseFloat(x[1]) + parseFloat(pk[1])]
        } 
        if (iteration > maxIterations) throw Error("Too many iterations")
        if (Math.abs(normpk < tolerance)){
            return x
        }
    }

}
