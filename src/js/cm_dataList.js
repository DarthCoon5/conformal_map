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
	// |sin x| + 1/2 e^|y| = z
	katex_func: "z = \\vert \\sin x \\vert + \\cfrac{1}{2} \\cdot e^{\\vert y \\vert}",

	
},{
	// (z+1)/(2z-1)
	katex_func: "f(z) = \\cfrac{z + 1}{2z - 1}",
	katex_info: "- linear fractional transformations",

},{
	// 1/2 (z + 1/z)
	katex_func: "f(z) = \\cfrac{1}{2}\\left(z + \\cfrac{1}{z}\\right)",
	katex_info: "-  Joukowsky transform",

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
