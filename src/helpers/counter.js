class Counter {
    items = {}

    constructor(def = []) {
        const initialState = Array.from(def);
        this.items = {}

        for (const item of initialState) {
            this.add(item);
        }
    }

    add(item, count = 1) {
        if (!this.items[item]) {
            this.set(item, 0);
        }
        this.items[item] += count;
    }

    set(item, count = 0) {
        this.items[item] = count;
    }

    get(item) {
        if (this.items[item]) {
            return this.items[item];
        }
        return 0;
    }

    toObject() {
        return this.items;
    }

    keys() {
        return Object.keys(this.items);
    }

    reset() {
        this.items = {};
    }

    static diff(left, right) {
        const keys = new Set([...left.keys(), ...right.keys()]);
        const output = new Counter();

        for (const key of keys) {
            output.add(key, right.get(key) - left.get(key));
        }

        return output;
    }
}

export {
    Counter
}
