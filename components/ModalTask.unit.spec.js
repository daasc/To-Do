/* eslint-disable import/no-named-as-default-member */
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import ModalTask from '@/components/ModalTask'
import { state, mutations, getters } from '@/store/toDo'

describe('ModalTask', () => {
  const mountModalTask = () => {
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
    const wrapper = mount(ModalTask, {
      mocks: {
        $store: store,
      },
      localVue,
    })
    return { store, wrapper }
  }
  it('should mount the component', () => {
    const { wrapper } = mountModalTask()
    expect(wrapper.vm).toBeDefined()
  })

  it('should close the modal when button close is called and should emit one event of the close', () => {
    const { wrapper } = mountModalTask()
    const close = wrapper.find('[data-testid="close-modal"]')
    close.trigger('click')

    expect(wrapper.emitted().close).toBeTruthy()
    expect(wrapper.emitted().close.length).toBe(1)
  })
})
