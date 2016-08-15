!function(x,d,s,ids,cs, co,cp) {
        var yjs=d.getElementsByTagName(s)[0],
        getId = function(k){
            var n = k + "=" , q = "cookie" ;
            var ca = d[q].split(";");
            for(var i=0; i<ca.length; i++)
            {
                var ce = ca[i].trim();
                if (ce.indexOf(n)==0)
                    return ce.substring(n.length,ce.length);
            }
            return "";
        },
        ua = function(a){
            var p = [], e = "encodeURIComponent";
            for (var v in a)
                 p.push(x[e](a[v][0]) + "=" + x[e](a[v][1]));
            return p.join("&");
        },
        putScript = function(sct, cm, id ) {
            if(!d.getElementById(id)){
                var js=d.createElement(s);
                js.id=id;
                js.async=true;
                js.src= sct + "?" + ua(cm.q);
                yjs && yjs.parentNode.insertBefore(js,yjs);
            }
        },
        putPixel = function(url, pixel) {
            if(!d.getElementById("nca_" + pixel)) {
                var i = new Image(1,1);
                i.src = url + pixel + ".gif"; 
                i.id = "nca_" + pixel;
                i.style.display = "none";
                var e = document.getElementsByTagName("body")[0];
                e && e.appendChild(i)
            }
        };

        var c = cs[1];
        x["FallsmGlobalObj"] = c;
        x[c] = x[c] || function(){(c.q = c.q || []).push(arguments)};
        c = x[c];
        c("url", x.location.href);
        c("_fp", getId(co));
        c("uid", "1546750051");
        c("ctz", "US/Eastern");
        c("referrer", d.referrer);
        putScript("//fallsm.ndg.io/asynctracker.js", c, ids[1] + "m");
       
        c = cs[0];
        x["NcaGlobalObj"] = c;
        x[c] = x[c] || function(){(c.q = c.q || []).push(arguments)};
        c = x[c];
        c("Account", "NU-1546750051");
        c("url", x.location.href);
        putScript("//ndg.io/ncanobutton.js", c, ids[0]);
 
        x.setTimeout(function() {
            cp.forEach(function(e, i, v){
                putPixel("//c.ndg.io/", e);
            });
        }, 200);
        
        if(cp) {
            putScript("//c.ndg.io/outbound.js", {q:[]}, "ys-conv-outbound");
        }
        
     }(window, document,"script",["ys-fb-sharejs", "ys-falls-js"], ["gnca",  "ysfm"], 
              "__nfmp" , []);