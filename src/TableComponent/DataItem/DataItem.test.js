import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import DataItem from './DataItem'

Enzyme.configure({ adapter: new Adapter() })

describe('DataItem', () => {
    it ('should render without crashing', () => {
        const line = {name: "jeremy", photo: "jeremy.jpg", city: "lyon"}
        const header = 'city'
        const wrapper = shallow(<DataItem line={line} header={header} />)
        expect(wrapper).toMatchSnapshot()
    })

    it ('renders text', () => {
        const line = {name: "jeremy", photo: "jeremy.jpg", city: "lyon"}
        const header = 'city'
        const wrapper = shallow(<DataItem line={line} header={header} />)
        expect(wrapper.find('.tC-dataItem').text()).toContain("lyon")
    })

    it ('shows an image in name column', () => {
        const line = {name: "jeremy", photo: "jeremy.jpg"}
        const header = 'name'
        const wrapper = shallow(<DataItem line={line} header={header} includePhoto={"name"}/>)
        expect(wrapper.find('.tC-image').length).toEqual(1)
    })

    it ('does not show an image in any other case', () => {
        const line = {name: "jeremy", photo: "jeremy.jpg"}
        const header = 'photo'
        const wrapper = shallow(<DataItem line={line} header={header} includePhoto={"name"}/>)
        expect(wrapper.find('.tC-image').length).toEqual(0)
    })
})