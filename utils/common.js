module.exports = {
    sleep: function(time) {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve('ok');
            }, time);
        })
    }
};