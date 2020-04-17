let pan2d;
let render_graph = document.getElementById('render');
let grafar_obj_pin;

const global_options = {
	colors: {
		red: [
			grafar.range(0, 0.9, 2).select(),
			grafar.constant(0).select(),
			grafar.constant(0).select()
		]
	}
};


// Clear all panel settings
function clearUITemplates() {
	//
}

// Clear grafar render
function clearGrafar() {
	while (render_graph.firstChild) {
		render_graph.removeChild(render_graph.lastChild);
	}

	// grafar_1 = grafar;
	// for (let member in grafar_1) delete grafar_1[member]; // nope

	options = {
		s: {
			min: -2,
			max: 2,
			count: 30
		},
		t: {
			min: -2,
			max: 2,
			count: 30
		}
	};

	conformalMap = null;
	grafar_obj_pin = null;
}

// click/initialize new function 
function runNewFunction() {
	clearUITemplates();
	clearGrafar();

	// pan2d = null;
	// if (current_index in functions)

	current_obj = func_data[current_index];
	// current_obj_vars = current_obj.param_func();

	conformalMap = new ConformalMap();
	ConformalMapSliderOptionsUpdate();

	pan2d = new grafar.Panel(render_graph);
	pan2d.setAxes(['x', 'y']);

	// if there's options
	if (current_obj.s) {
		if (current_obj.s.min !== undefined)
			options.s.min = current_obj.s.min;
		if (current_obj.s.max !== undefined)
			options.s.max = current_obj.s.max;
		if (current_obj.s.count !== undefined)
			options.s.count = current_obj.s.count;
	}
	if (current_obj.t) {
		if (current_obj.t.min !== undefined)
			options.t.min = current_obj.t.min;
		if (current_obj.t.max !== undefined)
			options.t.max = current_obj.t.max;
		if (current_obj.t.count !== undefined)
			options.t.count = current_obj.t.count;
	}

	let s = grafar.range(options.s.min, options.s.max, options.s.count).select();
	let t = grafar.range(options.t.min, options.t.max, options.t.count).select();

	let axes = [
		grafar.map([conformalMap.proportion, s, t], (p, s, t) => current_obj.trans_x(p, s, t)),
		grafar.map([conformalMap.proportion, s, t], (p, s, t) => current_obj.trans_y(p, s, t))
	];

	grafar_obj_pin = grafar.pin({axes: axes, color: global_options.colors.red}, pan2d);
}

// ==========================================================================================================
// 	CONFORMAL MAP
// ==========================================================================================================

function animaGo() {
    if (conformalMap.animate) {
    	conformalMap.makeStep();

	    if (conformalMap.freeToMove()) {
	        conformalMap.move();
	        grafar.refresh();

	        window.requestAnimationFrame(animaGo);
	    } else {
	    	conformalMap.moveToEnd();
	        grafar.refresh();
	    }

	    ConformalMapSliderPosition(conformalMap.motion_pos);
	}
};

document.getElementById('conformalMap-play-btn').addEventListener('click', function (e) {
	e.preventDefault();

	if (!conformalMap.animate) {
		conformalMap.animateInvert();
		animaGo();
	} else {
		conformalMap.motionInvert();
	}

});


const conformalMap_slider = document.getElementById('slider-conformalMap');
// change slider
conformalMap_slider.oninput = function() {
	let num = Number(this.value)

	conformalMap.animate = false;

	if (conformalMap.isMotionStop(num)) {
		conformalMap.setPosition(num).moveToEnd();
	} else {
		conformalMap.setPosition(num).move();
	}

    grafar.refresh();
}

function ConformalMapSliderOptionsUpdate() {
	conformalMap_slider.step = 1 / conformalMap.moves_count;
	conformalMap_slider.min = conformalMap.motion_stop1;
	conformalMap_slider.max = conformalMap.motion_stop2 + (0.1 / conformalMap.moves_count);
	conformalMap_slider.value = conformalMap.motion_pos;
}

function ConformalMapSliderPosition(value) {
	conformalMap_slider.value = conformalMap.motion_pos;
}

// ==========================================================================================================
// START
// ==========================================================================================================
function firstStart() {
    dataList.children[current_index].classList.add('active');
    updateHeaderPanel();
    runNewFunction();
}

let current_obj = {};
let current_obj_vars = {};
clearGrafar();
let current_index = 0;
firstStart(current_index);
