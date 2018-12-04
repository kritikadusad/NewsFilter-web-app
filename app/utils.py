from models import *
import newsapi


def get_articles(news_type, trig_words):
    """ Sends a request to NewsAPI with user's trigger words and preference for type of news."""
    # Based on user's preference of news section, providing section news.
    news_options = {'world': 'bbc.co.uk',
                    'technology': 'techcrunch.com, theverge.com, hackernews.com',
                    'politics': 'politico.com',
                    'entertainment': 'ew.com',
                    'sports': 'espn.com'}

    domains = news_options[news_type]

    trig_words_str = ''
    for trig_word in trig_words:
        trig_words_str += trig_word + ', '

    # Sending request to News API below:
    all_articles = newsapi.get_everything(q=f'-{trig_words_str}',
                                          domains=domains,
                                          from_param=f'{date.today()}',
                                          to=f'{date.today()}',
                                          language='en')

    # This is a list of articles objects from the json response returned.
    # print(all_articles)
    articles = all_articles['articles']
    return filtering_news(articles)


def filtering_news(articles):
    """ Make new list of filtered articles by removing articles from the bannednews table. """

    # Making a set of banned news titles.
    banned_news = BannedNews.query.all()
    banned_titles = set()
    for item in banned_news:
        banned_titles.add(item.trig_article)

    # Filtering news by selecting articles that do not have the triggering
    # title.
    if BannedNews:
        filtered_articles = []
        for article in articles:
            if article['title'] not in banned_titles:
                filtered_articles.append(article)
    else:
        filtered_articles = articles

    return filtered_articles
