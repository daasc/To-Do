/* eslint-disable import/no-named-as-default-member */
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import ListTask from '@/components/ListTask'
import CardTask from '@/components/CardTask'

import { state, mutations, getters } from '@/store/toDo'

describe('ListTask', () => {
  const addTask = (store, qtd) => {
    for (let index = 0; index < qtd; index++) {
      store.commit('toDo/SET_TODOLIST', { name: 'make a cake' })
    }
  }
  const mountListTask = ({ qtd = 0 }) => {
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
    if (qtd) {
      addTask(store, qtd)
    }
    const wrapper = mount(ListTask, {
      mocks: {
        $store: store,
      },
      localVue,
    })
    return { store, wrapper }
  }
  it('should mount the component', () => {
    const { wrapper } = mountListTask({ qtd: 1 })
    expect(wrapper.vm).toBeDefined()
  })

  it('should mount the CardTask component', () => {
    const { wrapper } = mountListTask({ qtd: 1 })
    const card = wrapper.findComponent(CardTask)
    expect(card.vm).toBeDefined()
  })
  it('should show 5 CardTask component', () => {
    const { wrapper } = mountListTask({ qtd: 5 })
    const card = wrapper.findAllComponents(CardTask)
    expect(card).toHaveLength(5)
  })
  it('should show quantity of the Task', () => {
    const { wrapper } = mountListTask({ qtd: 5 })
    const qtd = wrapper.find('[data-testid="qtd-task"]')
    expect(qtd.text()).toContain('5')
  })
})
