import {createSlice} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';

export const TYPE = {
  INPUT: 'input',
  SELECT: 'select',
};

const Poll = () => {
  return {
    id: uuidv4(),
    question: '',
    type: TYPE.INPUT,
    answers: [],
  };
};

const UserAnswer = () => {
  return {
    id: uuidv4(),
    answer: '',
  };
};

const initialState = {
  title: '',
  point: 0,
  writer: '',
  age: 0,
  gender: 'none',
  createDate: null,
  thumbnail: null,
  questions: [Poll()],
};

const enrollSlice = createSlice({
  name: 'enroll',
  initialState,
  reducers: {
    init: () => {
      return initialState;
    },
    addQuestion: (state, action) => {
      state.questions.push(Poll());
      return state;
    },
    changeAdditionalInfo: (state, action) => {
      state[action.payload.attr] = action.payload.value;
      return state;
    },
    changeRowQuestionTitle: (state, action) => {
      const {index, value} = action.payload;
      state.questions[index - 1].question = value;
      return state;
    },
    changeRowQuestionType: (state, action) => {
      const {index, type} = action.payload;
      state.questions[index - 1].type = type;
      return state;
    },
    addRowQuestionAnswer: (state, action) => {
      const {index} = action.payload;
      state.questions[index - 1].answers.push(UserAnswer());
      return state;
    },
    changeRowQuestionAnswer: (state, action) => {
      const {index, answerIndex, value} = action.payload;
      state.questions[index - 1].answers[answerIndex].answer = value;
      return state;
    },
  },
});

export const {
  init,
  addQuestion,
  changeRowQuestionTitle,
  changeRowQuestionType,
  addRowQuestionAnswer,
  changeRowQuestionAnswer,
  changeAdditionalInfo,
} = enrollSlice.actions;
export default enrollSlice.reducer;
