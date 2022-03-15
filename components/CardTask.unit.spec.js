/* eslint-disable import/no-named-as-default-member */
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import CardTask from '@/components/CardTask'

import { state, mutations, getters } from '@/store/toDo'

describe('CardTask', () => {
  const mountCardTask = async ({ task = false }) => {
    const localVue = createLocalVue()
    localVue.use(Vuex)
    const store = new Vuex.Store({
      modules: {
        toDo: {
          state,
          mutations,
          getters,
          namespaced: true,
        },
      },
    })
    const propsData = {}
    if (task) {
      await store.commit('toDo/SET_TODOLIST', { name: 'make a cake' })
      propsData.name = store.state.toDo.toDoList[0].name
      propsData.id = store.state.toDo.toDoList[0].id
      propsData.done = store.state.toDo.toDoList[0].done
    }
    const wrapper = mount(CardTask, {
      mocks: {
        $store: store,
      },
      propsData,
      localVue,
    })
    return { store, wrapper }
  }
  it('should mount the component', async () => {
    const { wrapper } = await mountCardTask({ task: true })
    expect(wrapper.vm).toBeDefined()
  })
  it('should mark the task as done when you click the checkbox', async () => {
    const { wrapper, store } = await mountCardTask({ task: true })
    const checkbox = wrapper.find('[data-testid="done-task"]')
    await checkbox.trigger('click')

    expect(store.state.toDo.toDoList[0].done).toBe(true)
  })
  it('should delete task when delete button is clicked', async () => {
    const { wrapper, store } = await mountCardTask({ task: true })
    const remove = wrapper.find('[data-testid="delete-task"]')
    await remove.trigger('click')

    expect(store.state.toDo.toDoList).toHaveLength(0)
  })
})
