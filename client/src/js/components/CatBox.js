import { select } from '../settings.js';

class CatBox {
    constructor(cat) {
        const thisCatBox = this;

        thisCatBox.data = cat;
        thisCatBox.getSelectors();
        thisCatBox.getCatImage();
        thisCatBox.render();
    }

    getSelectors() {
        const thisCatBox = this;
        thisCatBox.catList = document.querySelector(select.containerOf.catList);
        thisCatBox.popup = document.querySelector(select.containerOf.popup);
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

        box.addEventListener('click', function(event) {
          event.preventDefault();
          thisCatBox.popup.classList.add('show');
          const popupBox = document.createElement('div');
          popupBox.classList.add('popup');
          popupBox.innerHTML = `
          <div class='close-btn'>&times;</div>
          <div class='cat-image popup-image'>
            <img src='/img/${thisCatBox.catImage}' alt='cat'>
          </div>
          <div class='cat-description popup-description'>
            <h1 class='cat-id popup-id'>ID: ${thisCatBox.data._id}</h1>
            <h2 class='cat-date popup-date'>${thisCatBox.date}</h2>
            <h3 class='cat-info popup-info'>${thisCatBox.data.text}</h3>
          </div>
          `;

          thisCatBox.popup.appendChild(popupBox);

          thisCatBox.closeBtn = document.querySelector(select.others.closeBtn);
          console.log('close btn: ', thisCatBox.closeBtn);

          thisCatBox.closeBtn.addEventListener('click', function(event) {
            event.preventDefault();
            console.log('btn clicked');
            thisCatBox.popup.classList.remove('show');
            thisCatBox.popup.removeChild(thisCatBox.popup.firstChild);
          });
        });

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