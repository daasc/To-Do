/* eslint-disable import/no-named-as-default-member */
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import ModalTask from '@/components/ModalTask'
import { state, mutations, getters } from '@/store/toDo'
import CardComments from '@/components/CardComments.vue'
describe('ModalTask', () => {
  const mountModalTask = ({ task = false, values = {} }) => {
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
      store.commit('toDo/SET_TODOLIST', { name: 'comments' })
      propsData.id = store.state.toDo.toDoList[0].id
    }
    const wrapper = mount(ModalTask, {
      mocks: {
        $store: store,
      },
      data() {
        return {
          ...values,
        }
      },
      propsData,
      localVue,
    })
    return { store, wrapper }
  }
  it('should mount the component', () => {
    const { wrapper } = mountModalTask({ task: true })
    expect(wrapper.vm).toBeDefined()
  })

  it('should close the modal when button close is called and should emit one event of the close', () => {
    const { wrapper } = mountModalTask({ task: true })
    const close = wrapper.find('[data-testid="close-modal"]')
    close.trigger('click')

    expect(wrapper.emitted().close).toBeTruthy()
    expect(wrapper.emitted().close.length).toBe(1)
  })
  it('should add comments when click add comments button', async () => {
    const { wrapper } = mountModalTask({ task: true, values: { text: '' } })
    const add = wrapper.find('[data-testid="add-comments"]')
    const input = wrapper.find('[data-testid="input-comments"]')
    await input.setValue('dasdadadada')
    await add.trigger('click')
    let comments = wrapper.findAllComponents(CardComments)
    expect(comments).toHaveLength(1)
    await add.trigger('click')
    comments = wrapper.findAllComponents(CardComments)
    expect(comments).toHaveLength(2)
  })

  it('should delete comments when delete button is called', async () => {
    const { wrapper } = mountModalTask({ task: true, values: { text: '' } })
    const add = wrapper.find('[data-testid="add-comments"]')
    const input = wrapper.find('[data-testid="input-comments"]')
    await input.setValue('dasdadadada')
    await add.trigger('click')
    await add.trigger('click')
    const remove = wrapper.find('[data-testid="delete-comments"]')
    await remove.trigger('click')
    const comments = wrapper.findAllComponents(CardComments)

    expect(comments).toHaveLength(1)
  })

  it('should edit comments when edit button is called', async () => {
    const { wrapper } = mountModalTask({
      task: true,
      values: { text: '', edit: false },
    })
    const add = wrapper.find('[data-testid="add-comments"]')
    const input = wrapper.find('[data-testid="input-comments"]')
    await input.setValue('dasdadadada')
    await add.trigger('click')
    const edit = wrapper.find('[data-testid="edit-comments"]')
    await edit.trigger('click')
    const inputEdit = wrapper.find('[data-testid="edit-input-comments"]')
    await inputEdit.setValue('editado')
    const button = wrapper.find('[data-testid="button-edit-comments"]')

    await button.trigger('click')
    const text = wrapper.find('[data-testid="text-comments"]')

    expect(text.text()).toEqual('editado')
  })
})
