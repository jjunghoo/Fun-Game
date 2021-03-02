'use strict'
import * as sound from './sound.js';

const CARROT_SIZE = 80;

export const ItemType = Object.freeze({
    carrot: 'carrot',
    bug: 'bug'
});

export class Field {
    constructor(carrotCount, bugCount) {
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        // 바인딩 : class 정보를 함수로 전달
        // this.onClick = this.onClick.bind(this); 
        // this.field.addEventListener('click', (event) => this.onClick(event));
        this.field.addEventListener('click', this.onClick);
    }

    init() {
        this.field.innerHTML = '';
        // 벌레와 당근을 생성한뒤 field에 추가해줌
        // console.log(fieldRect);
        this._addItem('carrot', this.carrotCount, 'img/carrot.png');
        this._addItem('bug', this.bugCount, 'img/bug.png');
    }

    setClickListener(onItemClick) {
        this.onItemClick = onItemClick;
    }

    _addItem(className, count, imgPath) {
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - CARROT_SIZE - 40;
        for(let i = 0; i < count; i++) {
            const item = document.createElement('img');
            item.setAttribute('class', className);
            item.setAttribute('src', imgPath);
            item.style.position = 'absolute';
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            this.field.appendChild(item);
        }
    }

    onClick = event => {
        const target = event.target;
        if(target.matches('.carrot')) {
            // 당근!!
            target.remove();
            // score++;
            sound.playCarrot();
            // updateScoreBoard();
            this.onItemClick && this.onItemClick(ItemType.carrot);
        } else if (target.matches('.bug')) {
            // 벌레!!
            // finishGame(false);
            this.onItemClick && this.onItemClick(ItemType.bug);
        }
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}