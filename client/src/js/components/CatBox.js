import { select } from '../settings.js';

class CatBox {
    constructor(cat) {
        const thisCatBox = this;

        thisCatBox.data = cat;
        thisCatBox.catList = document.querySelector(select.containerOf.catList);
        thisCatBox.getCatImage();
        thisCatBox.render();
    }

    render() {
        const thisCatBox = this;
        const shortId = thisCatBox.data._id.substr(0,12);
        let shortInfo = thisCatBox.data.text.substr(0,50);
        thisCatBox.date = thisCatBox.data.createdAt.substr(0,10).split('-').reverse().join('-');
        if(thisCatBox.data.text.length > 50) shortInfo = shortInfo + '...';
        const box = document.createElement('li');
        box.classList.add('cat-box');
        box.innerHTML = `
        <div class='cat-image'>
          <img src='/img/${thisCatBox.catImage}' alt='cat' />
        </div>
        <div class='cat-description'>
          <h1 class='cat-id'>id: ${shortId}...</h1>
          <h2 class='cat-date'>${thisCatBox.date}</h2>
          <h3 class='cat-info'>${shortInfo}</h3>
        </div>
        `;
        thisCatBox.catList.appendChild(box);
    }

    getCatImage() {
        const thisCatBox = this;
        const rand = Math.floor(Math.random() * 2);
        if(rand === 0) thisCatBox.catImage = 'cat1.png';
        else thisCatBox.catImage = 'cat2.png';
    }
}

export default CatBox;