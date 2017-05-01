function detailNews(element) {
    let article = articleModel.getArticle(element.dataset.id);
    document.querySelector('.detailNew').dataset.id = article.id;
    document.querySelector(".news").style.display = "none";
    document.querySelector(".show-more").style.display = "none";
    document.querySelector(".popylar-add").style.display = "none";

    if (check) {
        document.querySelector(".delete-detail-new").style.display = "block";
        document.querySelector(".edit-detail-new").style.display = "block";
    } else {
        document.querySelector(".delete-detail-new").style.display = "none";
        document.querySelector(".edit-detail-new").style.display = "none";
    }
    document.querySelector(".slide-show").style.display = "none";
    document.querySelector('.detailNew').style.display = "block";
    document.querySelector('.article-detail-title').textContent = article.title;
    document.querySelector('.article-detail-content').textContent = article.content;
    document.querySelector('.article-detail-author').textContent = article.author;
    document.querySelector('.article-detail-date').textContent = articleRenderer.formatDate(article.createdAt);
    document.querySelector('.article-detail-img').setAttribute("src", article.img);
    document.querySelector('.detail-tags').textContent = article.tags;

}


