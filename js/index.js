var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
};
var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();
var openModule = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/ regeneratorRuntime.mark(
        function _callee(name) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            currentModule.data = editor.toJSON();

                            currentModule = modules[name];
                            _context.next = 4;
                            return (
                                editor.fromJSON(currentModule.data));
                        case 4:
                            editor.trigger('process');
                        case 5:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));
    return function openModule(_x3) {
        return _ref2.apply(this, arguments);
    };
}();

function _asyncToGenerator(fn) {
    return function () {
        var gen = fn.apply(this, arguments);
        return new Promise(function (resolve, reject) {
            function step(key, arg) {
                try {
                    var info = gen[key](arg);
                    var value = info.value;
                } catch (error) {
                    reject(error);
                    return;
                }
                if (info.done) {
                    resolve(value);
                } else {
                    return Promise.resolve(value).then(function (value) {
                        step("next", value);
                    }, function (err) {
                        step("throw", err);
                    });
                }
            }
            return step("next");
        });
    };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var numSocket = new Rete.Socket("Number");
var floatSocket = new Rete.Socket("Float");

var TextControl = function (_Rete$Control) {
    _inherits(TextControl, _Rete$Control);

    function TextControl(emitter, key, readonly) {
        var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'text';
        _classCallCheck(this, TextControl);
        var _this = _possibleConstructorReturn(this, (TextControl.__proto__ || Object.getPrototypeOf(TextControl)).call(this, key));
        _this.emitter = emitter;
        _this.key = key;
        _this.type = type;
        _this.template = "<input type=\"" + type + "\" :readonly=\"readonly\" :value=\"value\" @input=\"change($event)\"/>";
        _this.scope = {
            value: null,
            readonly: readonly,
            change: _this.change.bind(_this)
        };
        return _this;
    }
    _createClass(TextControl, [{
        key: "onChange",
        value: function onChange() {}
    }, {
        key: "change",
        value: function change(e) {
            this.scope.value = this.type === 'number' ? +e.target.value : e.target.value;
            this.update();
            this.onChange();
        }
    }, {
        key: "update",
        value: function update() {
            if (this.key) this.putData(this.key, this.scope.value);
            this.emitter.trigger('process');
            this._alight.scan();
        }
    }, {
        key: "mounted",
        value: function mounted() {
            this.scope.value = this.getData(this.key) || (this.type === 'number' ? 0 : '...');
            this.update();
        }
    }, {
        key: "setValue",
        value: function setValue(val) {
            this.scope.value = val;
            this._alight.scan();
        }
    }]);
    return TextControl;
}(Rete.Control);
var InputComponent = function (_Rete$Component) {
    _inherits(InputComponent, _Rete$Component);

    function InputComponent() {
        _classCallCheck(this, InputComponent);
        var _this2 = _possibleConstructorReturn(this, (InputComponent.__proto__ || Object.getPrototypeOf(InputComponent)).call(this, "Input"));
        _this2.module = {
            nodeType: 'input',
            socket: numSocket
        };
        return _this2;
    }
    _createClass(InputComponent, [{
        key: "builder",
        value: function builder(node) {
            var out1 = new Rete.Output('output', "Number", numSocket);
            var ctrl = new TextControl(this.editor, 'name');
            return node.addControl(ctrl).addOutput(out1);
        }
    }]);
    return InputComponent;
}(Rete.Component);
var ModuleComponent = function (_Rete$Component2) {
    _inherits(ModuleComponent, _Rete$Component2);

    function ModuleComponent() {
        _classCallCheck(this, ModuleComponent);
        var _this3 = _possibleConstructorReturn(this, (ModuleComponent.__proto__ || Object.getPrototypeOf(ModuleComponent)).call(this, "Module"));
        _this3.module = {
            nodeType: 'module'
        };
        return _this3;
    }
    _createClass(ModuleComponent, [{
        key: "builder",
        value: function builder(node) {
            var _this4 = this;
            var ctrl = new TextControl(this.editor, 'module');
            ctrl.onChange = function () {
                console.log(_this4);
                _this4.updateModuleSockets(node);
                node._alight.scan();
            };
            return node.addControl(ctrl);
        }
    }, {
        key: "change",
        value: function change(node, item) {
            node.data.module = item;
            this.editor.trigger('process');
        }
    }]);
    return ModuleComponent;
}(Rete.Component);
var OutputComponent = function (_Rete$Component3) {
    _inherits(OutputComponent, _Rete$Component3);

    function OutputComponent() {
        _classCallCheck(this, OutputComponent);
        var _this5 = _possibleConstructorReturn(this, (OutputComponent.__proto__ || Object.getPrototypeOf(OutputComponent)).call(this, "Output"));
        _this5.module = {
            nodeType: 'output',
            socket: numSocket
        };
        return _this5;
    }
    _createClass(OutputComponent, [{
        key: "builder",
        value: function builder(node) {
            var inp = new Rete.Input('input', "Number", numSocket);
            var ctrl = new TextControl(this.editor, 'name');
            return node.addControl(ctrl).addInput(inp);
        }
    }]);
    return OutputComponent;
}(Rete.Component);
var OutputFloatComponent = function (_Rete$Component4) {
    _inherits(OutputFloatComponent, _Rete$Component4);

    function OutputFloatComponent() {
        _classCallCheck(this, OutputFloatComponent);
        var _this6 = _possibleConstructorReturn(this, (OutputFloatComponent.__proto__ || Object.getPrototypeOf(OutputFloatComponent)).call(this, "Float Output"));
        _this6.module = {
            nodeType: 'output',
            socket: floatSocket
        };
        return _this6;
    }
    _createClass(OutputFloatComponent, [{
        key: "builder",
        value: function builder(node) {
            var inp = new Rete.Input('float', "Float", floatSocket);
            var ctrl = new TextControl(this.editor, 'name');
            return node.addControl(ctrl).addInput(inp);
        }
    }]);
    return OutputFloatComponent;
}(Rete.Component);
var NumComponent = function (_Rete$Component5) {
    _inherits(NumComponent, _Rete$Component5);

    function NumComponent() {
        _classCallCheck(this, NumComponent);
        return _possibleConstructorReturn(this, (NumComponent.__proto__ || Object.getPrototypeOf(NumComponent)).call(this, "Number"));
    }
    _createClass(NumComponent, [{
        key: "builder",
        value: function builder(node) {
            var out1 = new Rete.Output('num', "Number", numSocket);
            var ctrl = new TextControl(this.editor, 'num', false, 'number');
            return node.addControl(ctrl).addOutput(out1);
        }
    }, {
        key: "worker",
        value: function worker(node, inputs, outputs) {
            outputs['num'] = node.data.num;
        }
    }]);
    return NumComponent;
}(Rete.Component);
var AddComponent = function (_Rete$Component6) {
    _inherits(AddComponent, _Rete$Component6);

    function AddComponent() {
        _classCallCheck(this, AddComponent);
        return _possibleConstructorReturn(this, (AddComponent.__proto__ || Object.getPrototypeOf(AddComponent)).call(this, "Add"));
    }
    _createClass(AddComponent, [{
        key: "builder",
        value: function builder(node) {
            var inp1 = new Rete.Input('num1', "Number", numSocket);
            var inp2 = new Rete.Input('num2', "Number", numSocket);
            var out = new Rete.Output('num', "Number", numSocket);
            inp1.addControl(new TextControl(this.editor, 'num1', false, 'number'));
            inp2.addControl(new TextControl(this.editor, 'num2', false, 'number'));
            return node.addInput(inp1).addInput(inp2).addControl(new TextControl(this.editor, 'preview', true)).addOutput(out);
        }
    }, {
        key: "worker",
        value: function worker(node, inputs, outputs) {
            var _ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
                silent = _ref.silent;
            var n1 = inputs['num1'].length ? inputs['num1'][0] : node.data.num1;
            var n2 = inputs['num2'].length ? inputs['num2'][0] : node.data.num2;
            var sum = n1 + n2;
            if (!silent) this.editor.nodes.find(function (n) {
                return n.id == node.id;
            }).controls.get('preview').setValue(sum);
            outputs['num'] = sum;
        }
    }, {
        key: "created",
        value: function created(node) {
            console.log('created', node);
        }
    }, {
        key: "destroyed",
        value: function destroyed(node) {
            console.log('destroyed', node);
        }
    }]);
    return AddComponent;
}(Rete.Component); /////////////////////
var container = document.querySelector('#rete');
var editor = null;
var initialData = function initialData() {
    return {
        id: 'demo@0.1.0',
        nodes: {}
    };
};
var modules = _extends({}, modulesData);
var currentModule = {};

function addModule() {
    modules['module' + Object.keys(modules).length + '.rete'] = {
        data: initialData()
    };
}

function Save() {
    console.log(editor.toJSON())
}

alight('#modules', {
    modules: modules,
    addModule: addModule,
    Save: Save,
    openModule: openModule
});


var editor = new Rete.NodeEditor("demo@0.1.0", container);
editor.use(ConnectionPlugin, {
    curvature: 0.4
});
editor.use(AlightRenderPlugin);
editor.use(ContextMenuPlugin);

var engine = new Rete.Engine("demo@0.1.0");

editor.use(ModulePlugin, {
    engine: engine,
    modules: modules
});
//engine.use(ProfilerPlugin, { editor, enabled: true });

[new NumComponent(), new AddComponent(), new InputComponent(), new ModuleComponent(), new OutputComponent(), new OutputFloatComponent()].map(function (c) {
    editor.register(c);
    engine.register(c);
});


editor.on("process connectioncreated connectionremoved", _asyncToGenerator( /*#__PURE__*/ regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    if (!
                        editor.silent) {
                        _context2.next = 2;
                        break;
                    }
                    return _context2.abrupt("return");
                case 2:
                    _context2.next = 4;
                    return (

                        engine.abort());
                case 4:
                    _context2.next = 6;
                    return (
                        engine.process(editor.toJSON()));
                case 6:
                case "end":
                    return _context2.stop();
            }
        }
    }, _callee2, undefined);
})));


editor.view.resize();
openModule('index.rete').then(function () {
    AreaPlugin.zoomAt(editor);
});