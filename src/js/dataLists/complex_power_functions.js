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
	katex_func: "f(z) =  z^{z}",

	transpositions: function() {
		let func_c = (a, b) => new Complex(a, b).pow(new Complex(a, b));
		return global_options.transpositions(func_c);
	}

}
];
