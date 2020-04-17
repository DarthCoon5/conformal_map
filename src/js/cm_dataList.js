const ranges = {
	x: {
			min: -2*Math.PI,
			max: 2*Math.PI
		},
		y: {
			min: -2*Math.PI,
			max: 2*Math.PI
		}
}

const func_data = [
{	
	katex_func: "z = \\vert \\sin x \\vert + \\cfrac{1}{2} \\cdot e^{\\vert y \\vert}",


	trans_x: function(p, s, t) {
		let fx = this.func_x(s, t);
		let fy = this.func_y(s, t);
		let c = this.func_c(fx, fy);

		return p * fx + (1 - p) * c.re;
	},

	trans_y: function(p, s, t) {
		let fx = this.func_x(s, t);
		let fy = this.func_y(s, t);
		let c = this.func_c(fx, fy);

		return p * fy + (1 - p) * c.im;
	},

	func_x: (s, t) => t * Math.cos(s),
	func_y: (s, t) => t * Math.sin(s),
	func_c: (a, b) => new Complex(a, b).add(1).div(new Complex(a, b).sub(1)).mult(new Complex(0, -1)),

	s: {
		min: 0.0001,
		max: 2*Math.PI,
		count: 53
	},
	t: {
		min: 0.0001,
		max: 1,
		count: 20
	}
},{
	//|tg z|
	katex_func: "f(z) = | \\tg z |",
	katex_info: "-  absolute value of tangent",

	
},{
	// tg z
	katex_func: "f(z) = \\tg z",
	katex_info: "-  tangent",

},{
	// 1/(1+z^2)
	katex_func: "f(z) = \\cfrac{1}{1 + z^2}",

	
},{
	// |e^{1/z}|
	katex_func: "f(z) = \\vert e^{1/z} \\vert",

}];
