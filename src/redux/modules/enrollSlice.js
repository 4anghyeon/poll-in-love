import {createSlice} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';
import moment from 'moment/moment';

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
  dueDate: moment().add(3, 'day').toDate(),
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
    removeQuestion: (state, action) => {
      state.questions.splice(action.payload.index, 1);
    },
    changeAdditionalInfo: (state, action) => {
      state[action.payload.attr] = action.payload.value;
      return state;
    },
    changeRowQuestionTitle: (state, action) => {
      const {index, value} = action.payload;
      state.questions[index].question = value;
      return state;
    },
    changeRowQuestionType: (state, action) => {
      const {index, type} = action.payload;
      state.questions[index].type = type;
      return state;
    },
    addRowQuestionAnswer: (state, action) => {
      const {index} = action.payload;
      state.questions[index].answers.push(UserAnswer());
      return state;
    },
    removeRowQuestionAnswer: (state, action) => {
      const {index, answerIndex} = action.payload;
      state.questions[index].answers.splice(answerIndex, 1);
    },
    changeRowQuestionAnswer: (state, action) => {
      const {index, answerIndex, value} = action.payload;
      state.questions[index].answers[answerIndex].answer = value;
      return state;
    },
  },
});

export const {
  init,
  addQuestion,
  removeQuestion,
  changeRowQuestionTitle,
  changeRowQuestionType,
  addRowQuestionAnswer,
  removeRowQuestionAnswer,
  changeRowQuestionAnswer,
  changeAdditionalInfo,
} = enrollSlice.actions;
export default enrollSlice.reducer;
