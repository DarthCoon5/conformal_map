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
	s_max: 300,
	t_max: 300,

	func_x: (s, t) => {return t * Math.cos(s)},
	func_y: (s, t) => {return t * Math.sin(s)},

	transpositions: function(func) {
		let func_c = func.func_c || func;
		let func_x = func.func_x || global_options.func_x;
		let func_y = func.func_y || global_options.func_y;

		return {
			trans_x: function(p, s, t) {
				let fx = func_x(s, t);
				let fy = func_y(s, t);
				let c = func_c(fx, fy);

				return p * fx + (1 - p) * c.re;
			},
			trans_y: function(p, s, t) {
				let fx = func_x(s, t);
				let fy = func_y(s, t);
				let c = func_c(fx, fy);

				return p * fy + (1 - p) * c.im;
			}
		}
	},

	moves_count: 80
};

const func_data = [

{
	katex_func: "f(z) =  \\cfrac{1}{z - 1}",

	transpositions: function() {
		let func_c = (a, b) => new Complex(1).div(new Complex(a, b).sub(1));
		return global_options.transpositions(func_c);
	}

},{
	katex_func: "f(z) =  \\cfrac{z}{z - 1}",

	transpositions: function() {
		let func_c = (a, b) => new Complex(a, b).div(new Complex(a, b).sub(1));
		return global_options.transpositions(func_c);
	},

	s: {
		max: Math.PI / 4,
		count: 40
	},
	t: {
		max: 37,
		count: 260
	}

},{	
	katex_func: "f(z) =  -i \\cfrac{z + 1}{z - 1}",

	transpositions: function() {
		let func_c = (a, b) => new Complex(a, b).add(1).div(new Complex(a, b).sub(1)).mult(new Complex(0, -1));
		return global_options.transpositions(func_c);
	}

},{	
	katex_func: "f(z) =  \\cfrac{z + i}{-z + i}",

	transpositions: function() {
		let func_c = (a, b) => new Complex(a, b).add(Complex.I).div(new Complex(-a, -b).add(Complex.I));
		return global_options.transpositions(func_c);
	}

},{	
	katex_func: "f(z) =  \\cfrac{i - iz}{z + 2}",

	transpositions: function() {
		let func_c = (a, b) => (Complex.I).sub(new Complex(a, b).mult(Complex.I)).div(new Complex(a, b).add(2));
		return global_options.transpositions(func_c);
	}

},{
	katex_func: "f(z) =  \\cfrac{z-1}{z}",

	transpositions: function() {
		let func = {
			func_x: (s, t) => {return s},
			func_y: (s, t) => {return t},
			func_c: (a, b) => new Complex(a - 1, b).div(new Complex(a, b))
		};

		return global_options.transpositions(func);
	},

	s: {
		min: -10,
		max: 10,
		count: 271
	},
	t: {
		min: 0.0001,
		max: 1,
		count: 30
	}

},{
	katex_func: "f(z) =  \\cfrac{z-1}{z-2}",

	transpositions: function() {
		let func = {
			func_x: (s, t) => {return s},
			func_y: (s, t) => {return t},
			func_c: (a, b) => new Complex(a - 1, b).div(new Complex(a - 2, b))
		};

		return global_options.transpositions(func);
	},

	s: {
		min: -12,
		max: 12,
		count: 151
	},
	t: {
		min: 0.0001,
		max: 1,
		count: 50
	}

}
];
