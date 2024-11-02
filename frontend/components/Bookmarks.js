import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import Article from './Article';
import styles from '../styles/Bookmarks.module.css';

function Bookmarks() {
  const bookmarks = useSelector((state) => state.bookmarks.value);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  let displayedArticles = <p>No article</p>;
  if (bookmarks.length > 0) {
    displayedArticles = bookmarks.map((data, i) => (
      <Article key={i} inBookmarks={true} {...data} isBookmarked />
    ));
  }

  return (
    <div>
      <Head>
        <title>Morning News - Bookmarks</title>
      </Head>
      <div className={styles.container}>
        <h2 className={styles.title}>Bookmarks</h2>
        <div className={styles.articlesContainer}>
          {displayedArticles}
        </div>
        <h2 className={styles.title}>All Articles</h2>
        <div className={styles.articlesContainer}>
          {articles.length > 0 ? articles.map((article) => (
            <Article key={article._id} {...article} isBookmarked={false} />
          )) : <p>Loading articles...</p>}
        </div>
      </div>
    </div>
  );
}

export default Bookmarks;
