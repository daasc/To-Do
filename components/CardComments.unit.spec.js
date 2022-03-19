/* eslint-disable import/no-named-as-default-member */
import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import Vue from 'vue'

import { state, mutations, getters } from '@/store/toDo'
import CardComments from '@/components/CardComments.vue'
describe('CardComments', () => {
  const mountCardComments = async ({ task = false, values = {} }) => {
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
      store.commit('toDo/COMMENTS', {
        id: store.state.toDo.toDoList[0].id,
        comments: 'outro commentario',
      })
      propsData.id = store.state.toDo.toDoList[0].comments[0].id
      propsData.text = store.state.toDo.toDoList[0].comments[0].text
      propsData.date = store.state.toDo.toDoList[0].comments[0].date
    }
    console.log(propsData)
    const wrapper = mount(CardComments, {
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
    await Vue.nextTick()

    return { store, wrapper }
  }
  it('should mount the component', async () => {
    const { wrapper } = await mountCardComments({
      task: false,
      values: { edits: true, textEdit: '' },
    })
    expect(wrapper.vm).toBeDefined()
  })
  it('should emit an editComments event when the edit button is clicked', async () => {
    const { wrapper, store } = await mountCardComments({
      task: true,
      values: { edits: false, textEdit: '' },
    })
    const edit = wrapper.find('[data-testid="edit-comments"]')
    await edit.trigger('click')
    const inputEdit = wrapper.find('[data-testid="edit-input-comments"]')
    await inputEdit.setValue('editado')
    const button = wrapper.find('[data-testid="button-edit-comments"]')
    await button.trigger('click')
    expect(wrapper.emitted().editComments).toBeTruthy()
    expect(wrapper.emitted().editComments.length).toBe(1)
    expect(wrapper.emitted().editComments[0]).toEqual([
      { id: store.state.toDo.toDoList[0].comments[0].id, text: 'editado' },
    ])
  })

  it('should emit an editComments event when the edit button is clicked', async () => {
    const { wrapper } = await mountCardComments({
      task: true,
      values: { edits: false, textEdit: '' },
    })
    const edit = wrapper.find('[data-testid="edit-comments"]')
    await edit.trigger('click')
    const inputEdit = wrapper.find('[data-testid="edit-input-comments"]')
    await inputEdit.setValue('editado')
    const cancel = wrapper.find('[data-testid="cancel-edit"]')
    await cancel.trigger('click')
    expect(wrapper.vm.$data.edits).toBe(false)
    expect(wrapper.vm.$data.textEdit).toBe('')
  })
})
