const config = overall_test();
console.log(config);

const source = document.getElementById("entry-template").innerHTML;
const template = Handlebars.compile(source);


let index = 0;

function play () {
    console.log("trying to speak" , config[index]);
    let utterance = new SpeechSynthesisUtterance("Hello world!");
    speechSynthesis.speak(utterance);


}

function speakInstructions () {

}

function speakQuestion () {

}


function previous () {


    if (index === 0) {
        return
    }

    index--;
    document.getElementById("main").innerHTML = template({ config: config[index] });
    update_title_color();

}

function save () {
    
    const answer = document.getElementById("answer").value
    console.log(answer, config[index].question_id);
    index++;
    // console.log(template({ config: config[index] }));
    document.getElementById("main").innerHTML = template({ config: config[index] });
    update_title_color();

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


function update_title_color(){
    console.log("update_title_color");

    //create a hsv color based on the current index 
    var hue = Math.floor(1800 * (index / config.length));
    var color = "hsl(" + hue + ", 100%, 80%)";

    //get the title element with id "title_element"
    var title_element = document.getElementById("title_element").style.backgroundColor = color;

}