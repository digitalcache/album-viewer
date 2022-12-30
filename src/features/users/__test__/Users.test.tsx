import { screen } from '@testing-library/react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Users from '../Users';
import { renderWithProviders } from '../../../app/test-utils'

const response = [
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
          "street": "Kulas Light",
          "suite": "Apt. 556",
          "city": "Gwenborough",
          "zipcode": "92998-3874",
          "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
          }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
          "name": "Romaguera-Crona",
          "catchPhrase": "Multi-layered client-server neural-net",
          "bs": "harness real-time e-markets"
        }
      }
]
export const handlers = [
    rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
      return res(ctx.json(response), ctx.delay(150))
    })
]

const server = setupServer(...handlers)

describe("Users Page", () => {
    beforeAll(() => server.listen())

    afterEach(() => server.resetHandlers())

    afterAll(() => server.close())

    it('should render users loading', async () => {
        renderWithProviders(<Users /> , {
            preloadedState: {
                users: {
                    allUsers: [],
                    status: 'loading',
                }
            }
        })
        expect(await screen.findByText(/loading/i)).toBeInTheDocument()
    });


    it('should render users list', async () => {
        renderWithProviders(<Users /> , {
            preloadedState: {
                users: {
                    allUsers: response,
                    status: 'idle',
                }
            }
        })
        expect(await screen.findByTestId(`user-1`)).toBeInTheDocument()
    });

})
