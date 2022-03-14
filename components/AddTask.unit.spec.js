/* eslint-disable import/no-named-as-default-member */
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import AddTask from '@/components/AddTask'

import { state, mutations, getters } from '@/store/toDo'

describe('AddTask', () => {
  const mountAddTask = () => {
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
    const wrapper = mount(AddTask, {
      mocks: {
        $store: store,
      },
      localVue,
    })
    return { store, wrapper }
  }
  it('should mount the component', () => {
    const { wrapper } = mountAddTask()
    expect(wrapper.vm).toBeDefined()
  })

  it('should add new task', async () => {
    const { wrapper, store } = mountAddTask()
    const add = wrapper.find('[data-testid="add-task"]')
    await add.trigger('click')

    expect(store.state.toDo.toDoList).toHaveLength(1)
  })
  fit('should clear input', async () => {
    const { wrapper } = mountAddTask()
    const add = wrapper.find('[data-testid="input"]')
    await add.setValue('click')
    expect(add.element.name).toBe('')
  })
})
