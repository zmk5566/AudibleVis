
// const conditions = [
//     'spatial',
//     'pitch',
//     'tempo'
// ]

const conditions = [
    'pitch',
    'spatial'
]

function overall_test (start_index=0, end_index=4,input_conditions=conditions) {
    // return _.flatMap(_.shuffle(conditions), condition => {
    return _.flatMap(input_conditions, condition => {
        let questions = []

        // questions = questions.concat(['single', 'double'].flatMap(series_type => _.flatMap(_.shuffle(_.range(start_index, end_index)), data_index => {
        questions = questions.concat(['single'].flatMap(series_type => _.flatMap(_.range(start_index, end_index), data_index => {
            return [
                {
                    condition,
                    series_type,
                    data_index,
                    "question_id": `${condition}-random-${series_type}-${data_index}-q1`,
                    "test_content": `${series_type}_random`,
                    "type": "from -10 to 10, what is the value?",
                    "action_hint": "[Inform the audience that a random value is comming]",
                    "content": `You will hear the repeart of one value. Please tell me what is the value?`,
                    "action": "play_audio",
                    "answer":-1
                }
            ]
        })))




        questions = questions.concat(['single'].flatMap(series_type => _.flatMap(_.range(start_index, end_index), data_index => {
            return [
                {
                    condition,
                    series_type,
                    data_index,
                    "question_id": `${condition}-compare-${series_type}-${data_index}-q1`,
                    "type": "pose estimation.  ",
                    "test_content": `${series_type}_compare`,
                    "action_hint": "[wait for the audience to answer]",
                    "content": "Which number has the highest score? 1,2,3,4,5 Which one is the lowest?",
                    "action": "Record the answer",
                    "answer":-1
                },
                {
                    condition,
                    series_type,
                    data_index,
                    "question_id": `${condition}-compare-${series_type}-${data_index}-q1`,
                    "type": "pose estimation.  ",
                    "test_content": `${series_type}_compare`,
                    "action_hint": "[wait for the audience to answer]",
                    "content": "2 and 3 which one is higher? what about 1 and 5?",
                    "action": "Record the answer",
                    "answer":-1
                }
                
            ]
        })))

                // questions = questions.concat(['single', 'double'].flatMap(series_type => _.flatMap(_.shuffle(_.range(start_index, end_index)), data_index => {
         questions = questions.concat(['single'].flatMap(series_type => _.flatMap(_.range(start_index, end_index), data_index => {
                        return [
                            {
                                condition,
                                series_type,
                                data_index,
                                "question_id": `${condition}-linear-${series_type}-${data_index}-q1`,
                                "type": "You will hear ${series_type} series data. You are expected to differentiate the trend of the data after the full play of the data",
                                "test_content": `${series_type}_linear`,
                                "action_hint": "[wait for the audience to answer]",
                                "content": "What is the trend of each of the data /n A. All the way up B. All the way Down C.Up and Down D. Down and Up",
                                "action": "Record the answer",
                                "answer":-1
                            }
                            
                        ]
                    })))

        return questions
    })
}
