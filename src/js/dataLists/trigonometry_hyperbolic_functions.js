const global_options = {
	s: {
		min: 0.0001,
		max: Math.PI,
		count: 40
	},
	t: {
		min: 0.0001,
		max: 1,
		count: 20
	},
	s_max: 100,
	t_max: 100,

	func_x: (s, t) => {return s},
	func_y: (s, t) => {return t},

	transpositions: function(func, condition = {}) {
		let fits = {};
		fits.z_re = condition.z_re || function() {return true};
		fits.z_im = condition.z_im || function() {return true};
		fits.z_arg = condition.z_arg || function() {return true};
		fits.fz_re = condition.fz_re || function() {return true};
		fits.fz_im = condition.fz_im || function() {return true};

		let func_c = func.func_c || func;
		let func_x = func.func_x || global_options.func_x;
		let func_y = func.func_y || global_options.func_y;

		return {
			trans_x: function(p, s, t) {
				let fx = func_x(s, t);

				if (fits.z_re(fx)) {
					let fy = func_y(s, t);

					if (fits.z_im(fy) && fits.z_arg(new Complex(fx, fy))) {
						let c = func_c(fx, fy);
						let res = p * fx + (1 - p) * c.re;

						if (fits.fz_re(res))
							return res;
					}
				}
			},
			trans_y: function(p, s, t) {
				let fx = func_x(s, t);

				if (fits.z_re(fx)) {
					let fy = func_y(s, t);

					if (fits.z_im(fy) && fits.z_arg(new Complex(fx, fy))) {
						let c = func_c(fx, fy);
						let res = p * fy + (1 - p) * c.im;

						if (fits.fz_im(res))
							return res;
					}
				}
			}
		}
	},

	countRootI: (s, root) => {
		let i = (s % (2 * Math.PI))
		if (i < 0) i += 2 * Math.PI;
		i = Math.floor(i / (2 * Math.PI / root));

		return i;
	},

	moves_count: 80
};

const func_data = [
{
	katex_func: "f(z) =  \\tg z",

	transpositions: function() {
		let func_c = (a, b) => Complex.tg(new Complex(a, b));
		return global_options.transpositions(func_c);
	}

},{
	katex_func: "f(z) =  \\ctg z",

	transpositions: function() {
		let func_c = (a, b) => Complex.ctg(new Complex(a, b));
		return global_options.transpositions(func_c);
	}

},{
	katex_func: "f(z) =   \\cos z",

	transpositions: function() {
		let func_c = (a, b) => Complex.cos(new Complex(a, b));

		return global_options.transpositions(func_c)
	}

},{
	katex_func: "f(z) =   \\sin z",

	transpositions: function() {
		let func_c = (a, b) => Complex.sin(new Complex(a, b));

		return global_options.transpositions(func_c)
	}

},{
	katex_func: "f(z) =   \\tg^2 \\cfrac{z}{2}",

	transpositions: function() {
		let func_c = (a, b) => Complex.tg(new Complex(a, b).div(2)).pow(2);

		return global_options.transpositions(func_c)
	},

	s: {
		min: 0.01,
		max: Math.PI / 2 - 0.01,
		count: 50
	},

	t: {
		min: -6,
		max: 6,
		count: 70
	}

},{
	katex_func: "f(z) =  \\cfrac{2z-i}{2+iz}",

	transpositions: function() {
		let func = {
			func_x: (s, t) => {return t * Math.cos(s)},
			func_y: (s, t) => {return t * Math.sin(s)},
			func_c: (a, b) => new Complex(2*a, 2*b-1).div(new Complex(a, b).mult(Complex.I).add(2))
		}

		return global_options.transpositions(func)
	},

	s: {
		min: 0.01,
		max: Math.PI,
		count: 50
	}

},{
	katex_func: "f(z) =  \\cfrac{z+1}{2z+1}",

	transpositions: function() {
		let func = {
			func_x: (s, t) => {return t * Math.cos(s)},
			func_y: (s, t) => {return t * Math.sin(s)},
			func_c: (a, b) => new Complex(a + 1, b).div(new Complex(a, b).mult(2).add(1))
		};

		return global_options.transpositions(func)
	},

	s: {
		count: 30
	}

},{
	katex_func: "f(z) = \\cfrac{z+1}{2z+1} \\enspace ex2",

	transpositions: function() {
		let func = {
			func_x: (s, t) => {return t * Math.cos(s)},
			func_y: (s, t) => {return t * Math.sin(s)},
			func_c: (a, b) => new Complex(a + 1, b).div(new Complex(a, b).mult(2).add(1))
		};

		return global_options.transpositions(func)
	},

	s: {
		max: 2*Math.PI,
		count: 60
	},

	t: {
		min: 1,
		max: 2
	}

},{
	katex_func: "f(z) = e^i\\cfrac{z+24}{3z}",

	transpositions: function() {
		let func = {
			func_x: (s, t) => {return t * Math.cos(s)},
			func_y: (s, t) => {return t * Math.sin(s)},
			func_c: (a, b) => Complex.exp(Complex.I).mult(new Complex(a+24, b).div(new Complex(3*a, 3*b)))
		};

		return global_options.transpositions(func)
	},

	s: {
		max: 2*Math.PI,
		count: 60
	},

	moves_count: 200

}

];
