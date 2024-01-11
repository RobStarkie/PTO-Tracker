import React from 'react';
import renderer from "react-test-renderer";
import { render } from '@testing-library/react';
import RightAddRequest from './RightAddRequest';
import './RightAddRequest.css'
//import mockAxios from "jest-mock-axios";

describe.only('RightAddRequest (Holiday Request Adder UI)', () => {
    it('renders correctly when loading', () => {

        // Mock the props for this component:
        //  dummy string
        const mockContent = "Test Content";
        // mock function that returns a dummy token
        const mockGetToken = jest.fn(() => "test-token");
        // mock function that does nothing but can be used to simulate the function passed to the component
        const mockHandleAddNewHolidayRequest = jest.fn();


        
        const tree = renderer.create(<RightAddRequest
            content={mockContent}
            getToken={mockGetToken}
            handleAddNewHolidayRequest={mockHandleAddNewHolidayRequest} />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})