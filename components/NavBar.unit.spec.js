import { mount } from '@vue/test-utils'
import NavBar from '@/components/NavBar'

describe('NavBar', () => {
  it('should mount the component', () => {
    const wrapper = mount(NavBar)
    expect(wrapper.vm).toBeDefined()
  })

  it('should show the title app', () => {
    const wrapper = mount(NavBar)
    const title = wrapper.find('[data-testid="title"]')
    expect(title.text()).toContain('Todoist')
  })
})
