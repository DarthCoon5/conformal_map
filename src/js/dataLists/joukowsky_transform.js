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
	katex_func: "f(z) =  \\cfrac{1}{2} \\left( z + \\cfrac{1}{z} \\right)",
	katex_info: " -  \\enspace Joukowsky \\enspace transform",

	transpositions: function() {
		let func_c = (a, b) => Complex.joukowsky(new Complex(a, b));
		return global_options.transpositions(func_c);
	}

},{
	katex_func: "f(z) =  \\cfrac{w^2 + 1}{1 - w^2},\\enspace w = \\cfrac{z-1}{z+1}",

	transpositions: function() {
		let func_c = function(a, b) {
			let func_c1 = (a1, b1) => new Complex(a1, b1).sub(1).div(new Complex(a1, b1).add(1)).pow(2);
			let c = func_c1(a, b);
			return new Complex(c.re, c.im).add(1).div(new Complex(1).sub(new Complex(c.re, c.im)))
		}
		return global_options.transpositions(func_c);
	}

},{
	katex_func: "f(z) =  \\cfrac{1}{a+b} \\left(z + \\sqrt{z^2-a^2+b^2} \\right)",
	katex_info: "a=2t, \\enspace b=t",

	transpositions: function() {
		let root = 2;

		let func_x = (s, t) => {return 2 * t * Math.cos(s)};
		let func_y = (s, t) => {return t * Math.sin(s)};
		let func_c = (a, b, t, i) => new Complex(a, b).add(
			new Complex(a, b).pow(2).sub(3*t*t).rooti(root, i)).div(3 * t);

		return {
			trans_x: function(p, s, t) {
				let fx = func_x(s, t);
				let fy = func_y(s, t);
				let c = func_c(fx, fy, t, global_options.countRootI(s, root));

				return p * fx + (1 - p) * c.re;
			},
			trans_y: function(p, s, t) {
				let fx = func_x(s, t);
				let fy = func_y(s, t);
				let c = func_c(fx, fy, t, global_options.countRootI(s, root));

				return p * fy + (1 - p) * c.im;
			}
		}
	},

	s: {
		count: 45
	},
	t: {
		min: 0.055,
		max: 1.5
	}

},{
	katex_func: "f(z) =  \\left( \\cfrac{e^{-i\\alpha}}{\\sqrt{a^2+b^2}} \\left(z + \\sqrt{z^2-a^2-b^2} \\right) \\right) ^ {\\pi / 2\\alpha}",
	katex_info: "Im(f(z)) > 0, \\enspace a=2t, \\enspace b=t, \\enspace \\alpha=arctg \\cfrac{b}{a}",


	transpositions: function() {
		let root = 2;
		let alpha = Math.atan(0.5)

		let func_x = (s, t) => {return 2 * t * Math.cosh(s)};
		let func_y = (s, t) => {return t * Math.sinh(s)};
		let func_c = (a, b, t, i) => 
			new Complex(a, b).add(new Complex(a, b).pow(2).sub(5*t*t).rooti(root, i))
			.div(Math.sqrt(5*t*t)).mult(Complex.exp(new Complex(0, -alpha)))
			.pow(Math.PI/2/alpha);

		return {
			trans_x: function(p, s, t) {
				let fx = func_x(s, t);
				let fy = func_y(s, t);
				let c = func_c(fx, fy, t, s*t >= 0 ? 0 : 1);

				if (c.im > 0)
					return p * fx + (1 - p) * c.re;
			},
			trans_y: function(p, s, t) {
				let fx = func_x(s, t);
				let fy = func_y(s, t);
				let c = func_c(fx, fy, t, s*t >= 0 ? 0 : 1);

				if (c.im > 0)
					return p * fy + (1 - p) * c.im;
			}
		}
	},

	s: {
		min: -2,
		max: 2,
		count: 51
	},
	t: {
		min: -1,
		max: 1,
		count: 41
	}

}
];
