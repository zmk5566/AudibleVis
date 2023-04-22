
// const conditions = [
//     'spatial',
//     'pitch',
//     'tempo'
// ]

const conditions = [
    'pitch',
    'spatial',
    'tempo'
]

function overall_test (start_index=0, end_index=4) {
    // return _.flatMap(_.shuffle(conditions), condition => {
    return _.flatMap(conditions, condition => {
        let questions = []

        // questions = questions.concat(['single', 'double'].flatMap(series_type => _.flatMap(_.shuffle(_.range(start_index, end_index)), data_index => {
        questions = questions.concat(['single', 'double'].flatMap(series_type => _.flatMap(_.range(start_index, end_index), data_index => {
            return [
                {
                    condition,
                    series_type,
                    data_index,
                    "question_id": `${condition}-random-${series_type}-${data_index}-q1`,
                    "test_content": `${series_type}_random`,
                    "type": "from -10 to 10, what is the value?",
                    "action_hint": "[Inform the audience that a random value is comming]",
                    "content": `You will hear ${series_type} series data. You are expected to differentiate the trend of the data after the full play of the data`,
                    "action": "play_audio"
                }
            ]
        })))

        // questions = questions.concat(['single', 'double'].flatMap(series_type => _.flatMap(_.shuffle(_.range(start_index, end_index)), data_index => {
        questions = questions.concat(['single', 'double'].flatMap(series_type => _.flatMap(_.range(start_index, end_index), data_index => {
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
                    "action": "Record the answer"
                },
                {
                    condition,
                    series_type,
                    data_index,
                    "question_id": `${condition}-linear-${series_type}-${data_index}-q2`,
                    "type": "expect_to_answer",
                    "test_content": `${series_type}_linear`,
                    "action_hint": "[input the answer]",
                    "content": "What is the value range of the data? /n A. All above zero B. All below zero C. It is a mixed Situation D. I can't really know",
                    "action": "Record the answer"
                }
            ]
        })))

        return questions
    })
}
