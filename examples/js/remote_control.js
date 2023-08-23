var config = overall_test();
console.log(config);

const source = document.getElementById("entry-template").innerHTML;
const template = Handlebars.compile(source);


let index = 0;

function play_instructions() {
    console.log("trying to speak" , config[index].content);
    let utterance = new SpeechSynthesisUtterance(config[index].content);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
}

function play_content(){
    console.log("trying to speak" , config[index]);
    let utterance = new SpeechSynthesisUtterance(config[index].type);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
}


function previous () {


    if (index === 0) {
        return
    }

    index--;
    load_new_sample();
    update_title_color();

}

function load_new_sample(){
    console.log("load_new_sample",index);
    
    if (index < 32){
    document.getElementById("main").innerHTML = template({ config: config[index] });
    console.log("sample loaded", config[index]);
    simple_update_test_data_selection(config[index]);

}else{
    global_data_save();
}
    
    global_update_method();
}

function save () {
    
    const answer = document.getElementById("answer").value
    console.log(answer, config[index].question_id);
    config[index].answer = answer;
    index++;
    
    // console.log(template({ config: config[index] }));
    load_new_sample();
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

//console.log(template({ config: config[index] }));
//document.getElementById("main").innerHTML = template({ config: config[index] });


function update_title_color(){
    console.log("update_title_color");

    //create a hsv color based on the current index 
    var hue = Math.floor(1800 * (index / config.length));
    var color = "hsl(" + hue + ", 100%, 80%)";

    //get the title element with id "title_element"
    var title_element = document.getElementById("title_element").style.backgroundColor = color;

}


function save_the_answer(json_data){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json_data));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", global_config.subject_identifier+".json");
    dlAnchorElem.click();
}



