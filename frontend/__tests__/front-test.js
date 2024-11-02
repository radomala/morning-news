import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Article from '../components/Article';

const mockStore = configureStore([]);

describe('Article Component', () => {
    const title = "Test Title";
    const author = "Test Author";
    const content = "Test Content";

    // Créez un magasin simulé
    const store = mockStore({
        user: { value: {} }, // Simulez l'état nécessaire
        hiddenArticles: { value: [] } // Simulez d'autres états si nécessaire
    });

    it('renders the title', () => {
        render(
            <Provider store={store}>
                <Article title={title} author={author} description={content} />
            </Provider>
        );
        const titleElement = screen.getByRole('heading', { name: title });
        expect(titleElement).toBeTruthy(); // Vérifie que le titre existe
    });

    it('renders the author', () => {
        render(
            <Provider store={store}>
                <Article title={title} author={author} description={content} />
            </Provider>
        );
        const authorElement = screen.getByText(`- ${author}`);
        expect(authorElement).toBeTruthy(); // Vérifie que l'auteur existe
    });

    it('renders the description', () => {
        render(
            <Provider store={store}>
                <Article title={title} author={author} description={content} />
            </Provider>
        );
        const descriptionElement = screen.getByText(content);
        expect(descriptionElement).toBeTruthy(); // Vérifie que la description existe
    });

    it('renders the image', () => {
        render(
            <Provider store={store}>
                <Article title={title} author={author} description={content} urlToImage="http://example.com/image.jpg" />
            </Provider>
        );
        const imageElement = screen.getByAltText(title);
        expect(imageElement).toBeTruthy(); // Vérifie que l'image existe
    });
});
