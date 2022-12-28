import { render } from '@testing-library/react';
import App from './App';

describe("App Loading", () => {
    it('should render App Component',  () => {
        const { getByText } = render(
            <App />
        );
        expect(getByText(/album viewer/i)).toBeInTheDocument();
    });
})