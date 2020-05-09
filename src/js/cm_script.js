let pan2d;
let render_graph = document.getElementById('render');
let grafar_obj_pin;

const colors = {
	red: [
		grafar.range(0, 0.9, 2).select(),
		grafar.constant(0).select(),
		grafar.constant(0).select()
	]
};

// Clear grafar render
function clearGrafar() {
	while (render_graph.firstChild) {
		render_graph.removeChild(render_graph.lastChild);
	}

	options = {};
	options.s = {};
	options.s.min = global_options.s.min;
	options.s.max = global_options.s.max;
	options.s.count = global_options.s.count;
	options.t = {};
	options.t.min = global_options.t.min;
	options.t.max = global_options.t.max;
	options.t.count = global_options.t.count;
	options.moves_count = global_options.moves_count;

	conformalMap = null;
	grafar_obj_pin = null;
}

// click/initialize new function 
function runNewFunction() {
	clearGrafar();

	current_obj = func_data[current_index];

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
	if (current_obj.moves_count !== undefined)
		options.moves_count = current_obj.moves_count;

	updateUITemplates(options);

	conformalMap = new ConformalMap(options);
	ConformalMapSliderOptionsUpdate();

	pan2d = new grafar.Panel(render_graph);
	pan2d.setAxes(['Re', 'Im']);
	pan2d.controls.noPan = false;
	pan2d.camera.position.set(0, 6);

	options.s_range = grafar.range(options.s.min, options.s.max, global_options.s_max).select();
	options.t_range = grafar.range(options.t.min, options.t.max, global_options.t_max).select();

	let trans = current_obj.transpositions();

	let axes = [
		grafar.map([conformalMap.proportion, options.s_range, options.t_range], (p, s, t) => trans.trans_x(p, s, t)),
		grafar.map([conformalMap.proportion, options.s_range, options.t_range], (p, s, t) => trans.trans_y(p, s, t))
	];

	grafar_obj_pin = grafar.pin({axes: axes, color: colors.red}, pan2d);

	setTimeout(updateOptionS, 100);
	setTimeout(updateOptionT, 100);

	current_obj = {};
}

// ==========================================================================================================
// 	CONFORMAL MAP
// ==========================================================================================================

// animate conformal mapping
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

// click on the animation button 'play'
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
	ConformalMapFrequency(Number(this.value));

    grafar.refresh();
}

function ConformalMapFrequency(num) {
	conformalMap.animate = false;

	if (conformalMap.isMotionStop(num)) {
		conformalMap.setPosition(num).moveToEnd();
	} else {
		conformalMap.setPosition(num).move();
	}
}

// base options for slider
function ConformalMapSliderOptionsUpdate() {
	conformalMap_slider.step = 1 / conformalMap.moves_count;
	conformalMap_slider.min = conformalMap.motion_stop1;
	conformalMap_slider.max = conformalMap.motion_stop2 + (0.1 / conformalMap.moves_count);
	conformalMap_slider.value = conformalMap.motion_pos;
}

// set slider value 
function ConformalMapSliderPosition(value) {
	conformalMap_slider.value = conformalMap.motion_pos;
}

// set slider step 
function ConformalMapSliderStepUpdate(value) {
	conformalMap_slider.step = 1 / conformalMap.moves_count;
}


// ==========================================================================================================
// NUMBER INPUTS
// ==========================================================================================================

function updateOptionS() {
	grafar.range(options.s.min, options.s.max, options.s.count).into(options.s_range);
	grafar.refresh();
}

function updateOptionT() {
	grafar.range(options.t.min, options.t.max, options.t.count).into(options.t_range);
	grafar.refresh();
}

function setConformalMapFrequency(value=1) {
	conformalMap.moves_count = value;

	ConformalMapFrequency(0);
	ConformalMapSliderStepUpdate();
	ConformalMapSliderPosition(0);
}

function setOptionSMin(value=1) {
	options.s.min = value;

	if (value <= options.s.max)
		updateOptionS();
}

function setOptionSMax(value=1) {
	options.s.max = value;

	if (value >= options.s.min)
		updateOptionS();
}

function setOptionSCount(value=5) {
	options.s.count = value;
	updateOptionS();
}

function setOptionTMin(value=1) {
	options.t.min = value;

	if (value <= options.t.max)
		updateOptionT();
}

function setOptionTMax(value=1) {
	options.t.max = value;
	
	if (value >= options.t.min)
		updateOptionT();
}

function setOptionTCount(value=5) {
	options.t.count = value;
	updateOptionT();
}

// click on the animation button 'play'
document.getElementById('settings-reset-btn').addEventListener('click', function (e) {
	e.preventDefault();

	runNewFunction();
});

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
