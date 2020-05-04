class Complex {
	constructor(re, im) {
		if (re instanceof Complex) {
			this._re = re.re;
			this._im = re.im;
		} else {
			this._re = re || 0;
			this._im = im || 0;
		}
	}

	// get complex number
	get re() {return this._re};
	get im() {return this._im};

	// count argument in polar form
    get arg() {
    	let a = this._re;
		let b = this._im;

    	let arg = Math.atan(b/a);
		if (a < 0) arg += Math.PI;
		if (a > 0 && b < 0) arg += 2*Math.PI;

		return arg;
    }

    // count absolute value of a complex number
    get abs() {
    	let a = this._re;
		let b = this._im;

		return Math.sqrt(a*a + b*b);
    }

	// make complex number negative
	static neg(num) {
		if (!(num instanceof Complex))
			num = new Complex(num);

		return new Complex(-num.re, -num.im);
	}

	static get I() {
		return new Complex(0, 1);
	}

	// addition
	add(num) {
		if (!(num instanceof Complex))
			num = new Complex(num);

      	return new Complex(this._re + num.re, this._im + num.im);
    }

   	// subtraction
    sub(num) {
		if (!(num instanceof Complex))
			num = new Complex(num);

      	return new Complex(this._re - num.re, this._im - num.im);
    }

    // multiplication
    mult(num) {
    	if (!(num instanceof Complex))
			num = new Complex(num);

		let a = this._re;
		let b = this._im;
		let c = num.re;
		let d = num.im;

      	return new Complex(a * c - b * d, a * d + b * c);
    }

    // division
    div(num) {
    	if (!(num instanceof Complex))
			num = new Complex(num);

		let a = this._re;
		let b = this._im;
		let c = num.re;
		let d = num.im;

      	let z_re = (a*c + b*d) / (c*c + d*d);
      	let z_im = (b*c - a*d) / (c*c + d*d);

      	if (z_re === NaN)
      		z_re = 0;
      	if (z_im === NaN)
      		z_im = 0;

      	return new Complex(z_re, z_im);
    }

    // power
    pow(num) {
    	if (!(num instanceof Complex))
			num = new Complex(num);

      	let a = this._re;
		let b = this._im;
		let c = num.re;
		let d = num.im;

		let round4 = (num) => Math.round(num*1000)/1000;

		if (d === 0) {
			let r = this.abs;
			let arg = this.arg;

			return new Complex(
				round4(Math.pow(r, c) * Math.cos(c*arg)) || 0,
				round4(Math.pow(r, c) * Math.sin(c*arg)) || 0
			)
		}

		return Complex.exp(Complex.ln(this).mult(num))
    }

    // e to the power of complex number
    static exp(num) {
    	if (!(num instanceof Complex))
			num = new Complex(num);

		let round4 = (num) => Math.round(num*1000)/1000;

		let e_x = Math.pow(Math.E, num.re);

		return new Complex(
			round4(e_x * Math.cos(num.im)),
			round4(e_x * Math.sin(num.im))
		);
    }

    // log_e of complex number
    static ln(num) {
    	if (!(num instanceof Complex))
			num = new Complex(num);

		let round4 = (num) => Math.round(num*1000)/1000;

		let a = num.re;
		let b = num.im;

		let r = num.abs;
		let arg = num.arg;

		return new Complex(
			round4(Math.log(r)),
			round4(arg)
		);
    }

    // log_e of complex number
    static joukowsky(num) {
    	if (!(num instanceof Complex))
			num = new Complex(num);

		let round4 = (num) => Math.round(num*1000)/1000;

		let a = num.re;
		let b = num.im;

		let res = new Complex(1).div(new Complex(a, b)).add(new Complex(a, b)).mult(0.5)

		return new Complex(
			round4(res.re),
			round4(res.im)
		);
    }

    // sin of complex number
    static sin(num) {
    	if (!(num instanceof Complex))
			num = new Complex(num);

		let round4 = (num) => Math.round(num*1000)/1000;

		let a = num.re;
		let b = num.im;

		let res = Complex.joukowsky(Complex.exp(
			Complex.I.mult(new Complex(a, b).sub(Math.PI/2))));

		return new Complex(
			round4(res.re),
			round4(res.im)
		);
    }

    // cos of complex number
    static cos(num) {
    	if (!(num instanceof Complex))
			num = new Complex(num);

		let round4 = (num) => Math.round(num*1000)/1000;

		let a = num.re;
		let b = num.im;

		let res = Complex.joukowsky(Complex.exp(
			Complex.I.mult(new Complex(a, b))));

		return new Complex(
			round4(res.re),
			round4(res.im)
		);
    }

    // tang of complex number
    static tg(num) {
    	if (!(num instanceof Complex))
			num = new Complex(num);

		let round4 = (num) => Math.round(num*1000)/1000;

		let a = num.re;
		let b = num.im;

		let res = Complex.sin(new Complex(a, b))
		.div(Complex.cos(new Complex(a, b)));

		return new Complex(
			round4(res.re),
			round4(res.im)
		);
    }

    // ctang of complex number
    static ctg(num) {
    	if (!(num instanceof Complex))
			num = new Complex(num);

		let round4 = (num) => Math.round(num*1000)/1000;

		let a = num.re;
		let b = num.im;

		let res = Complex.cos(new Complex(a, b))
		.div(Complex.sin(new Complex(a, b)));

		return new Complex(
			round4(res.re),
			round4(res.im)
		);
    }

    // num-th (not a complex num) root of a complex number
    // returns array of complex numbers
    root(num) {
    	if (!(num instanceof Complex))
			num = new Complex(num);

		if (num.im !== 0 || num.re % 1 !== 0)
			return [this];

		let round4 = (num) => Math.round(num*1000)/1000;

	  	let a = this._re;
		let b = this._im;
		let n = num.re;

		let r = this.abs;
		let r_pow = Math.pow(r, 1/n);
		let arg = this.arg;

		let res = new Array(n);

		for (let k = 0; k < n; k++) {
			res[k] = new Complex(
				round4(r_pow * Math.cos((arg + 2 * Math.PI * k) / n)),
				round4(r_pow * Math.sin((arg + 2 * Math.PI * k) / n))
			);
		}

		return res;
    }

    // num-th (not a complex num) root of a complex number
    // returns array of complex numbers
    rooti(num, i) {
    	if (!(num instanceof Complex))
			num = new Complex(num);

		if (num.im !== 0 || num.re % 1 !== 0 || !Object.is(i % 1, 0) || i >= num.re)
			return [this];

		let round4 = (num) => Math.round(num*1000)/1000;

	  	let a = this._re;
		let b = this._im;
		let n = num.re;

		let r = this.abs;
		let r_pow = Math.pow(r, 1/n);
		let arg = this.arg;

		let res = new Array(n);

		return new Complex(
			round4(r_pow * Math.cos((arg + 2 * Math.PI * i) / n)),
			round4(r_pow * Math.sin((arg + 2 * Math.PI * i) / n))
		);
    }
}