/* eslint-disable import/no-named-as-default-member */
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import CardTask from '@/components/CardTask'

import { state, mutations, getters } from '@/store/toDo'

describe('CardTask', () => {
  const mountCardTask = () => {
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
    const wrapper = mount(CardTask, {
      mocks: {
        $store: store,
      },
      localVue,
    })
    return { store, wrapper }
  }
  it('should mount the component', () => {
    const { wrapper } = mountCardTask()
    expect(wrapper.vm).toBeDefined()
  })
})
