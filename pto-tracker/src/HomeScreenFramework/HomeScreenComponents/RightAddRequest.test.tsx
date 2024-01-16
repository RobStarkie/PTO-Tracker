
import React from 'react';
import renderer from "react-test-renderer";
// import { render } from '@testing-library/react';
import RightAddRequest from './RightAddRequest';
import './RightAddRequest.css'
import { MemoryRouter } from "react-router-dom";
// import mockAxios from "jest-mock-axios";

// afterEach(() => {
//     mockAxios.reset();
// })

describe.only('RightAddRequest (Holiday Request Adder UI)', () => {
    it('renders correctly when loading', () => {

        const startDate = "2024-01-10";
        const endDate = "2024-01-15";
        const postcode = "CH5 3DR";

        const mockRequestData = {
            "StartDate": startDate,
            "EndDate": endDate,
            "Postcode": postcode
        };


        // Mock the props for this component:
        //  dummy string
        const mockContent = "Test Content";
        // mock function that returns a dummy token
        const mockGetToken = jest.fn(() => "test-token");
        // mock function that does nothing but can be used to simulate the function passed to the component
        const mockHandleAddNewHolidayRequest = jest.fn();

        // mockAxios.post.mockResolvedValueOnce({
        //     data: {
        //         "message": "New holiday request added successfully"
        //     },
        //     status: 201,
        //     statusText: 'Created',
        //     headers: {},
        //     config: {},
        // });

        
        const tree = renderer.create(
            <MemoryRouter>
                <RightAddRequest
                content={mockContent}
                getToken={mockGetToken}
                handleAddNewHolidayRequest={mockHandleAddNewHolidayRequest}
            />
        </MemoryRouter>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    })
})