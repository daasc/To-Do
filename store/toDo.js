export const state = () => ({
  toDoList: [],
})

export const mutations = {
  SET_TODOLIST: (state, payload) => {
    state.toDoList.push({
      name: payload.name,
      done: false,
      id: new Date().getTime(),
      comments: [],
    })
  },
  SET_DONE: (state, id) => {
    const index = state.toDoList.findIndex((todo) => todo.id === id)
    if (state.toDoList[index].done) {
      state.toDoList[index].done = false
    } else {
      state.toDoList[index].done = true
    }
  },
  CLEAR_COMPLETED: (state) => {
    state.toDoList = state.toDoList.filter((todo) => todo.done === false)
  },
  DELETE: (state, id) => {
    state.toDoList = state.toDoList.filter((todo) => todo.id !== id)
  },
  COMMENTS: (state, payload) => {
    const index = state.toDoList.findIndex((todo) => todo.id === payload.id)
    state.toDoList[index].comments.push({
      text: payload.comments,
      date: new Date().getTime(),
    })
  },
}

export const getters = {
  deeds: (state) => {
    return state.toDoList.filter((todo) => todo.done === true)
  },
  active: (state) => {
    return state.toDoList.filter((todo) => todo.done === false)
  },
}
