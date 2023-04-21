const config = overall_test();
console.log(config);

function play (content) {
    console.log(content);
}

function save () {
    const answers = document.getElementsByTagName("textarea")
    Array.prototype.slice.call(answers).forEach(answer => {
        console.log(answer.value);
    });
}

Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});
Handlebars.registerHelper('breaklines', function(text) {
    text = Handlebars.Utils.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r|\/n)/gm, '<br>');
    return new Handlebars.SafeString(text);
});
var source = document.getElementById("entry-template").innerHTML;
var template = Handlebars.compile(source);
// console.log(template(config));
document.getElementById("main").innerHTML = template(config);