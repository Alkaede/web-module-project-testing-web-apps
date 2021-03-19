import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'
import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<App errors={[]}/>)
});

test('renders the contact form header', ()=> {
    render(<ContactForm errors={[]}/>);
    const header = screen.getByText(/contact form/i);
    expect(header).toBeInTheDocument();
    expect(header).toBeTruthy();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  render(<ContactForm errors={[]}/>);
  const first = screen.getByLabelText('First Name*');
  userEvent.type(first, 'abc');
  const error = screen.getByText(/Error: firstName must have at least 5 characters./i);
  expect(error).toBeTruthy();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm errors={[]}/>);
  const btn = screen.getByRole('button');
  userEvent.click(btn);
  // note to self, errors show up AFTER the button is clicked so the error messages have to come after the click event
  const firstErr = screen.getByText(/Error: firstName must have at least 5 characters./i)
  expect(firstErr).toBeTruthy();

  const lastErr = screen.getByText(/Error: lastName is a required field./i)
  expect(lastErr).toBeTruthy();

  const emailErr = screen.getByText(/Error: email must be a valid email address./i)
  expect(emailErr).toBeTruthy();

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  render(<ContactForm errors={[]}/>);
  const first = screen.getByLabelText('First Name*');
  userEvent.type(first, 'Andrew');

  const last = screen.getByLabelText('Last Name*');
  userEvent.type(last, 'Castillo');

  const btn = screen.getByRole('button');
  userEvent.click(btn);

  const error = screen.getByText(/Error: email must be a valid email address./i);
  expect(error).toBeTruthy();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm errors={[]}/>);
  const email = screen.getByLabelText('Email*');
  userEvent.type(email, 'fido');
  
  const btn = screen.getByRole('button');
  userEvent.click(btn);

  const error = screen.getByText(/Error: email must be a valid email address./i);
  expect(error).toBeTruthy();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm errors={[]}/>);
  const first = screen.getByLabelText('First Name*');
  userEvent.type(first, 'Andrew');

  const email = screen.getByLabelText('Email*');
  userEvent.type(email, 'fido@mail.com');
  
  const btn = screen.getByRole('button');
  userEvent.click(btn);

  const lastErr = screen.getByText(/Error: lastName is a required field./i)
  expect(lastErr).toBeTruthy();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
  render(<ContactForm errors={[]}/>);
  // form filling
  const first = screen.getByLabelText('First Name*');
  userEvent.type(first, 'Andrew');

  const last = screen.getByLabelText('Last Name*');
  userEvent.type(last, 'Castillo');

  const email = screen.getByLabelText('Email*');
  userEvent.type(email, 'fido@mail.com');

  const btn = screen.getByRole('button');
  userEvent.click(btn);

  // submission render
  const rendFir = screen.getByText(/First Name:/i);
  expect(rendFir).toBeDefined();
  expect(rendFir).toBeTruthy();
  const rendLas = screen.getByText(/Last Name:/i);
  expect(rendLas).toBeDefined();
  expect(rendLas).toBeTruthy();
  const rendEm = screen.getByText(/Email:/i);
  expect(rendEm).toBeDefined();
  expect(rendEm).toBeTruthy();
});

test('renders all fields text when all fields are submitted.', async () => {
  render(<ContactForm errors={[]}/>);
  const first = screen.getByLabelText('First Name*');
  userEvent.type(first, 'Andrew');

  const last = screen.getByLabelText('Last Name*');
  userEvent.type(last, 'Castillo');

  const email = screen.getByLabelText('Email*');
  userEvent.type(email, 'fido@mail.com');

  const message = screen.getByLabelText('Message');
  userEvent.type(message, 'Monkey');

  const btn = screen.getByRole('button');
  userEvent.click(btn);

  const rendFir = screen.getByText(/First Name:/i);
  expect(rendFir).toBeDefined();
  expect(rendFir).toBeTruthy();

  const rendLas = screen.getByText(/Last Name:/i);
  expect(rendLas).toBeDefined();
  expect(rendLas).toBeTruthy();

  const rendEm = screen.getByText(/Email:/i);
  expect(rendEm).toBeDefined();
  expect(rendEm).toBeTruthy();

  const rendMe = screen.getByText(/Message:/i);
  expect(rendMe).toBeDefined();
  expect(rendMe).toBeTruthy();
});