const global_options = {
	s: {
		min: 0.0001,
		max: 2*Math.PI,
		count: 55
	},
	t: {
		min: 0.0001,
		max: 1,
		count: 20
	},
	s_max: 100,
	t_max: 100,

	func_x: (s, t) => {return t * Math.cos(s)},
	func_y: (s, t) => {return t * Math.sin(s)},

	transpositions: function(func_c) {
		return {
			trans_x: function(p, s, t) {
				let fx = global_options.func_x(s, t);
				let fy = global_options.func_y(s, t);
				let c = func_c(fx, fy);

				return p * fx + (1 - p) * c.re;
			},
			trans_y: function(p, s, t) {
				let fx = global_options.func_x(s, t);
				let fy = global_options.func_y(s, t);
				let c = func_c(fx, fy);

				return p * fy + (1 - p) * c.im;
			}
		}
	},

	moves_count: 80
};

const func_data = [
{
	katex_func: "f(z) =  \\cfrac{1}{2} \\left( z + \\cfrac{1}{z} \\right)",
	katex_info: " -  Joukowsky transform",

	transpositions: function() {
		let func_c = (a, b) => Complex.joukowsky(new Complex(a, b));
		return global_options.transpositions(func_c);
	}

},{
	katex_func: "f(z) =  \\sin z",

	transpositions: function() {
		let func_c = (a, b) => Complex.sin(new Complex(a, b));
		return global_options.transpositions(func_c);
	}

},{
	katex_func: "f(z) =  \\cos z",

	transpositions: function() {
		let func_c = (a, b) => Complex.cos(new Complex(a, b));
		return global_options.transpositions(func_c);
	}

},{
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

}
];
