var fs = require('fs');
var path = process.argv[2];
var validWords = splitWords(fs.readFileSync(path, "utf-8"));

readStdin(function (input) {
    const validWordsMap = new Map();
    validWords.forEach(function (w) {
        validWordsMap.set(w, w);
    });

    splitWords(input).forEach(function (w) {
        const line = validWordsMap.get(w) ? w : `<${w}>`;
        console.log(line);
    });
});

function splitWords(str) {
    return str.split(/\s+/).filter(function (w) {
        return w.length > 0;
    });
}

function readStdin(cb) {
    var data = "";
    process.stdin.setEncoding('utf8');
    process.stdin.on('readable', function() {
        var chunk = process.stdin.read();
        if (chunk !== null) {
            data += chunk;
        }
    });
    process.stdin.on('end', function() {
        cb(data);
    });
}
