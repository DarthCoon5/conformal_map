class ConformalMap {
	constructor(obj={}) {
		this._moves_count = obj.moves_count || 100;
		this._move_sign = obj.move_sign || -1;
		this._motion_pos = obj.motion_pos || 1;
		this._motion_stop1 = 0;
		this._motion_stop2 = 1;
		this._animate = false;
		this._proportion = grafar.constant(obj.proportion || 1).select();
	}

	get moves_count() {return this._moves_count}
	get move_sign() {return this._move_sign}
	get motion_pos() {return this._motion_pos}
	get motion_stop1() {return this._motion_stop1}
	get motion_stop2() {return this._motion_stop2}
	get motion_stop() {return this._move_sign > 0 ? this._motion_stop2 : this._motion_stop1}
	get animate() {return this._animate}
	get proportion() {return this._proportion}

	set animate(value) {this._animate = value}
	set motion_pos(value) {this._motion_pos = value}
	set moves_count(value) {this._moves_count = value}

	// set motion_pos
	setPosition(value) {
		this._motion_pos = value
		return this;
	}

	// invert animate
	animateInvert() {
		this._animate = !this._animate;

		return this;
	}

	// invert move direction
	motionInvert() {
		this._move_sign *= -1;

		return this;
	}

	// check if position is in valid range 
	freeToMove() {
		return (this._motion_pos >= this._motion_stop1 &&
			this._motion_pos <= this._motion_stop2)
	}

	// check if value equals to stop points
	isMotionStop(value) {
		return value === this._motion_stop1 || value === this._motion_stop2;
	}

	// count a step and new value for motion_pos
	makeStep() {
		this._motion_pos += this._move_sign * (1 / this._moves_count);

		return this;
	}

	// make a move and update grafar variable
	move() {
		grafar.constant(this._motion_pos).into(this._proportion);

		return this;
	}

	// make a move to the current determind stop point
	moveToEnd() {
		if (!this.isMotionStop(this._motion_pos)) {
			this._motion_pos = this.motion_stop;
		}
		
		this._animate = false;
		this._move_sign = this._motion_pos === 0 ? 1 : -1;

		grafar.constant(this._motion_pos).into(this._proportion);

		return this;
	}
}