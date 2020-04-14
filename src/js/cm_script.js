let pan3d;
let render_graph = document.getElementById('render');
let grafar_obj_pin;

const global_options = {
	colors: {
		default: [
			grafar.constant(0).select(),
			grafar.constant(0.549).select(),
			grafar.constant(0.941).select()
		],
		discolored: [
			grafar.range(0,0.85,2).select(),
			grafar.range(0,0.85,2).select(),
			grafar.range(0,0.85,2).select()
		],
		red: [
			grafar.constant(1).select(),
			grafar.constant(0).select(),
			grafar.constant(0).select()
		],
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
		x: {
			min: -2,
			max: 2
		},
		y: {
			min: -2,
			max: 2
		}
	};

	conformalMap = null;
	grafar_obj_pin = null;
}

// click/initialize new function 
function runNewFunction() {
	clearUITemplates();
	clearGrafar();

	// pan3d = null;
	// if (current_index in functions)

	current_obj = func_data[current_index];
	current_obj_vars = current_obj.param_func();

	pan3d = new grafar.Panel(render_graph);
	grafar_obj_pin = grafar.pin({axes: current_obj_vars.main, color: global_options.colors.default}, pan3d);

	// if there's options

	if (current_obj.x) {
		if (current_obj.x.min !== undefined)
			options.x.min = current_obj.x.min;
		if (current_obj.x.max !== undefined)
			options.x.max = current_obj.x.max;
	}
	if (current_obj.y) {
		if (current_obj.y.min !== undefined)
			options.y.min = current_obj.y.min;
		if (current_obj.y.max !== undefined)
			options.y.max = current_obj.y.max;
	}

	//

	current_obj = {};
}

// ==========================================================================================================
// 	CONFORMAL MAP
// ==========================================================================================================

let loop_param = 1;
let loop_sgn = 1;
let loop_stop = 1;

function animaGo() {
    loop_param += loop_sgn * 0.015;

    if(loop_sgn*loop_param < loop_sgn*loop_stop) {
        grafar.constant(loop_param).into(r);
        grafar.refresh();

        window.requestAnimationFrame(animaGo);
    }
    else {
        loop_param -= loop_sgn * 0.02;
        grafar.constant(loop_stop).into(r);
        grafar.refresh();
    }
};

document.getElementById('conformalMap-play-btn').addEventListener('click', function (e) {
	e.preventDefault();

	loop_sgn *= -1;
	loop_stop = 1-loop_stop;

	//animaGo();
});


const conformalMap_slider = document.getElementById('slider-conformalMap');
// change slider
conformalMap_slider.oninput = function() {
	let num = Number(this.value);
    let grafar_const = grafar.constant(num);

    // .update(num);
	// grafar_const.into();

    grafar.refresh();
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
