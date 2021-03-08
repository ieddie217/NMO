//calculate 2 norm
 export function twonorm(a)  {
    return Math.sqrt(dotprod(a, a));
}

//calculate dot product
export function dotprod(a, b) {
    var dp = 0;
    for (var i = 0; i < a.length; ++i) {
        dp = dp +  a[i] * b[i];
    }
    return dp;
}


//returns the cauchy point info as both the norm and array
export function cauchyPoint(gradF, hessF, xk, deltaK){
    let gk = gradF(xk);
    let Bk = hessF(xk);
    let tk = 1;

    let gkBk = [parseFloat(gk[0])*parseFloat(Bk[0][0]) + parseFloat(gk[1])*parseFloat(Bk[1][0]),
    parseFloat(gk[0])*parseFloat(Bk[0][1]) + parseFloat(gk[1])*parseFloat(Bk[1][1])]

    let gkBkgk = [parseFloat(gkBk[0])*parseFloat(gk[0])+parseFloat(gkBk[1])*parseFloat(gk[1])]
    if(gkBkgk > 0){

        tk = Math.min(twonorm(gk)*twonorm(gk)*twonorm(gk)/deltaK*gkBkgk,1)
    } 
    let scalar= -1*tk*(deltaK/twonorm(gk));
    return [twonorm([parseFloat(gk[0])*scalar, parseFloat(gk[1])*scalar]), [parseFloat(gk[0])*scalar, parseFloat(gk[1])*scalar]];
}

//model function for trust region
export function modelBranin(xk, p, Branin, gradBranin, hessBranin) {
    let gradB = gradBranin(xk)
    let Bk = hessBranin(xk)
    let fB = Branin(xk) 
    let gktp = (parseFloat(p[0])*parseFloat(gradB[0]) + parseFloat(p[1])*parseFloat(gradB[1]));
    let ptBk = [parseFloat(p[0])*parseFloat(Bk[0][0]) + parseFloat(p[1])*parseFloat(Bk[1][0]),
    parseFloat(p[0])*parseFloat(Bk[0][1]) + parseFloat(p[1])*parseFloat(Bk[1][1])]
    let ptBkp = parseFloat(ptBk[0])*parseFloat(p[0])+ parseFloat(ptBk[1])*parseFloat(p[1])
    let halfptBkp = ptBkp*0.5
    return fB + gktp + halfptBkp
}

//calculate rho value for trust region
export function rhoK(xk, pk, f, gradF, hessF ){
    let xkpluspk = [parseFloat(xk[0])+parseFloat(pk[0]),parseFloat(xk[1])+parseFloat(pk[1])]
    let numerator = f(xk) - f(xkpluspk);
    let denominator = modelBranin(xk, [0,0], f, gradF, hessF) - modelBranin(xk, pk, f, gradF,hessF)
    return numerator/denominator
}