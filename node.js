export {Node};

class Node {
    constructor(value, left = null, right = null) {
        this._value = value;
        this._left = left;
        this._right = right;
    }

    get value() {
        return this._value;
    }

    get left() {
        return this._left;
    }

    get right() {
        return this._right;
    }

    set value(value) {
        this._value = value;
    }

    set left(left) {
        this._left = left;
    }

    set right(right) {
        this._right = right;
    }
}