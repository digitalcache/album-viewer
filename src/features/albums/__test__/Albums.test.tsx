
import { screen } from '@testing-library/react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Albums from '../Albums';
import { renderWithProviders } from '../../../app/test-utils'

const response = [
    {
        "userId": 1,
        "id": 1,
        "title": "quidem molestiae enim"
    }
]
const userResponse = {
    id: 1,
    name: "Leanne Graham"
}

export const handlers = [
    rest.get('https://jsonplaceholder.typicode.com/albums', (req, res, ctx) => {
      return res(ctx.json(response), ctx.delay(150))
    })
]

const server = setupServer(...handlers)

describe("Albums Page", () => {
    beforeAll(() => server.listen())

    afterEach(() => server.resetHandlers())

    afterAll(() => server.close())

    it('should render albums loading', async () => {
        renderWithProviders(<Albums /> , {
            preloadedState: {
                albums: {
                    allAlbums: [],
                    status: 'loading',
                    user: {
                        id: 0,
                        name: ""
                    }
                }
            }
        })
        expect(await screen.findByText(/loading/i)).toBeInTheDocument()
    });


    it('should render albums list', async () => {
        renderWithProviders(<Albums /> , {
            preloadedState: {
                albums: {
                    allAlbums: response,
                    status: 'idle',
                    user: userResponse
                }
            }
        })
        expect(await screen.findByTestId(`album-1`)).toBeInTheDocument()
    });

})