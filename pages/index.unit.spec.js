/* eslint-disable import/no-named-as-default-member */
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import AddTask from '@/components/AddTask'
import ListTask from '@/components/ListTask'
import Index from '@/pages/index'
import { state, mutations, getters } from '@/store/toDo'

describe('Index', () => {
  const mountIndex = (values = {}) => {
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
    const wrapper = mount(Index, {
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
    const { wrapper } = mountIndex()
    expect(wrapper.vm).toBeDefined()
  })
  it('should mount the AddTask component', () => {
    const { wrapper } = mountIndex()
    const add = wrapper.findComponent(AddTask)
    expect(add.vm).toBeDefined()
  })
  it('should mount the ListTask component', () => {
    const { wrapper } = mountIndex()
    const list = wrapper.findComponent(ListTask)
    expect(list.vm).toBeDefined()
  })
})
