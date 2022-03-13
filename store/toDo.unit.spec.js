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

    expect(store.getters.deeds).toHaveLength(1)
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
})
