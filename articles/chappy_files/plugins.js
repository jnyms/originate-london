define([

], function(){
	window.log = function(){
		log.history = log.history || [];
		log.history.push(arguments);
		if(this.console){
			arguments.callee = arguments.callee.caller;
			var newarr = [].slice.call(arguments);
		}
	};

	// IE9 fix
	if(!window.console){
		window.console = {
			log : function(){},
			warn : function(){},
			error : function(){},
			time : function(){},
			timeEnd : function(){}
		};
	}

	(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
	{return window.console;}catch(err){return window.console={};}})());

	/* Begin Date Locale Code */
	Date.prototype.getMonthName = function(lang) {
		lang = lang && (lang in Date.locale) ? lang : 'en';
		return Date.locale[lang].month_names[this.getMonth()];
	};

	Date.prototype.getMonthNameShort = function(lang) {
		lang = lang && (lang in Date.locale) ? lang : 'en';
		return Date.locale[lang].month_names_short[this.getMonth()];
	};

	Date.prototype.getDatePadded = function(){
		var r = (this.getDate() < 10) ? '0' + this.getDate() : this.getDate();
		return r;
	};

	Date.prototype.getMinutesPadded = function(){
		var r = (this.getMinutes() < 10) ? '0' + this.getMinutes() : this.getMinutes();
		return r;
	};

	Date.prototype.getDayName = function(lang){
		lang = lang && (lang in Date.locale) ? lang : 'en';
		return Date.locale[lang].day_names[this.getDay()];
	};

	Date.prototype.getDateOrdinalSuffix = function(){
		var date = this.getDate();

		for(var ordinal in Date.ordinals){
			var arr = Date.ordinals[ordinal],
			i = 0, len = arr.length;

			for( ; i < len; i++){
				var arr_date = arr[i];
				if(date === arr_date) return ordinal;
			}
		}

		return '';
	};

	Date.ordinals = {
		'st' : [1, 21, 31],
		'nd' : [2, 22],
		'rd' : [3, 23],
		'th' : [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 24, 25, 26, 27, 28, 29, 30]
	};

	Date.locale = {
		en: {
			month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
			month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			day_names: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
		}
	};
	/* End Date Locale Code */

	/* Begin onmediaquery */
	window.MQ = function (mq) {
		mq = mq || {};

		mq.callbacks = [];
		mq.new_context = mq.context = "";

		mq.init = function (a) {
			if ("undefined" !== typeof a)
				for (i = 0; i < a.length; i++) this.addQuery(a[i]);

			this.addEvent(window, "resize", mq.listenForChange, mq);

			this.listenForChange();
		};

		mq.listenForChange = function () {
			if (document.documentElement.currentStyle) {
				query_string = document.documentElement.currentStyle.fontFamily;
			}

			if (window.getComputedStyle) {
				query_string = window.getComputedStyle(document.documentElement,null).getPropertyValue('font-family');
			}

			if (query_string === null) return;

			query_string = query_string.replace(/['",]/g, '');

			if (query_string !== this.context) {
				this.new_context = query_string;
				this.triggerCallbacks(this.new_context);
			}

			this.context = this.new_context;
		};

		mq.getCurrentContext = function(){
			var query_string;

			if (document.documentElement.currentStyle) {
				query_string = document.documentElement.currentStyle.fontFamily;
			}

			if (window.getComputedStyle) {
				query_string = window.getComputedStyle(document.documentElement,null).getPropertyValue('font-family');
			}

			if (query_string === null) return null;

			return query_string.replace(/['",]/g, '');
		};

		mq.addQuery = function (query_object) {
			if (query_object === null || query_object === undefined) return;

			this.callbacks.push(query_object);

			if (typeof(query_object.context) == "string") {
				query_object.context = [query_object.context];
			}

			if (typeof(query_object.call_for_each_context) !== "boolean") {
				query_object.call_for_each_context = true; // Default
			}

			if (this.context !== '' && this._inArray(this.context, query_object.context)) {
				query_object.callback(this.context);
			}

			return this.callbacks[ this.callbacks.length - 1];
		};

		mq.removeQuery = function (query_object) {
			if (query_object === null || query_object === undefined) return;

			var match = -1;

			while ((match = mq._indexOf(query_object,this.callbacks)) > -1) {
				this.callbacks.splice(match, 1);
			}
		};
		mq.triggerCallbacks = function (a) {
			var c, b;
			for (c = 0; c < this.callbacks.length; c++)!1 == this.callbacks[c].call_for_each_context && this._inArray(this.context, this.callbacks[c].context) || (b = this.callbacks[c].callback, (this._inArray(a, this.callbacks[c].context) || this.callbacks[c].context == 'global') && void 0 !== b && b(a))
		};

		mq.addEvent = function (a, c, b, d) {
			null == a || void 0 == a || (a.addEventListener ? a.addEventListener(c, function () {
				b.call(d)
			}, !1) : a.attachEvent ? a.attachEvent("on" + c, function () {
				b.call(d)
			}) : a["on" + c] = function () {
				b.call(d)
			})
		};

		mq._inArray = function (a, b) {
			for (var e = mq.length, d = 0; d < e; d++)
				if (b[d] == a) return !0;
			return !1;
		};

		return mq;
	}({});/* End onmediaquery */

	/* Begin Polyfills */
	if(!String.prototype.trim){
		String.prototype.trim = function(){
			return this.replace(/^\s+|\s+$/g, '');
		};
	}
	/* End Polyfills */
});