define(function() {
    //Get the parameters in the URL
    var getQueryString = function(name) {
        var qs = location.search.substr(1), // Get the "?"  in the URL.The string after the symbol.
            args = {}, // The object that holds the parameter data
            items = qs.length ? qs.split("&") : [], // Get the first parameter item
            item = null,
            len = items.length;

        for (var i = 0; i < len; i++) {
            item = items[i].split("=");
            var name = decodeURIComponent(item[0]),
                value = decodeURIComponent(item[1]);
            if (name) {
                args[name] = value;
            }
        }
        return args;
    }

    return {
        getQueryString: getQueryString　　
    };
})