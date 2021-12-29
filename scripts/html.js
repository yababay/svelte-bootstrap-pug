'use strict';

var pug = (function(exports) {

  var pug_has_own_property = Object.prototype.hasOwnProperty;

  /**
   * Merge two attribute objects giving precedence
   * to values in object `b`. Classes are special-cased
   * allowing for arrays and merging/joining appropriately
   * resulting in a string.
   *
   * @param {Object} a
   * @param {Object} b
   * @return {Object} a
   * @api private
   */

  exports.merge = pug_merge;
  function pug_merge(a, b) {
    if (arguments.length === 1) {
      var attrs = a[0];
      for (var i = 1; i < a.length; i++) {
        attrs = pug_merge(attrs, a[i]);
      }
      return attrs;
    }

    for (var key in b) {
      if (key === 'class') {
        var valA = a[key] || [];
        a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
      } else if (key === 'style') {
        var valA = pug_style(a[key]);
        valA = valA && valA[valA.length - 1] !== ';' ? valA + ';' : valA;
        var valB = pug_style(b[key]);
        valB = valB && valB[valB.length - 1] !== ';' ? valB + ';' : valB;
        a[key] = valA + valB;
      } else {
        a[key] = b[key];
      }
    }

    return a;
  }
  /**
   * Process array, object, or string as a string of classes delimited by a space.
   *
   * If `val` is an array, all members of it and its subarrays are counted as
   * classes. If `escaping` is an array, then whether or not the item in `val` is
   * escaped depends on the corresponding item in `escaping`. If `escaping` is
   * not an array, no escaping is done.
   *
   * If `val` is an object, all the keys whose value is truthy are counted as
   * classes. No escaping is done.
   *
   * If `val` is a string, it is counted as a class. No escaping is done.
   *
   * @param {(Array.<string>|Object.<string, boolean>|string)} val
   * @param {?Array.<string>} escaping
   * @return {String}
   */
  exports.classes = pug_classes;
  function pug_classes_array(val, escaping) {
    var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
    for (var i = 0; i < val.length; i++) {
      className = pug_classes(val[i]);
      if (!className) continue;
      escapeEnabled && escaping[i] && (className = pug_escape(className));
      classString = classString + padding + className;
      padding = ' ';
    }
    return classString;
  }
  function pug_classes_object(val) {
    var classString = '', padding = '';
    for (var key in val) {
      if (key && val[key] && pug_has_own_property.call(val, key)) {
        classString = classString + padding + key;
        padding = ' ';
      }
    }
    return classString;
  }
  function pug_classes(val, escaping) {
    if (Array.isArray(val)) {
      return pug_classes_array(val, escaping);
    } else if (val && typeof val === 'object') {
      return pug_classes_object(val);
    } else {
      return val || '';
    }
  }

  /**
   * Convert object or string to a string of CSS styles delimited by a semicolon.
   *
   * @param {(Object.<string, string>|string)} val
   * @return {String}
   */

  exports.style = pug_style;
  function pug_style(val) {
    if (!val) return '';
    if (typeof val === 'object') {
      var out = '';
      for (var style in val) {
        /* istanbul ignore else */
        if (pug_has_own_property.call(val, style)) {
          out = out + style + ':' + val[style] + ';';
        }
      }
      return out;
    } else {
      return val + '';
    }
  }
  /**
   * Render the given attribute.
   *
   * @param {String} key
   * @param {String} val
   * @param {Boolean} escaped
   * @param {Boolean} terse
   * @return {String}
   */
  exports.attr = pug_attr;
  function pug_attr(key, val, escaped, terse) {
    if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
      return '';
    }
    if (val === true) {
      return ' ' + (terse ? key : key + '="' + key + '"');
    }
    var type = typeof val;
    if ((type === 'object' || type === 'function') && typeof val.toJSON === 'function') {
      val = val.toJSON();
    }
    if (typeof val !== 'string') {
      val = JSON.stringify(val);
      if (!escaped && val.indexOf('"') !== -1) {
        return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
      }
    }
    if (escaped) val = pug_escape(val);
    return ' ' + key + '="' + val + '"';
  }
  /**
   * Render the given attributes object.
   *
   * @param {Object} obj
   * @param {Object} terse whether to use HTML5 terse boolean attributes
   * @return {String}
   */
  exports.attrs = pug_attrs;
  function pug_attrs(obj, terse){
    var attrs = '';

    for (var key in obj) {
      if (pug_has_own_property.call(obj, key)) {
        var val = obj[key];

        if ('class' === key) {
          val = pug_classes(val);
          attrs = pug_attr(key, val, false, terse) + attrs;
          continue;
        }
        if ('style' === key) {
          val = pug_style(val);
        }
        attrs += pug_attr(key, val, false, terse);
      }
    }

    return attrs;
  }
  /**
   * Escape the given string of `html`.
   *
   * @param {String} html
   * @return {String}
   * @api private
   */

  var pug_match_html = /["&<>]/;
  exports.escape = pug_escape;
  function pug_escape(_html){
    var html = '' + _html;
    var regexResult = pug_match_html.exec(html);
    if (!regexResult) return _html;

    var result = '';
    var i, lastIndex, escape;
    for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
      switch (html.charCodeAt(i)) {
        case 34: escape = '&quot;'; break;
        case 38: escape = '&amp;'; break;
        case 60: escape = '&lt;'; break;
        case 62: escape = '&gt;'; break;
        default: continue;
      }
      if (lastIndex !== i) result += html.substring(lastIndex, i);
      lastIndex = i + 1;
      result += escape;
    }
    if (lastIndex !== i) return result + html.substring(lastIndex, i);
    else return result;
  }
  /**
   * Re-throw the given `err` in context to the
   * the pug in `filename` at the given `lineno`.
   *
   * @param {Error} err
   * @param {String} filename
   * @param {String} lineno
   * @param {String} str original source
   * @api private
   */

  exports.rethrow = pug_rethrow;
  function pug_rethrow(err, filename, lineno, str){
    if (!(err instanceof Error)) throw err;
    if ((typeof window != 'undefined' || !filename) && !str) {
      err.message += ' on line ' + lineno;
      throw err;
    }
    try {
      str = str || require('fs').readFileSync(filename, 'utf8');
    } catch (ex) {
      pug_rethrow(err, null, lineno);
    }
    var context = 3
      , lines = str.split('\n')
      , start = Math.max(lineno - context, 0)
      , end = Math.min(lines.length, lineno + context);

    // Error context
    var context = lines.slice(start, end).map(function(line, i){
      var curr = i + start + 1;
      return (curr == lineno ? '  > ' : '    ')
        + curr
        + '| '
        + line;
    }).join('\n');

    // Alter exception message
    err.path = filename;
    err.message = (filename || 'Pug') + ':' + lineno
      + '\n' + context + '\n\n' + err.message;
    throw err;
  }
  return exports
})({});

function templateFn(locals) {var pug_html = "", pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {};
;var locals_for_with = (locals || {});(function (asideLinks, brand, brandWithEndIcons, copyright, footerWithCopyright, headerMainFooter, logoFormat, title, withAsideMenu, withBootstrap, withSvelte) {var pug_indent = [];
pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
pug_html = pug_html + "\n\u003Chtml lang=\"ru\"\u003E";
pug_html = pug_html + "\n  \u003Chead\u003E";
pug_html = pug_html + "\n    \u003Cmeta charset=\"utf-8\"\u003E";
pug_html = pug_html + "\n    \u003Cmeta name=\"viewport\" content=\"width=device-width,initial-scale=1\"\u003E";
if (withBootstrap) {
pug_html = pug_html + "\n    \u003Clink rel=\"stylesheet\" href=\"vendors\u002Fcss\u002Fbootstrap.min.css\"\u003E";
pug_html = pug_html + "\n    \u003Cscript defer src=\"vendors\u002Fjs\u002Fbootstrap.bundle.min.js\"\u003E\u003C\u002Fscript\u003E";
}
if (headerMainFooter) {
pug_html = pug_html + "\n    \u003Clink rel=\"stylesheet\" href=\"css\u002Fheader-main-footer.css\"\u003E";
}
if (withAsideMenu) {
pug_html = pug_html + "\n    \u003Clink rel=\"stylesheet\" href=\"css\u002Fwith-aside-menu.css\"\u003E";
}
if (logoFormat == "svg") {
pug_html = pug_html + "\n    \u003Clink rel=\"icon\" type=\"image\u002Fsvg+xml\" href=\"img\u002Findex.svg\"\u003E";
}
else {
pug_html = pug_html + "\n    \u003Clink rel=\"icon\" type=\"image\u002Fpng\" href=\"favicon.png\"\u003E";
}
if (withSvelte) {
pug_html = pug_html + "\n    \u003Clink rel=\"stylesheet\" href=\"build\u002Fbundle.css\"\u003E";
pug_html = pug_html + "\n    \u003Cscript defer src=\"build\u002Fbundle.js\"\u003E\u003C\u002Fscript\u003E";
}
pug_html = pug_html + "\n    \u003Clink rel=\"stylesheet\" href=\"css\u002Findex.css\"\u003E";
pug_html = pug_html + "\n    \u003Ctitle\u003E";
pug_html = pug_html + (pug.escape(null == (pug_interp = title) ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E\n  \u003C\u002Fhead\u003E";
pug_html = pug_html + "\n  \u003Cbody\u003E";
pug_html = pug_html + "\n    \u003Cheader\u003E";
if (brandWithEndIcons) {
pug_html = pug_html + "\n      \u003Cnav class=\"navbar navbar-dark bg-dark shadow\"\u003E";
pug_html = pug_html + "\u003Ca class=\"navbar-brand ms-3\" href=\"#\u002F\"\u003E";
if (logoFormat == "svg") {
pug_html = pug_html + "\u003Cimg class=\"me-2\" src=\"img\u002Findex.svg\" alt=\"logo\"\u003E";
}
else {
pug_html = pug_html + "\u003Cimg class=\"me-2\" src=\"img\u002Findex.png\" alt=\"logo\" width=\"32\" height=\"32\"\u003E";
}
pug_html = pug_html + "\u003Cspan\u003E";
pug_html = pug_html + (pug.escape(null == (pug_interp = brand) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fa\u003E";
pug_html = pug_html + "\n        \u003Cul class=\"nav navbar-nav me-3 flex-row\"\u003E\u003C\u002Ful\u003E\n      \u003C\u002Fnav\u003E";
}
pug_html = pug_html + "\n    \u003C\u002Fheader\u003E";
pug_html = pug_html + "\n    \u003Cmain\u003E";
if (withAsideMenu) {
pug_html = pug_html + "\n      \u003Caside class=\"p-3 bg-light\"\u003E";
// iterate asideLinks
;(function(){
  var $$obj = asideLinks;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var section = $$obj[pug_index0];
pug_html = pug_html + "\u003Ca" + (" class=\"d-flex align-items-center mb-3 mt-3 mb-md-0 me-md-auto text-decoration-none link-dark\""+pug.attr("href", section.link, true, true)) + "\u003E";
pug_html = pug_html + "\u003Cspan class=\"fs-5\"\u003E";
pug_html = pug_html + (pug.escape(null == (pug_interp = section.title) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fa\u003E";
pug_html = pug_html + "\n        \u003Chr\u003E";
pug_html = pug_html + "\n        \u003Cul class=\"nav nav-pills flex-column mb-auto\"\u003E\u003C\u002Ful\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var section = $$obj[pug_index0];
pug_html = pug_html + "\u003Ca" + (" class=\"d-flex align-items-center mb-3 mt-3 mb-md-0 me-md-auto text-decoration-none link-dark\""+pug.attr("href", section.link, true, true)) + "\u003E";
pug_html = pug_html + "\u003Cspan class=\"fs-5\"\u003E";
pug_html = pug_html + (pug.escape(null == (pug_interp = section.title) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fa\u003E";
pug_html = pug_html + "\n        \u003Chr\u003E";
pug_html = pug_html + "\n        \u003Cul class=\"nav nav-pills flex-column mb-auto\"\u003E\u003C\u002Ful\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\n      \u003C\u002Faside\u003E";
pug_html = pug_html + "\n      \u003Carticle\u003E";
pug_html = pug_html + "&nbsp;\u003C\u002Farticle\u003E";
}
pug_html = pug_html + "\n    \u003C\u002Fmain\u003E";
pug_html = pug_html + "\n    \u003Cfooter class=\"footer\"\u003E";
if (footerWithCopyright) {
var year = new Date().getFullYear();
pug_html = pug_html + "\n      \u003Chr\u003E";
pug_html = pug_html + "\n      \u003Cdiv class=\"bg-light text-center w-100\"\u003E";
if (copyright) {
pug_html = pug_html + "\n        ";
pug_html = pug_html + "&copy;";
pug_html = pug_html + "\n        ";
pug_html = pug_html + "&nbsp;";
pug_html = pug_html + "\u003Cspan\u003E";
pug_html = pug_html + (pug.escape(null == (pug_interp = copyright) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
pug_html = pug_html + ",&nbsp;";
pug_html = pug_html + "\u003Cspan\u003E";
pug_html = pug_html + (pug.escape(null == (pug_interp = year) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\n      \u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\n    \u003C\u002Ffooter\u003E\n  \u003C\u002Fbody\u003E\n\u003C\u002Fhtml\u003E";}.call(this,"asideLinks" in locals_for_with?locals_for_with.asideLinks:typeof asideLinks!=="undefined"?asideLinks:undefined,"brand" in locals_for_with?locals_for_with.brand:typeof brand!=="undefined"?brand:undefined,"brandWithEndIcons" in locals_for_with?locals_for_with.brandWithEndIcons:typeof brandWithEndIcons!=="undefined"?brandWithEndIcons:undefined,"copyright" in locals_for_with?locals_for_with.copyright:typeof copyright!=="undefined"?copyright:undefined,"footerWithCopyright" in locals_for_with?locals_for_with.footerWithCopyright:typeof footerWithCopyright!=="undefined"?footerWithCopyright:undefined,"headerMainFooter" in locals_for_with?locals_for_with.headerMainFooter:typeof headerMainFooter!=="undefined"?headerMainFooter:undefined,"logoFormat" in locals_for_with?locals_for_with.logoFormat:typeof logoFormat!=="undefined"?logoFormat:undefined,"title" in locals_for_with?locals_for_with.title:typeof title!=="undefined"?title:undefined,"withAsideMenu" in locals_for_with?locals_for_with.withAsideMenu:typeof withAsideMenu!=="undefined"?withAsideMenu:undefined,"withBootstrap" in locals_for_with?locals_for_with.withBootstrap:typeof withBootstrap!=="undefined"?withBootstrap:undefined,"withSvelte" in locals_for_with?locals_for_with.withSvelte:typeof withSvelte!=="undefined"?withSvelte:undefined));} catch (err) {pug.rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);}return pug_html;}

var html = settings => templateFn(settings);

module.exports = html;
