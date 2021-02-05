/**
 * External dependencies
 */
import { render, screen, fireEvent } from '@testing-library/react';

/**
 * Internal dependencies
 */
import BaseInputControl from '../';

const getInput = () => screen.getByTestId( 'input' );

describe( 'SearchInputControl', () => {
	const SearchInputControl = ( props ) => (
		<BaseInputControl { ...props } data-testid="input" />
	);

	describe( 'Basic rendering', () => {
		it( 'should render', () => {
			render( <SearchInputControl /> );

			const input = getInput();

			expect( input ).toBeTruthy();
		} );

	} );

	describe( 'Label', () => {
		it( 'should render label', () => {
			render( <SearchInputControl label="Hello" value="There" /> );

			const input = screen.getByText( 'Hello' );

			expect( input ).toBeTruthy();
		} );
	} );

	describe( 'Value', () => {
		it( 'should update value onChange', () => {
			const spy = jest.fn();
			render( <SearchInputControl value="Hello" onChange={ spy } /> );

			const input = getInput();
			input.focus();
			fireEvent.change( input, { target: { value: 'There' } } );

			expect( input.value ).toBe( 'There' );
			expect( spy ).toHaveBeenCalledTimes( 1 );
		} );

		it( 'should work as a controlled component', () => {
			const spy = jest.fn();
			const { rerender } = render(
				<SearchInputControl value="one" onChange={ spy } />
			);

			const input = getInput();

			input.focus();
			fireEvent.change( input, { target: { value: 'two' } } );

			// Ensuring <SearchInputControl /> is controlled
			fireEvent.blur( input );

			// Updating the value
			rerender( <SearchInputControl value="three" onChange={ spy } /> );

			expect( input.value ).toBe( 'three' );

			/*
			 * onChange called only once. onChange is not called when a
			 * parent component explicitly passed a (new value) change down to
			 * the <SearchInputControl />.
			 */
			expect( spy ).toHaveBeenCalledTimes( 1 );
		} );

		it( 'should change back to initial value prop, if controlled', () => {
			const spy = jest.fn();
			const { rerender } = render(
				<SearchInputControl value="Original" onChange={ spy } />
			);

			const input = getInput();

			// Assuming <SearchInputControl /> is controlled (not focused)

			// Updating the value
			rerender( <SearchInputControl value="New" onChange={ spy } /> );

			expect( input.value ).toBe( 'New' );

			// Change it back to the original value
			rerender( <SearchInputControl value="Original" onChange={ spy } /> );

			expect( input.value ).toBe( 'Original' );
			expect( spy ).toHaveBeenCalledTimes( 0 );
		} );
	} );
} );
