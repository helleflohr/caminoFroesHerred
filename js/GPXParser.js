var gpxParser = function () {
    this.xmlSource = "", this.metadata = {}, this.waypoints = [], this.tracks = [], this.routes = []
};
gpxParser.prototype.parse = function (e) {
    var t = new window.DOMParser;
    if (this.xmlSource = t.parseFromString(e, "text/xml"), metadata = this.xmlSource.querySelector("metadata"), null != metadata) {
        this.metadata.name = this.getElementValue(metadata, "name"), this.metadata.desc = this.getElementValue(metadata, "desc"), this.metadata.time = this.getElementValue(metadata, "time");
        let e = {},
            t = metadata.querySelector("author");
        if (null != t) {
            e.name = this.getElementValue(t, "name"), e.email = {};
            let l = t.querySelector("email");
            null != l && (e.email.id = l.getAttribute("id"), e.email.domain = l.getAttribute("domain"));
            let a = {},
                r = t.querySelector("link");
            null != r && (a.href = r.getAttribute("href"), a.text = this.getElementValue(r, "text"), a.type = this.getElementValue(r, "type")), e.link = a
        }
        this.metadata.author = e;
        let l = {},
            a = this.queryDirectSelector(metadata, "link");
        null != a && (l.href = a.getAttribute("href"), l.text = this.getElementValue(a, "text"), l.type = this.getElementValue(a, "type"), this.metadata.link = l)
    }
    var l = [].slice.call(this.xmlSource.querySelectorAll("wpt"));
    for (let e in l) {
        var a = l[e];
        let t = {};
        t.name = this.getElementValue(a, "name"), t.lat = parseFloat(a.getAttribute("lat")), t.lon = parseFloat(a.getAttribute("lon")), t.ele = parseFloat(this.getElementValue(a, "ele")) || null, t.cmt = this.getElementValue(a, "cmt"), t.desc = this.getElementValue(a, "desc"), this.waypoints.push(t)
    }
    var r = [].slice.call(this.xmlSource.querySelectorAll("rte"));
    for (let e in r) {
        var i = r[e];
        let t = {};
        t.name = this.getElementValue(i, "name"), t.cmt = this.getElementValue(i, "cmt"), t.desc = this.getElementValue(i, "desc"), t.src = this.getElementValue(i, "src"), t.number = this.getElementValue(i, "number");
        let l = this.queryDirectSelector(i, "type");
        t.type = null != l ? l.innerHTML : null;
        let a = {},
            o = i.querySelector("link");
        null != o && (a.href = o.getAttribute("href"), a.text = this.getElementValue(o, "text"), a.type = this.getElementValue(o, "type")), t.link = a;
        let u = [];
        var s = [].slice.call(i.querySelectorAll("rtept"));
        for (let e in s) {
            var n = s[e];
            let t = {};
            t.lat = parseFloat(n.getAttribute("lat")), t.lon = parseFloat(n.getAttribute("lon")), t.ele = parseFloat(this.getElementValue(n, "ele")), u.push(t)
        }
        t.distance = this.calculDistance(u), t.elevation = this.calcElevation(u), t.points = u, this.routes.push(t)
    }
    var o = [].slice.call(this.xmlSource.querySelectorAll("trk"));
    for (let e in o) {
        var u = o[e];
        let t = {};
        t.name = this.getElementValue(u, "name"), t.cmt = this.getElementValue(u, "cmt"), t.desc = this.getElementValue(u, "desc"), t.src = this.getElementValue(u, "src"), t.number = this.getElementValue(u, "number");
        let l = this.queryDirectSelector(u, "type");
        t.type = null != l ? l.innerHTML : null;
        let a = {},
            r = u.querySelector("link");
        null != r && (a.href = r.getAttribute("href"), a.text = this.getElementValue(r, "text"), a.type = this.getElementValue(r, "type")), t.link = a;
        let i = [];
        var p = [].slice.call(u.querySelectorAll("trkpt"));
        for (let e in p) {
            var m = p[e];
            let t = {};
            t.lat = parseFloat(m.getAttribute("lat")), t.lon = parseFloat(m.getAttribute("lon")), t.ele = parseFloat(this.getElementValue(m, "ele")) || null, i.push(t)
        }
        t.distance = this.calculDistance(i), t.elevation = this.calcElevation(i), t.points = i, this.tracks.push(t)
    }
}, gpxParser.prototype.getElementValue = function (e, t) {
    let l = e.querySelector(t);
    return null != l ? null != l.innerHTML ? l.innerHTML : l.childNodes[0].data : l
}, gpxParser.prototype.queryDirectSelector = function (e, t) {
    let l = e.querySelectorAll(t),
        a = l[0];
    if (l.length > 1) {
        let l = e.childNodes;
        for (idx in l) elem = l[idx], elem.tagName === t && (a = elem)
    }
    return a
}, gpxParser.prototype.calculDistance = function (e) {
    let t = {},
        l = 0,
        a = [];
    for (var r = 0; r < e.length - 1; r++) l += this.calcDistanceBetween(e[r], e[r + 1]), a[r] = l;
    return a[e.length - 1] = l, t.total = l, t.cumul = a, t
}, gpxParser.prototype.calcDistanceBetween = function (e, t) {
    let l = {};
    l.lat = e.lat, l.lon = e.lon;
    let a = {};
    a.lat = t.lat, a.lon = t.lon;
    var r = Math.PI / 180,
        i = l.lat * r,
        s = a.lat * r,
        n = Math.sin((a.lat - l.lat) * r / 2),
        o = Math.sin((a.lon - l.lon) * r / 2),
        u = n * n + Math.cos(i) * Math.cos(s) * o * o;
    return 6371e3 * (2 * Math.atan2(Math.sqrt(u), Math.sqrt(1 - u)))
}, gpxParser.prototype.calcElevation = function (e) {
    for (var t = 0, l = 0, a = {}, r = 0; r < e.length - 1; r++) {
        var i = parseFloat(e[r + 1].ele) - parseFloat(e[r].ele);
        i < 0 ? l += i : i > 0 && (t += i)
    }
    for (var s = [], n = 0, o = (r = 0, e.length); r < o; r++) {
        var u = parseFloat(e[r].ele);
        s.push(u), n += u
    }
    return a.max = Math.max.apply(null, s) || null, a.min = Math.min.apply(null, s) || null, a.pos = Math.abs(t) || null, a.neg = Math.abs(l) || null, a.avg = n / s.length || null, a
}, gpxParser.prototype.toGeoJSON = function () {
    var e = {
        type: "FeatureCollection",
        features: [],
        properties: {
            name: this.metadata.name,
            desc: this.metadata.desc,
            time: this.metadata.time,
            author: this.metadata.author,
            link: this.metadata.link
        }
    };
    for (idx in this.tracks) {
        let a = this.tracks[idx];
        var t = {
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: []
            },
            properties: {}
        };
        for (idx in t.properties.name = a.name, t.properties.cmt = a.cmt, t.properties.desc = a.desc, t.properties.src = a.src, t.properties.number = a.number, t.properties.link = a.link, t.properties.type = a.type, a.points) {
            let e = a.points[idx];
            (l = []).push(e.lon), l.push(e.lat), l.push(e.ele), t.geometry.coordinates.push(l)
        }
        e.features.push(t)
    }
    for (idx in this.routes) {
        let a = this.routes[idx];
        t = {
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: []
            },
            properties: {}
        };
        for (idx in t.properties.name = a.name, t.properties.cmt = a.cmt, t.properties.desc = a.desc, t.properties.src = a.src, t.properties.number = a.number, t.properties.link = a.link, t.properties.type = a.type, a.points) {
            let e = a.points[idx];
            var l;
            (l = []).push(e.lon), l.push(e.lat), l.push(e.ele), t.geometry.coordinates.push(l)
        }
        e.features.push(t)
    }
    for (idx in this.waypoints) {
        let l = this.waypoints[idx];
        (t = {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: []
            },
            properties: {}
        }).properties.name = l.name, t.properties.cmt = l.cmt, t.properties.desc = l.desc, t.geometry.coordinates = [l.lon, l.lat, l.ele], e.features.push(t)
    }
    return e
}, "undefined" != typeof module && (module.exports = gpxParser);