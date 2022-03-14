/* eslint-disable import/no-named-as-default-member */
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { state, mutations, getters } from '@/store/toDo.js'

const storeConfig = {
  state,
  mutations,
  getters,
  namespaced: true,
}

describe('toDo', () => {
  const createStore = () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store(storeConfig)
    return { store }
  }
  it('should return the value of toDoList ', () => {
    const { store } = createStore()
    expect(store.state.toDoList).toEqual([])
  })
  it('should add an item in toDoList when SET_TODOLIST is called', () => {
    const { store } = createStore()
    store.commit('SET_TODOLIST', { name: 'make a cake' })
    expect(store.state.toDoList).toHaveLength(1)
  })
  it('should edit an item in toDoList when EDIT_TODOLIST is called', () => {
    const { store } = createStore()
    store.commit('SET_TODOLIST', { name: 'make a cake' })
    store.commit('EDIT_TODOLIST', {
      name: 'make',
      id: store.state.toDoList[0].id,
    })
    expect(store.state.toDoList[0].name).toEqual('make')
  })
  it('should mark the task as done when the SET_DONE is called', () => {
    const { store } = createStore()
    store.commit('SET_TODOLIST', { name: 'make a cake' })
    store.commit('SET_DONE', store.state.toDoList[0].id)
    expect(store.state.toDoList[0].done).toBe(true)
  })
  it('should return all tasks done', async () => {
    const { store } = createStore()
    await store.commit('SET_TODOLIST', { name: 'make a cake' })
    await store.commit('SET_TODOLIST', { name: 'make a pie' })
    await store.commit('SET_TODOLIST', { name: 'make a juice' })
    await store.commit('SET_TODOLIST', { name: 'make a breakfast' })
    await store.commit('SET_TODOLIST', { name: 'make a hotdog' })
    await store.commit('SET_TODOLIST', { name: 'make a noodle' })
    await store.commit('SET_DONE', store.state.toDoList[0].id)
    await store.commit('SET_DONE', store.state.toDoList[1].id)
    await store.commit('SET_DONE', store.state.toDoList[2].id)

    expect(store.getters.deeds).toHaveLength(3)
  })
  it('should unmarked the task as done when SET_DONE  is called ', async () => {
    const { store } = createStore()
    await store.commit('SET_TODOLIST', { name: 'make a cake' })
    await store.commit('SET_DONE', store.state.toDoList[0].id)
    expect(store.state.toDoList[0].done).toBe(true)
    await store.commit('SET_DONE', store.state.toDoList[0].id)
    expect(store.state.toDoList[0].done).toBe(false)
  })
  it("should return all tasks that haven't been done yet", async () => {
    const { store } = createStore()
    await store.commit('SET_TODOLIST', { name: 'make a cake' })
    await store.commit('SET_TODOLIST', { name: 'make a pie' })
    await store.commit('SET_TODOLIST', { name: 'make a juice' })
    await store.commit('SET_TODOLIST', { name: 'make a breakfast' })
    await store.commit('SET_TODOLIST', { name: 'make a hotdog' })
    await store.commit('SET_TODOLIST', { name: 'make a noodle' })
    await store.commit('SET_DONE', store.state.toDoList[0].id)

    expect(store.getters.active).toHaveLength(5)
  })
  it('should delete all tasks that have already been done', async () => {
    const { store } = createStore()

    await store.commit('SET_TODOLIST', { name: 'make a cake' })
    await store.commit('SET_TODOLIST', { name: 'make a pie' })
    await store.commit('SET_TODOLIST', { name: 'make a pie' })
    await store.commit('SET_DONE', store.state.toDoList[0].id)
    await store.commit('CLEAR_COMPLETED')
    expect(store.state.toDoList).toHaveLength(2)
  })
  it('should delete the task when DELETE is called', async () => {
    const { store } = createStore()

    await store.commit('SET_TODOLIST', { name: 'make a cake' })
    await store.commit('DELETE', store.state.toDoList[0].id)

    expect(store.state.toDoList).toHaveLength(0)
  })
  it('should add comments on task', async () => {
    const { store } = createStore()

    await store.commit('SET_TODOLIST', { name: 'make a cake' })
    await store.commit('COMMENTS', {
      id: store.state.toDoList[0].id,
      comments: 'hello, add comments',
    })
    expect(store.state.toDoList[0].comments).toHaveLength(1)
    expect(store.state.toDoList[0].comments[0].text).toEqual(
      'hello, add comments'
    )
  })
  it('should return the task with the id passed', async () => {
    const { store } = createStore()
    await store.commit('SET_TODOLIST', { name: 'make a cake' })
    const todo = store.getters.getId(store.state.toDoList[0].id)
    expect(todo.name).toContain('make a cake')
  })

  it('should delete the comments when DELETE_COMMENTS is called', async () => {
    const { store } = createStore()

    await store.commit('SET_TODOLIST', { name: 'make a cake' })
    await store.commit('COMMENTS', {
      id: store.state.toDoList[0].id,
      comments: 'hello, add comments',
    })
    await store.commit('DELETE_COMMENTS', {
      date: store.state.toDoList[0].comments[0].date,
      id: store.state.toDoList[0].id,
    })
    expect(store.state.toDoList[0].comments).toHaveLength(0)
  })
  it('should edit the comment when EDIT_COMMENTS is called', async () => {
    const { store } = createStore()

    await store.commit('SET_TODOLIST', { name: 'make a cake' })
    await store.commit('COMMENTS', {
      id: store.state.toDoList[0].id,
      comments: 'hello, add comments',
    })
    const date = store.state.toDoList[0].comments[0].date
    const id = store.state.toDoList[0].id
    await store.commit('EDIT_COMMENTS', { text: 'hello', date, id })
    expect(store.state.toDoList[0].comments[0].text).toEqual('hello')
  })
})
