/** Out bound tracking **/
var CNdgSettings = {conversion_url:"//c.ndg.io/c/{pixel_id}.gif" };
!(function () {

    var extend = function(){
        for(var i=1; i<arguments.length; i++)
            for(var key in arguments[i])
                if(arguments[i].hasOwnProperty(key))
                    arguments[0][key] = arguments[i][key];
        return arguments[0];
    }
    var bind = function(type, data, elem, eventHandle) {
        if ( elem.addEventListener ) {
                elem.addEventListener( type, function(e){
                    data && extend(e, {data: data,element:elem});
                    eventHandle(e);
                }, false );
        } else if ( elem.attachEvent ) {
                elem.attachEvent( "on" + type, function(e){
                    data && extend(e, {data: data,element:elem});
                    eventHandle(e);
                } );
        }
        //elem.setAttribute("data-nca_binded", true);
    }

    var each = function(object, callback) {
        try {
            var name, i = 0,
                    length = object.length,
                    isObj = length === undefined || typeof object === 'function';
            if (isObj) {
                for (name in object) {
                    if (callback.call(object[name], name, object[name]) === false) {
                        break;
                    }
                }
            } else {
                for (; i < length; ) {
                    if (callback.call(object[i], i, object[i++]) === false) {
                        break;
                    }
                }
            }
        } catch (e) {
            log('Error', e);
        }
        return object;
    };

    var Nlist = function(){
        this.dct = {};
        this.k = new Array();
    };
    Nlist.prototype.put = function put(key, value){
        this.dct[key] = value;
        var i = this.k.indexOf(key);
        if (i == -1) this.k.push(key);
        return this;
    };
    Nlist.prototype.get = function get(key){
        return this.dct[key];
    };
    Nlist.prototype.remove = function remove(key) {
        var i = this.k.indexOf(key);
        if (i != -1) {
            this.k.splice(i, 1);
            delete this.dct[key];
        }
        return this;
    };
    Nlist.prototype.clear = function clear(){
        this.dct = {};
        this.k = new Array();
    };
    Nlist.prototype.size = function size(){
        return this.k.length;
    };
    Nlist.prototype.query =  function(){
        var p = [];
        for (var key in this.dct)
            if (this.dct.hasOwnProperty(key))
                p.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.dct[key]));
        return p.join('&');
    };
    Nlist.prototype.send = function(url, callback) {
        var i = new Image(1,1);
        i.src = url + '?' + this.query();
        if(typeof callback == 'function') {
            if (i.complete) {
                callback();
            }
            else {
                var loaded = false;
                i.addEventListener('load', function(){
                    if(loaded != true)
                        callback();
                    loaded = true;
                });
                setTimeout(function(){
                    if(loaded != true) {
                        callback();
                        loaded = true;
                    }
                }, 4000);
            }
        }
    };

    var Ndg = function () {
        this.e = {kup: undefined};
        var _me = this;
        bind('keydown', {}, document, function (e) {
            _me.e.kup = e;
        });
    };

    Ndg.prototype.el = function (t) {
        this.t = t;
    }

    Ndg.prototype.setPixel = function(p) {
        this.pixel = p;
    }

    Ndg.prototype.send = function (a) {
        var u = get_c_url();
        var d = {};
        a[0] && extend(d, {cat:a[0]});
        a[1] && extend(d, {brand:a[1]});
        a[2] && extend(d, {action:a[2]});
        extend(d, { u: this.t.href});
        send_img(u, d);
        /**
         * We will use this later.
         *window.navigator.sendBeacon ? window.navigator.sendBeacon(u, JSON.stringify(d)) :
         send_img(u, d);
         **/
    };

    var _ndg = new Ndg();
    var send_img = function (u, d) {
        var nlist = new Nlist();
        each(d, function (i, v) {
            nlist.put(i, v);
        });
        nlist.send(u);
    };
    var get_c_url = function () {
        var url = CNdgSettings.conversion_url;
        return url.replace('{pixel_id}', _ndg.pixel);
    },
    is_new_target = function (a) {
        if ('_blank' == a.target) {
            return true;
        }
        if (_ndg.e.kup) {
            if (_ndg.e.kup.keyCode == 16 || _ndg.e.kup.keyCode == 17) {
                return true;
            }
        }
        return false;
    },
    is_anchor = function (a) {
        if (a.tagName) {
            if ("a" == a.tagName.toLowerCase()) {
                return true;
            }
        }
        return false;
    },
    ha_event = function (e) {
        var e = e || window.event,
                t = e.target || e.srcElement;
        if (is_anchor(t) && !is_new_target(t)) {
            e.preventDefault();
            window.setTimeout(function () {
                window.location = t.href;
            }, 100);
        }
        _ndg.el(t);
    }

    window['ndg'] = function (args, e) {
        var pixel = args[0] || "",
        method = args[1] || "";

        if(!pixel || !method) {
            return false;
        }
        _ndg.setPixel(pixel);

        if (typeof _ndg[method] != 'undefined') {
            ha_event(e);
            args.splice(0, 2);
            _ndg[method].call(_ndg, args);
        }
    };

})(window);
