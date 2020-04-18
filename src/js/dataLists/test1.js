const func_data = [
{	
	katex_func: "f(z) =  -i \\cfrac{z + 1}{z - 1}",

	transpositions: function() {
		let func_x = (s, t) => t * Math.cos(s);
		let func_y = (s, t) => t * Math.sin(s);
		let func_c = (a, b) => new Complex(a, b).add(1).div(new Complex(a, b).sub(1)).mult(new Complex(0, -1));

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

	s: {
		min: 0.0001,
		max: 2*Math.PI,
		count: 53
	},
	t: {
		min: 0.0001,
		max: 1,
		count: 20
	},

	moves_count: 80
}];
