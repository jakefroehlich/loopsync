const TYPES = require("./types");

const setSink = (url, sinkNum, source, context) => ({
  type: TYPES.SET_SINK,
  url,
  sinkNum,
  source,
  context
});

const setCon = (sinkNum, source, context) => ({
  type: TYPES.SET_CONTEXT,
  sinkNum,
  source,
  context
})

const updateInput = (name, value) => ({
  type: TYPES.UPDATE_INPUT,
  name,
  value,
});

const toggleInput = (name) => ({
  type: TYPES.TOGGLE_INPUT,
  name
})

const clearInput = () => ({
  type: TYPES.CLEAR_INPUT,
});

const clearAudio = (sinkNum) => ({
  type: TYPES.CLEAR_AUDIO,
  sinkNum
})

module.exports = {
  setSink,
  updateInput,
  clearInput,
  toggleInput,
  clearAudio,
  setCon
}