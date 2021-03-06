import { uid } from '@/middleware/uid.js'

export const state = () => ({
  toDoList: [],
})

export const mutations = {
  SET_TODOLIST: (state, payload) => {
    state.toDoList.push({
      name: payload.name,
      done: false,
      id: uid(),
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
  EDIT_TODOLIST: (state, payload) => {
    const index = state.toDoList.findIndex((todo) => todo.id === payload.id)
    state.toDoList[index].name = payload.name
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
      date: new Date().toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
      }),
      id: uid(),
    })
  },
  DELETE_COMMENTS: (state, payload) => {
    const index = state.toDoList.findIndex((todo) => todo.id === payload.id)
    state.toDoList[index].comments = state.toDoList[index].comments.filter(
      (comments) => comments.id !== payload.date
    )
  },
  EDIT_COMMENTS: (state, payload) => {
    const index = state.toDoList.findIndex((todo) => todo.id === payload.id)
    const indexComments = state.toDoList[index].comments.findIndex(
      (comments) => comments.id === payload.date
    )
    state.toDoList[index].comments[indexComments].text = payload.text
  },
}

export const getters = {
  deeds: (state) => {
    return state.toDoList.filter((todo) => todo.done === true)
  },
  active: (state) => {
    return state.toDoList.filter((todo) => todo.done === false)
  },
  getId: (state) => (id) => {
    return state.toDoList.find((todo) => todo.id === id)
  },
}
