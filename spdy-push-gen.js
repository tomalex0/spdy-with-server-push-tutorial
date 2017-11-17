/**
 *  Generate spdy push script dynamically based on  client side script list
 *
 */

// var jslist = [];
// $("script").each(function(index,item){
//     var src = $(item).attr("src");
//     if(src && src.startsWith("/") && !src.startsWith("//")){
//         jslist.push(src)
//     }
//
// })

let jslist = ["/node_modules/tether/dist/js/tether.min.js",
    "/node_modules/jquery/dist/jquery.min.js",
    "/node_modules/bootstrap/dist/js/bootstrap.min.js",
    "/node_modules/jquery-lazyload/jquery.lazyload.js",
    "/lib/at.js/dist/js/jquery.atwho.js", "/lib/jquery.caret/dist/jquery.caret.min.js",
    "/node_modules/froala-editor/js/froala_editor.pkgd.min.js",
    "/node_modules/autosize/dist/autosize.min.js", "/js/polyfills.3.7.23.js", "/js/vendor.3.7.23.js",
    "/node_modules/moment/moment.js",
    "/node_modules/moment-timezone/builds/moment-timezone-with-data.min.js",
    "/node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js"
    ];


function stringReplaceAll(content, str1, str2, ignore){
    return content.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,'\\$&'),(ignore?'gi':'g')),(typeof(str2)=='string')?str2.replace(/\$/g,'$$$$'):str2);
};
jslist.forEach(function(item){
    var filearr = item.split('/');
    var filename = filearr.reverse()[0];
    var variablename = stringReplaceAll(filename,'.','');
    variablename = stringReplaceAll(variablename,'-','');
    var resvar = `var ${variablename} = fs.readFileSync('./.build${item}');`
    var respush = `
        res.push('${item}?version=3.7.23', headers, function (err, stream) {
            if (err) return;

            stream.end(${variablename});
        });
    `;
    //console.log(resvar);
    console.log(respush)
})