(function(w, d){
	_vmp_config = {
		_vmp_str : '_vmp_config',
		_vmp_obj : {},
		_vmp_array : [],
		scripts : d.getElementsByTagName('script'),
		first_script : null,
		this_script : null,
		main_script : null,
		cache_buster : '',
		config : {},
		config_extension_script : null,
		config_extension : {},
		dependancies : [
			SITE_PREFIX + '/system/script'
		]
	};

	_vmp_config.first_script = _vmp_config.scripts[0];
	_vmp_config.this_script = d.getElementById('vmp-require-js');

	if(_vmp_config.this_script){
		_vmp_config.main_script = _vmp_config.this_script.getAttribute('data-main-script');
		_vmp_config.config_extension_script = _vmp_config.this_script.getAttribute('data-config-extension');
		_vmp_config.cache_buster = _vmp_config.this_script.getAttribute('data-asset-version') || '';
	}

	_vmp_config.core_toString = _vmp_config._vmp_obj.toString;
	_vmp_config.core_hasOwn = _vmp_config._vmp_obj.hasOwnProperty;

	_vmp_config.init = function init(){
		if(_vmp_config.main_script && _vmp_config.main_script.length) _vmp_config.dependancies.push(_vmp_config.main_script);

		if(_vmp_config.config_extension_script && _vmp_config.config_extension_script.length){
			var script = d.createElement('script');

			script.src = _vmp_config.config_extension_script;
			script.onerror = _vmp_config.onConfigsLoaded;
			script.onload = function(e){
				_vmp_config.config_extension = vmp_require_config_ext || {};
				_vmp_config.onConfigsLoaded();
			};

			_vmp_config.first_script.parentNode.insertBefore(script, _vmp_config.first_script);
		}else _vmp_config.onConfigsLoaded();
	};

	_vmp_config.onConfigsLoaded = function onConfigsLoaded(){
		_vmp_config.config = _vmp_config.extend(true, {
			baseUrl: '/assets/js',

			deps : _vmp_config.dependancies,

			paths : {
				async : SYSTEM_PREFIX + '/lib/async',
				backbone : SYSTEM_PREFIX + '/lib/backbone.min',
				jquery : SYSTEM_PREFIX + '/lib/jquery.1.9.1.min',
				plugins : SITE_PREFIX + '/system/plugins',
				underscore : SYSTEM_PREFIX + '/lib/underscore.min',
			},

			shim : {
				backbone : {
					deps : [
						"jquery",
						"underscore"
					],
					exports : "Backbone"
				},

				underscore : {
					exports : '_'
				},
			},

			urlArgs : _vmp_config.cache_buster
		}, _vmp_config.config_extension);

		require.config(_vmp_config.config);
	};

	_vmp_config.extend = function extend(){
		var source, copy_is_array, copy, name, options, clone,
			target = arguments[0] || {},
			i = 1,
			len = arguments.length,
			deep = false;

		if(typeof target === "boolean"){
			deep = target;
			target = arguments[1] || {};
			i = 2;
		}

		if(typeof target !== "object" && !_vmp_config.isFunction(target)) target = {};

		if(len === i){
			target = this;
			--i;
		}

		for( ; i < len; i++){
			if((options = arguments[i]) !== null){
				for(name in options){
					src = target[name];
					copy = options[name];

					if(target === copy) continue;

					if(deep && copy && (_vmp_config.isPlainObject(copy) || (copy_is_array = _vmp_config.isArray(copy)))){
						if(copy_is_array){
							copy_is_array = false;
							clone = src && _vmp_config.isArray(src) ? src : [];
						}else clone = src && _vmp_config.isPlainObject(src) ? src : {};

						target[name] = _vmp_config.extend(deep, clone, copy);
					}else if(copy !== undefined) target[name] = copy;
				}
			}
		}

		return target;
	};

	_vmp_config.isArray = Array.isArray || function isArray(obj){
		return _vmp_config.type(obj) === "array";
	};

	_vmp_config.isFunction = function isFunction(obj){
		return _vmp_config.type(obj) === "function";
	};

	_vmp_config.isWindow = function isWindow(obj){
		return obj !== null && obj == obj.window;
	};

	_vmp_config.isPlainObject = function isPlainObject(obj){
		var key;

		if(!obj || _vmp_config.type(obj) !== "object" || obj.nodeType || _vmp_config.isWindow(obj)) return false;

		try{
			if(obj.constructor &&
				!_vmp_config.core_hasOwn.call(obj, "constructor") &&
				!_vmp_config.core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) return false;
		}catch(err){
			return false;
		}

		for(key in obj){}

		return key === undefined || _vmp_config.core_hasOwn.call(obj, key);
	};

	_vmp_config.type = function type(obj){
		if(obj === null) return String(obj);

		return typeof obj === "object" || typeof obj === "function" ? _vmp_config._vmp_obj[_vmp_config.core_toString.call(obj)] || "object" : typeof obj;
	};

	_vmp_config.init();
})(window, document);
