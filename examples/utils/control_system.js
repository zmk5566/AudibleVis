

function linear_trend(index, data_cat_num) {
    var question_1 =
    {
        "data_index": index,
        "type": "instruction",
        "test_content": "linear_trend" + data_cat_num,
        "action_hint": "[Inform the audience that a new database is upcoming]",
        "content": "You will hear " + data_cat_num + " line-chart. You are expected to differentiate the trend of the data after the full play of the data",
        "action": "play_audio"
    }

    var question_2 =
    {
        "question_index": index,
        "type": "expect_to_answer",
        "test_content": "linear_trend" + data_cat_num,
        "action_hint": "[wait for the audience to answer]",
        "content": "What is the trend of each of the data /n A. All the way up B. All the way Down C.Up and Down D. Down and Up"
    }

    var question_3 =
    {
        "question_index": index,
        "type": "expect_to_answer",
        "test_content": "linear_trend" + data_cat_num,
        "action_hint": "[input the answer]",
        "content": "What is the value range of the data? /n A. All above zero B. All below zero C. It is a mixed Situation D. I can't really know"
    }

    return [question_1, question_2, question_3];
}



function random_value(start_array_index, end_array_index, data_cat_num) {
    var the_huge_data = [];

    for (var i = start_array_index; i < end_array_index; i++) {
        var temp_data = [];

        var question_1 =
        {
            "data_index": i,
            "test_content": "random_value_num" + data_cat_num,
            "type": "instruction",
            "action_hint": "[Inform the audience that a random value is comming]",
            "content": "You will hear" + data_cat_num + "data" + ". You are expected aswer the value of the data",
            "action": "play_audio"
        }

        var question_2 =
        {
            "data_index": i,
            "test_content": "random_value_num" + data_cat_num,
            "type": "expect_to_answer",
            "action_hint": "[get the answer]",
            "content": "from -10 to 10, what is the valye?"
        }
        the_huge_data.push(question_1);
        the_huge_data.push(question_2);
        // add the data to the huge data

        //the_huge_data.push(temp_data);

    }

    return the_huge_data;
}



function trending_test(start_array_index, end_array_index) {

    return {
        "test_name": "trending_test",
        "test_content":
            [
                { 'part_name': "linear_single", 'part_content': linear_trend(start_array_index, end_array_index, 1) },
                { 'part_name': "linear_double", 'part_content': linear_trend(start_array_index, end_array_index, 2) }]
    }
        ;


}

function random_value_test(start_array_index, end_array_index) {

    return {
        "test_name": "value_test",
        "test_content":
            [
                { 'part_name': "random_single", 'part_content': random_value(start_array_index, end_array_index, 1) },
                { 'part_name': "random_double", 'part_content': random_value(start_array_index, end_array_index, 2) }]
    }
}


// should give all a json object to instruct the overall test
function overall_test(start_array_index, end_array_index) {
    // join two array together and return
    var temp_array = [];

    return {
        "name": "overall_test",
        "test_content": temp_array.concat(trending_test(start_array_index, end_array_index), random_value_test(start_array_index, end_array_index))
    }
}


    function test_run() {
        return linear_trending_test(0, 5);
    }