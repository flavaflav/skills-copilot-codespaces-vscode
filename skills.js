function calculateNumbers(var1, var2) {
    return var1 + var2;
}

function baskara(a, b, c) {
    var delta = (b * b) - (4 * a * c);
    var x1 = (-b + Math.sqrt(delta)) / (2 * a);
    var x2 = (-b - Math.sqrt(delta)) / (2 * a);

    return [x1, x2];
}

function blackAndScholes(s, k, r, sigma, t) {
    var d1 = (Math.log(s / k) + (r + sigma * sigma / 2) * t) / (sigma * Math.sqrt(t));
    var d2 = d1 - sigma * Math.sqrt(t);

    var call = s * normal(d1) - k * Math.exp(-r * t) * normal(d2);
    var put = k * Math.exp(-r * t) * normal(-d2) - s * normal(-d1);

    return [call, put];
}
