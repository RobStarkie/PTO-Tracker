import React from 'react'
import { mount } from '@cypress/react';
import EditUser from './EditUser'

const mockGetToken = () => 'mock-token';

const mockUser = {
  userID: '1',
  TeamID: '101',
  Email: 'test@example.com',
  FirstName: 'John',
  SecondName: 'Doe',
  password: 'password123',
  ProfilePicture: 'http://example.com/image.jpg',
  phoneNumber: '1234567890',
  LineManager: false,
  LineManagerID: '2',
  TotalHolidays: '15',
  Admin: true
};

describe('<EditUser />', () => {
  it('renders with default data', () => {
    mount(<EditUser user={mockUser} getToken={mockGetToken} />);
    cy.get('input[name="firstName"]').should('have.value', mockUser.FirstName);
    cy.get('input[name="lastName"]').should('have.value', mockUser.SecondName);
    cy.get('input[name="email"]').should('have.value', mockUser.Email);
    cy.get('input[name="PhoneNumber"]').should('have.value', mockUser.phoneNumber);
    cy.get('input[name="LineManagerInput"]').should('have.value', mockUser.LineManagerID);
    cy.get('input[name="numberOfHolidays"]').should('have.value', mockUser.TotalHolidays);
    cy.get('input[name="username"]').should('have.value', mockUser.userID);
    // ... assertions and test logic
  });

  it('clears form and renders new data', () => {
    mount(<EditUser user={mockUser} getToken={mockGetToken} />);
    cy.get('input[name="firstName"]').clear().type('Jane');
    cy.get('input[name="firstName"]').should('have.value', 'Jane');

  });
})