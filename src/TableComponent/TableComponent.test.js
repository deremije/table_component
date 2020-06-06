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
        expect(wrapper.find('.tC-header').length).toEqual(3)
    })

    it ('should render columns for each header', () => {
        const data = [{ email: 'email', name: 'name', cell: 'cell'}]
        const headers = ['email', 'name', 'cell']
        const wrapper = shallow(<TableComponent data={data} headers={headers} />)
        expect(wrapper.find('.tC-column').length).toEqual(3)
    })

    it ('should display text when data and headers are both loaded', () => {
        const data = [{ email: 'email', name: 'name', cell: 'cell'}]
        const headers = ['email']
        const wrapper = shallow(<TableComponent data={data} headers={headers} />)
        expect(wrapper.find('.tC-header').text()).toContain("email")
    })
    
    it ('should display nullState warning when data is not loaded', () => {
        const headers = ['email']
        const wrapper = shallow(<TableComponent data={null} headers={headers} />)
        expect(wrapper.find('.tC-nullState'))
    })

    it ('should display nullState warning when headers are not loaded', () => {
        const data = [{ email: 'email', name: 'name', cell: 'cell'}]
        const wrapper = shallow(<TableComponent data={data} headers={null} />)
        expect(wrapper.find('.tC-nullState'))
    })

    it ('should display nullState warning when data is empty', () => {
        const headers = ['email']
        const wrapper = shallow(<TableComponent data={[]} headers={headers} />)
        expect(wrapper.find('.tC-nullState'))
    })

    it ('should display nullState warning when headers are empty', () => {
        const data = [{ email: 'email', name: 'name', cell: 'cell'}]
        const wrapper = shallow(<TableComponent data={data} headers={[]} />)
        expect(wrapper.find('.tC-nullState'))
    })
})