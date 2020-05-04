const global_options = {
	s: {
		min: -5,
		max: 5,
		count: 30
	},
	t: {
		min: -5,
		max: 5,
		count: 30
	},
	s_max: 100,
	t_max: 100,

	func_x: (s, t) => {return t},
	func_y: (s, t) => {return s},

	transpositions: function(func_c, condition = {}) {
		let fits = {};
		fits.z_re = condition.z_re || function() {return true};
		fits.z_im = condition.z_im || function() {return true};
		fits.fz_re = condition.fz_re || function() {return true};
		fits.fz_im = condition.fz_im || function() {return true};

		return {
			trans_x: function(p, s, t) {
				let fx = global_options.func_x(s, t);

				if (fits.z_re(fx)) {
					let fy = global_options.func_y(s, t);

					if (fits.z_im(fy)) {
						let c = func_c(fx, fy);
						let res = p * fx + (1 - p) * c.re;

						if (fits.fz_re(res))
							return res;
					}
				}
			},
			trans_y: function(p, s, t) {
				let fx = global_options.func_x(s, t);

				if (fits.z_re(fx)) {
					let fy = global_options.func_y(s, t);

					if (fits.z_im(fy)) {
						let c = func_c(fx, fy);
						let res = p * fy + (1 - p) * c.im;

						if (fits.fz_im(res))
							return res;
					}
				}
			}
		}
	},

	moves_count: 80
};

const func_data = [
{
	katex_func: "f(z) =  e^{z}",
	katex_info: "0 < Im(z) < \\cfrac{\\pi}{2}",

	transpositions: function() {
		let func_c = (a, b) => Complex.exp(new Complex(a, b));

		return global_options.transpositions(func_c)
	},

	s: {
		min: 0.0001,
		max: Math.PI / 2,
		count: 20
	}

},{	
	katex_func: "f(z) = exp \\left( \\cfrac{\\pi (1 - iz)}{z - i} \\right)",

	transpositions: function() {
		let func_c = (a, b) => Complex.exp(new Complex(Math.PI)
			.sub(new Complex(a, b).mult(new Complex(0, Math.PI)))
			.div(new Complex(a, b).sub(Complex.I)));
		return global_options.transpositions(func_c);
	}

},{	
	katex_func: "f(z) = exp \\left( \\cfrac{\\pi (1 - i) z}{2} \\right)",

	transpositions: function() {
		let func_c = (a, b) => Complex.exp(new Complex(Math.PI)
			.mult(new Complex(1, -1)).mult(new Complex(a, b)).div(2));
		return global_options.transpositions(func_c);
	}
	
},{
	katex_func: "f(z) =  \\ln z",

	transpositions: function() {
		let func_c = (a, b) => Complex.ln(new Complex(a, b));
		return global_options.transpositions(func_c);
	}

},{
	katex_func: "f(z) =  \\cfrac {\\ln z}{2 \\pi}",

	transpositions: function() {
		let func_c = (a, b) => Complex.ln(new Complex(a, b)).div(2*Math.PI);
		return global_options.transpositions(func_c);
	}

}
];
