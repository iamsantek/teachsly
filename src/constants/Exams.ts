export const defaultQuestionPool = {
  id: '1',
  questions: [{
    id: '1',
    question: '',
    options: [{
      id: 'a',
      label: '',
      isCorrectOption: undefined

    }]
  }]
}

export const defaultExamForm = {
  defaultValues: {
    title: '',
    groups: [],
    questionPools: [
      defaultQuestionPool
    ]
  }
}
