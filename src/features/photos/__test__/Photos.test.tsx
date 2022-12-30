import { screen } from '@testing-library/react';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import Photos from '../Photos';
import { renderWithProviders } from '../../../app/test-utils'

const photoResponse = {
        "albumId": 1,
        "id": 1,
        "title": "accusamus beatae ad facilis cum similique qui sunt",
        "url": "https://via.placeholder.com/600/92c952",
        "thumbnailUrl": "https://via.placeholder.com/150/92c952"
}    

const albumResponse = {
        "userId": 1,
        "id": 1,
        "title": "quidem molestiae enim"
} 

const userResponse = {
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

export const handlers = [
    rest.get('https://jsonplaceholder.typicode.com/photos', (req, res, ctx) => {
      return res(ctx.json(photoResponse), ctx.delay(150))
    }),
]

const server = setupServer(...handlers)

describe("Photos Page", () => {
    beforeAll(() => server.listen())

    afterEach(() => server.resetHandlers())

    afterAll(() => server.close())

    it('should render photos loading', async () => {
        renderWithProviders(<Photos /> , {
            preloadedState: {
                photos: {
                    allPhotos: [],
                    status: 'loading',
                    album: {
                        id: 0,
                        title: "",
                        userId: 0
                    }
                }
            }
        })
        expect(await screen.findByText(/loading/i)).toBeInTheDocument()
    });


    it('should render photos list', async () => {
        renderWithProviders(<Photos /> , {
            preloadedState: {
                // albums: {
                //     allAlbums: [
                //         albumResponse
                //     ],
                //     status: 'idle',
                //     user: userResponse
                // },
                photos: {
                    allPhotos: [photoResponse],
                    status: 'idle',
                    album: albumResponse
                }
            }
        })
        screen.debug()
        expect(await screen.findByTestId(`photo-1`)).toBeInTheDocument()
    });

})