import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TableComponent from './TableComponent'

Enzyme.configure({ adapter: new Adapter() })

describe('TableComponent', () => {
    it ('should render without crashing', () => {
        const data = [{ email: 'email', name: 'name', cell: 'cell'}]
        const headers = ['email', 'name', 'cell']
        const wrapper = shallow(<TableComponent data={data} headers={headers} />)
        expect(wrapper).toMatchSnapshot()
    })

    it('should create a header for each entry in headers array', () => {
        const data = [{ email: 'email', name: 'name', cell: 'cell'}]
        const headers = ['email', 'name', 'cell']
        const wrapper = shallow(<TableComponent data={data} headers={headers} />)
        expect(wrapper.find('.header').length).toEqual(3)
    })

    it ('should render columns for each header', () => {
        const data = [{ email: 'email', name: 'name', cell: 'cell'}]
        const headers = ['email', 'name', 'cell']
        const wrapper = shallow(<TableComponent data={data} headers={headers} />)
        expect(wrapper.find('.column').length).toEqual(3)
    })

    it ('should display text', () => {
        const data = []
        const headers = ['email', 'name', 'cell']
        const wrapper = shallow(<TableComponent data={data} headers={headers} />)
        expect(wrapper.first('.column').html()).toContain("email")
    })
})