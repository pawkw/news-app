const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('030aa2c7342745329663e1b2853e57cf');
const $ = require('jquery');
let navItems = $('.nav-group-item');

getNews('business');

function getNews(category) {
    newsapi.v2.topHeadlines({
        category: category,
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
}

function showNews(allNews) {
    $('#news-list').html('');
    $('#news-list').append(`<!-- search bar starts here-->
        <li class="list-group-header">
            <input class="form-control" type="text" value="" placeholder="Search for news">
        </li>
        <!-- search bar ends here -->`);
    allNews.forEach(news => {
        let singleNews = `<li class="list-group-item">
                <img class="img-circle media-object pull-left" src="${news.urlToImage ? news.urlToImage : null}" width="50"
                    height="50">
                <div class="media-body">
                    <strong><a href="${news.url}" onclick="openArticle(event)">${news.title}</a></strong>
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

function openArticle(event) {
    event.preventDefault();
    let link = event.target.href;
    window.open(link);
}

navItems.click((event) => {
    let category = event.target.id;
    getNews(category);
});