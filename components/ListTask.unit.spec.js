/* eslint-disable import/no-named-as-default-member */
import { createLocalVue, mount } from '@vue/test-utils'
import Vue from 'vue'
import Vuex from 'vuex'
import ListTask from '@/components/ListTask'
import CardTask from '@/components/CardTask'
import ModalTask from '@/components/ModalTask'

import { state, mutations, getters } from '@/store/toDo'

describe('ListTask', () => {
  const addTask = (store, qtd) => {
    for (let index = 0; index < qtd; index++) {
      store.commit('toDo/SET_TODOLIST', { name: 'make a cake' })
    }
  }
  const mountListTask = ({
    qtd = 0,
    values = {},
    active = false,
    completed = false,
  }) => {
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
    if (active || completed) {
      store.commit('toDo/SET_DONE', store.state.toDo.toDoList[0].id)
    }
    const wrapper = mount(ListTask, {
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
  it('should show all tasks', async () => {
    const { wrapper } = mountListTask({
      qtd: 5,
      active: true,
      values: { all: false, active: false, completed: true },
    })
    const all = wrapper.find('[data-testid="all-task"]')
    await all.trigger('click')
    const card = wrapper.findAllComponents(CardTask)
    expect(card).toHaveLength(5)
  })
  it('should show all active tasks', async () => {
    const { wrapper } = mountListTask({
      qtd: 5,
      active: true,
      values: { all: false, active: false, completed: true },
    })
    const active = wrapper.find('[data-testid="active-task"]')
    await active.trigger('click')
    const card = wrapper.findAllComponents(CardTask)
    expect(card).toHaveLength(4)
  })
  it('should show all completed tasks', async () => {
    const { wrapper } = mountListTask({
      qtd: 5,
      completed: true,
      values: { all: true, active: false, completed: false },
    })
    const all = wrapper.find('[data-testid="completed-task"]')
    await all.trigger('click')
    const card = wrapper.findAllComponents(CardTask)
    expect(card).toHaveLength(1)
  })

  it('should show modal when comments is called', async () => {
    const { wrapper } = mountListTask({
      qtd: 5,
      completed: true,
      values: { all: true, active: false, completed: false },
    })
    const comments = wrapper.find('[data-testid="comments-task"]')
    await comments.trigger('click')

    const modal = wrapper.findComponent(ModalTask)

    expect(modal.isVisible()).toBe(true)
  })

  it('should hide modal when close is called', async () => {
    const { wrapper } = mountListTask({
      qtd: 5,
      completed: true,
      values: { all: true, active: false, completed: false },
    })
    const comments = wrapper.find('[data-testid="comments-task"]')
    await comments.trigger('click')

    const modal = wrapper.findComponent(ModalTask)
    expect(modal.isVisible()).toBe(true)
    await Vue.nextTick()
    const close = wrapper.find('[data-testid="close-modal"]')
    await close.trigger('click')

    expect(modal.isVisible()).toBe(false)
  })
})
