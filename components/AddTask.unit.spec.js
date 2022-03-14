/* eslint-disable import/no-named-as-default-member */
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import AddTask from '@/components/AddTask'

import { state, mutations, getters } from '@/store/toDo'

describe('AddTask', () => {
  const mountAddTask = (values = {}) => {
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
      data() {
        return {
          ...values,
        }
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
    const input = wrapper.find('[data-testid="input"]')
    await input.setValue('new')
    await add.trigger('click')
    expect(store.state.toDo.toDoList).toHaveLength(1)
  })
  it('should clear input', async () => {
    const { wrapper } = mountAddTask({ name: 'click' })
    const input = wrapper.find('[data-testid="input"]')
    const clear = wrapper.find('[data-testid="clear"]')
    await clear.trigger('click')
    expect(input.element.value).toBe('')
  })
})
