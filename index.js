const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('030aa2c7342745329663e1b2853e57cf');
const $ = require('jquery');

newsapi.v2.topHeadlines({
    category: 'business',
    language: 'en',
    country: 'ca',
})
    .then((results) => {
        console.log("Results: ", results);
        showNews(results.articles);
    })
    .catch((err) => {
        console.log("Error: ", err);
    });

function showNews(allNews) {
    allNews.forEach(news => {
        let singleNews = `<li class="list-group-item">
                <img class="img-circle media-object pull-left" src="${news.urlToImage ? news.urlToImage : null}" width="50"
                    height="50">
                <div class="media-body">
                    <strong><a href="${news.url}" >${news.title}</a></strong>
                    <div>
                        <span class="">${news.publishedAt}</span>
                        <span class="pull-right">Author: ${news.author}</span>
                    </div>
                    <p>${news.description}</p>
                </div>
            </li>`;
        $('#news-list').append(singleNews);
    });
}