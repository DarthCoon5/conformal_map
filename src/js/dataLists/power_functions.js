const global_options = {
	s: {
		min: 0,
		max: Math.PI/3,
		count: 30
	},
	t: {
		min: 0,
		max: 10,
		count: 100
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
	katex_func: "f(z) =  z^{2}",

	transpositions: function() {
		let func_c = (a, b) => new Complex(a, b).pow(2);
		return global_options.transpositions(func_c);
	}

},{	
	katex_func: "f(z) =  -\\left( \\cfrac{z + \\sqrt{3} - i}{z - \\sqrt{3} - i} \\right)^3",

	transpositions: function() {
		let func_c = (a, b) => Complex.neg(new Complex(a, b).add(new Complex(Math.sqrt(3), -1))
			.div(new Complex(a, b).add(new Complex(-Math.sqrt(3), -1))).pow(3));
		return global_options.transpositions(func_c);
	}

},{	
	katex_func: "f(z) =  \\left( \\cfrac{z - \\sqrt{2} (1 - i)}{z - \\sqrt{2} (1 + i)} \\right)^4",

	transpositions: function() {
		let func_c = (a, b) => new Complex(a, b).sub(new Complex(Math.sqrt(2), -Math.sqrt(2)))
			.div(new Complex(a, b).sub(new Complex(Math.sqrt(2), Math.sqrt(2)))).pow(4);
		return global_options.transpositions(func_c);
	}

}
];
