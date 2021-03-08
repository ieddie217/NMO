//Bisection method:
export function Bisect(f, a, b) {
    let bisectX = [];
    var maxIterations = 100,
        tolerance =  1e-10,
        fA = f(a),
        fB = f(b)
    //Check for alternating signs
    if (fA * fB > 0) {
        throw "Must have alternating signs";
    }
    // Check non zeroes
    if (fA === 0) return a;
    if (fB === 0) return b;
    //c is midpoint
    let c = 0;
    for (var i = 0; i < maxIterations; ++i) {
        c = (a+b)/2;
        let fC = f(c);
        // Replace one of a or b with c, depending on sign of c
        if (fC * fA < 0) {
          b = c;
          //add to array for later
          bisectX.push(c)
        }
        else {
          a = c;
          //add to array for later
          bisectX.push(c)
        }
        if ((Math.abs(b-a) < tolerance) || (fC === 0)) {
            console.log('Bisection Method');
            console.log(`Root occurs at ${c}`)
            return [c, bisectX];
        }
    }
    return [c,bisectX];
  }
