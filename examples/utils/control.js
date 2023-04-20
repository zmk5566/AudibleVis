

function linear_trend(index,data_cat_num){
    var question_1 =
    {  
        "data_index":index,
        "type":"instruction"
        "action_hint":"[Inform the audience that a new database is upcoming]"
        "content":"You will hear "+data_cat_num+ " line-chart. You are expected to differentiate the trend of the data after the full play of the data"
        "action":"play_audio"
    }

    var question_2 =
    {
        "question_index":index,
        "type":"expect_to_answer"
        "action_hint":"[wait for the audience to answer]",
        "content":"What is the trend of each of the data /n A. All the way up B. All the way Down C.Up and Down D. Down and Up"" 
    }

    var question_3 =
    {
        "question_index":index,
        "type":"expect_to_answer"
        "action_hint":"[input the answer]",
        "content":"What is the value range of the data? /n A. All above zero B. All below zero C. It is a mixed Situation D. I can't really know"
    }

    return [question_1,question_2,question_3];

}



function random_value(start_array_index,end_array_index,data_cat_num)
{
 
    var question_1 =
    {  
        "data_index":index,
        "type":"instruction"
        "action_hint":"[Inform the audience that a random value is comming]"
        "content":"You will hear" + data_cat_num + "data" +". You are expected to differentiate the trend of the data after the full play of the data"
        "action":"play_audio"
    }

    var question_2 =
    {  
        "data_index":index,
        "type":"expect_to_answer"
        "action_hint":"[get the answer]"
        "content":"from -10 to 10, what is the valye?"
    }
    
}

function random_test(start_array_index,end_array_index)

{
        return [random_value(start_array_index,end_array_index,1),random_value(start_array_index,end_array_index,2))];
    
}
 

function linear_trending(start_array_index,end_array_index){

    return  [
                linear_trend(start_array_index,end_array_index,1),
                linear_trend(start_array_index,end_array_index,2),
                random_test(start_array_index,end_array_index,1),
                random_test(start_array_index,end_array_index,2)
            ];    


}

// should give all a json object to instruct the overall test
function overall_test(start_array_index,end_array_index){

	return [linear_trending(start_array_index,end_array_index),mixed_pattern(start_array_index,end_array_index)];

}


function test_run(){
    return linear_trending_test(0,5);
}
