const config = overall_test();
console.log(config);

const source = document.getElementById("entry-template").innerHTML;
const template = Handlebars.compile(source);

let index = 0;

function play () {
    console.log(config[index]);
}

function previous () {
    if (index === 0) {
        return
    }

    index--;
    document.getElementById("main").innerHTML = template({ config: config[index] });
}

function save () {
    const answer = document.getElementById("answer").value
    console.log(answer, config[index].question_id);
    index++;
    // console.log(template({ config: config[index] }));
    document.getElementById("main").innerHTML = template({ config: config[index] });
}

Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});
Handlebars.registerHelper('breaklines', function(text) {
    text = Handlebars.Utils.escapeExpression(text);
    text = text.replace(/(\r\n|\n|\r|\/n)/gm, '<br>');
    return new Handlebars.SafeString(text);
});

console.log(template({ config: config[index] }));
document.getElementById("main").innerHTML = template({ config: config[index] });