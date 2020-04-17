class ConformalMap {
	constructor(obj={}) {
		this._moves_count = obj.moves_count || 80;
		this._move_sign = obj.move_sign || -1;
		this._motion_pos = obj.motion_pos || 1;
		this._motion_stop1 = obj.motion_stop1 || 0;
		this._motion_stop2 = obj.motion_stop2 || 1;
		this._animate = obj.animate || false;
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

	setPosition(value) {
		this._motion_pos = value
		return this;
	}

	animateInvert() {
		this._animate = !this._animate;

		return this;
	}

	motionInvert() {
		this._move_sign *= -1;

		return this;
	}

	freeToMove() {
		return (this._motion_pos >= this._motion_stop1 &&
			this._motion_pos <= this._motion_stop2)
	}

	isMotionStop(value=0) {
		return value == this._motion_stop1 || value == this._motion_stop2;
	}

	makeStep() {
		this._motion_pos += this._move_sign * (1 / this._moves_count);

		return this;
	}

	move() {
		grafar.constant(this._motion_pos).into(this._proportion);

		return this;
	}

	moveToEnd() {
		this._animate = false;

		if (!this.isMotionStop(this._motion_pos)) {
			this._motion_pos = this.motion_stop;
			this.motionInvert();
		}			

		grafar.constant(this._motion_pos).into(this._proportion);

		return this;
	}
}