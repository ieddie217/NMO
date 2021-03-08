 //basic helper functions
 export function twonorm(a)  {
    return Math.sqrt(dotprod(a, a));
}

export function dotprod(a, b) {
    var dp = 0;
    for (var i = 0; i < a.length; ++i) {
        dp = dp +  a[i] * b[i];
    }
    return dp;
}

export function scale(arr, value, scalar) {
    for (var i = 0; i < value.length; ++i) {
        arr[i] = scalar * value[i];
    }
}

export function weightedSum(arr, w1, v1, w2, v2) {
    for (var j = 0; j < arr.length; ++j) {
        arr[j] = w1 * v1[j] + w2 * v2[j];
    }
}

function wolfeLineSearch(f, pk, cur, n, alpha, c1, c2) {
    var p0 = cur.fx, pp0 = dotprod(cur.fxprime, pk),
        p = p0, p_last = p0,
        pp = pp0,
        a0 = 0;
    alpha = alpha || 1;
    c1 = c1 || 1e-5;
    c2 = c2 || 0.1;
    function check(alpha_1, alpha_2, phi_lo) {
        for (var iteration = 0; iteration < 16; ++iteration) {
            alpha = (alpha_1 + alpha_2)/2;
            weightedSum(n.x, 1.0, cur.x, alpha, pk);
            p = n.fx = f(n.x, n.fxprime);
            pp = dotprod(n.fxprime, pk);

            if ((p > (p0 + c1 * alpha * pp0)) ||
                (p >= phi_lo)) {
                alpha_2 = alpha;
            } else  {
                if (Math.abs(pp) <= -c2 * pp0) {
                    return alpha;
                }
                if (pp * (alpha_2 - alpha_1) >=0) {
                    alpha_2 = alpha_1;
                }
                alpha_1 = alpha;
                phi_lo = p;
            }
        }
        return 0;
    }
    for (var iteration = 0; iteration < 10; ++iteration) {
        weightedSum(n.x, 1.0, cur.x, alpha, pk);
        p = n.fx = f(n.x, n.fxprime);
        pp = dotprod(n.fxprime, pk);
        if ((p > (p0 + c1 * alpha * pp0)) ||
            (iteration && (p >= p_last))) {
            return check(a0, alpha, p_last);
        }

        if (Math.abs(pp) <= -c2 * pp0) {
            return alpha;
        }

        if (pp >= 0 ) {
            return check(alpha, a0, p);
        }
        p_last = p;
        a0 = alpha;
        alpha *= 2;
    }
    return alpha;
}

export function SteepestDescentLineSearch(f, initial) {
    var cur = {x: initial.slice(), fx: 0, fxprime: initial.slice()},
        n = {x: initial.slice(), fx: 0, fxprime: initial.slice()},
        maxIterations = initial.length * 100,
        alpha = 1,
        pk = initial.slice(),
        c1 =  1e-5,
        c2 =  0.1,
        temp;

    cur.fx = f(cur.x, cur.fxprime);
    for (var i = 0; i < maxIterations; ++i) {
        scale(pk, cur.fxprime, -1);
        alpha = wolfeLineSearch(f, pk, cur, n, alpha, c1, c2);
        temp = cur;
        cur = n;
        n = temp;
        if ((alpha === 0) || (twonorm(cur.fxprime) < 1e-5)) 
            break;
    }
    return cur;
}