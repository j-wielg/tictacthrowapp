let wasm;

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

let cachedInt8ArrayMemory0 = null;

function getInt8ArrayMemory0() {
    if (cachedInt8ArrayMemory0 === null || cachedInt8ArrayMemory0.byteLength === 0) {
        cachedInt8ArrayMemory0 = new Int8Array(wasm.memory.buffer);
    }
    return cachedInt8ArrayMemory0;
}

function getArrayI8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_export_0.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_0.set(idx, obj);
    return idx;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    const mem = getDataViewMemory0();
    for (let i = 0; i < array.length; i++) {
        mem.setUint32(ptr + 4 * i, addToExternrefTable0(array[i]), true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}

let cachedUint32ArrayMemory0 = null;

function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

export function greet() {
    wasm.greet();
}

const MoveFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_move_free(ptr >>> 0, 1));
/**
 * Represents a single move in a game of tic-tac-throw
 */
export class Move {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Move.prototype);
        obj.__wbg_ptr = ptr;
        MoveFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    static __unwrap(jsValue) {
        if (!(jsValue instanceof Move)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        MoveFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_move_free(ptr, 0);
    }
    /**
     * @returns {boolean}
     */
    get free() {
        const ret = wasm.__wbg_get_move_free(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set free(arg0) {
        wasm.__wbg_set_move_free(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get grid() {
        const ret = wasm.__wbg_get_move_grid(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set grid(arg0) {
        wasm.__wbg_set_move_grid(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get pos() {
        const ret = wasm.__wbg_get_move_pos(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set pos(arg0) {
        wasm.__wbg_set_move_pos(this.__wbg_ptr, arg0);
    }
}

const TicTacThrowFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tictacthrow_free(ptr >>> 0, 1));
/**
 * A struct representing the standard Tic Tac Throw ruleset
 * Most fields can be directly set and read by JS. The exception is
 * `board`, which requires a getter.
 */
export class TicTacThrow {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TicTacThrow.prototype);
        obj.__wbg_ptr = ptr;
        TicTacThrowFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TicTacThrowFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tictacthrow_free(ptr, 0);
    }
    /**
     * Stores the owner of each grid
     * @returns {Int8Array}
     */
    get owned() {
        const ret = wasm.__wbg_get_tictacthrow_owned(this.__wbg_ptr);
        var v1 = getArrayI8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Stores the owner of each grid
     * @param {Int8Array} arg0
     */
    set owned(arg0) {
        const ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_tictacthrow_owned(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Stores whether each grid is full
     * @returns {Uint8Array}
     */
    get full() {
        const ret = wasm.__wbg_get_tictacthrow_full(this.__wbg_ptr);
        var v1 = getArrayU8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Stores whether each grid is full
     * @param {Uint8Array} arg0
     */
    set full(arg0) {
        const ptr0 = passArray8ToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_tictacthrow_full(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Stores whether or not the game is "free"
     * @returns {boolean}
     */
    get free() {
        const ret = wasm.__wbg_get_tictacthrow_free(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Stores whether or not the game is "free"
     * @param {boolean} arg0
     */
    set free(arg0) {
        wasm.__wbg_set_tictacthrow_free(this.__wbg_ptr, arg0);
    }
    /**
     * Stores the number of un-owned grids
     * @returns {number}
     */
    get contested() {
        const ret = wasm.__wbg_get_tictacthrow_contested(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Stores the number of un-owned grids
     * @param {number} arg0
     */
    set contested(arg0) {
        wasm.__wbg_set_tictacthrow_contested(this.__wbg_ptr, arg0);
    }
    /**
     * Stores the current playable grid
     * @returns {number}
     */
    get grid() {
        const ret = wasm.__wbg_get_tictacthrow_grid(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Stores the current playable grid
     * @param {number} arg0
     */
    set grid(arg0) {
        wasm.__wbg_set_tictacthrow_grid(this.__wbg_ptr, arg0);
    }
    /**
     * Stores whose turn it is (1 for p1, -1 for p2)
     * @returns {number}
     */
    get player() {
        const ret = wasm.__wbg_get_tictacthrow_player(this.__wbg_ptr);
        return ret;
    }
    /**
     * Stores whose turn it is (1 for p1, -1 for p2)
     * @param {number} arg0
     */
    set player(arg0) {
        wasm.__wbg_set_tictacthrow_player(this.__wbg_ptr, arg0);
    }
    /**
     * Stores how many turns have passed
     * @returns {number}
     */
    get turn() {
        const ret = wasm.__wbg_get_tictacthrow_turn(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Stores how many turns have passed
     * @param {number} arg0
     */
    set turn(arg0) {
        wasm.__wbg_set_tictacthrow_turn(this.__wbg_ptr, arg0);
    }
    /**
     * Stores which player has won
     * @returns {number}
     */
    get winner() {
        const ret = wasm.__wbg_get_tictacthrow_winner(this.__wbg_ptr);
        return ret;
    }
    /**
     * Stores which player has won
     * @param {number} arg0
     */
    set winner(arg0) {
        wasm.__wbg_set_tictacthrow_winner(this.__wbg_ptr, arg0);
    }
    /**
     * Determines whether or not the game is still running
     * @returns {boolean}
     */
    get active() {
        const ret = wasm.__wbg_get_tictacthrow_active(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * Determines whether or not the game is still running
     * @param {boolean} arg0
     */
    set active(arg0) {
        wasm.__wbg_set_tictacthrow_active(this.__wbg_ptr, arg0);
    }
    /**
     * Stores the past moves that have been made
     * @returns {(Move)[]}
     */
    get past_state() {
        const ret = wasm.__wbg_get_tictacthrow_past_state(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Stores the past moves that have been made
     * @param {(Move)[]} arg0
     */
    set past_state(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_tictacthrow_past_state(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * Converts the board to JSON format
     * @returns {string}
     */
    jsonify() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.tictacthrow_jsonify(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * Returns the state of the board for a single grid.
     * Used to interface with javascript
     * @param {number} grid
     * @returns {Int8Array}
     */
    get_board_by_grid(grid) {
        const ret = wasm.tictacthrow_get_board_by_grid(this.__wbg_ptr, grid);
        var v1 = getArrayI8FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        return v1;
    }
    /**
     * Generates an empty board object
     * @returns {TicTacThrow}
     */
    static new() {
        const ret = wasm.tictacthrow_new();
        return TicTacThrow.__wrap(ret);
    }
    /**
     * Determines whether a given move is valid or not
     * @param {number} grid
     * @param {number} pos
     * @returns {boolean}
     */
    is_valid_move(grid, pos) {
        const ret = wasm.tictacthrow_is_valid_move(this.__wbg_ptr, grid, pos);
        return ret !== 0;
    }
    /**
     * Returns all valid moves for a given grid
     * @param {number} grid
     * @returns {Uint32Array}
     */
    get_valid_moves(grid) {
        const ret = wasm.tictacthrow_get_valid_moves(this.__wbg_ptr, grid);
        var v1 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * Updates the board with the coordinate of a move
     * WARNING: For performance, this does not check that the move is valid.
     * Make sure to run `is_valid_move` before this function
     * @param {number} grid
     * @param {number} pos
     */
    update(grid, pos) {
        wasm.tictacthrow_update(this.__wbg_ptr, grid, pos);
    }
    /**
     * Checks if there is a three-in-a-row in a given grid
     * @param {number} grid
     * @returns {boolean}
     */
    check_for_three(grid) {
        const ret = wasm.tictacthrow_check_for_three(this.__wbg_ptr, grid);
        return ret !== 0;
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_move_unwrap = function(arg0) {
        const ret = Move.__unwrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_move_new = function(arg0) {
        const ret = Move.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_alert_0e5ac31934d0a144 = function(arg0, arg1) {
        alert(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_init_externref_table = function() {
        const table = wasm.__wbindgen_export_0;
        const offset = table.grow(4);
        table.set(0, undefined);
        table.set(offset + 0, undefined);
        table.set(offset + 1, null);
        table.set(offset + 2, true);
        table.set(offset + 3, false);
        ;
    };

    return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedInt8ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;


    wasm.__wbindgen_start();
    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined') {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL('ttt_gamelogic_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync };
export default __wbg_init;
