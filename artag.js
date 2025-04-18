/* Вызов функции
if (document.querySelector('#ar-inter')) {
    arInter('#ar-inter', 2560, 2005);
}
*/

function arInter(doc, widthImage, heightImage, countLabels = 50) {

    //Создаем классы для кнопок на изображении
    let arrClassName = [];
    createClassBtnImg();

    function createClassBtnImg() {
        for (let i = 0; i <= countLabels; i++) {
            arrClassName.push('ar-btn' + i);
        }
    }

    let arBtnImgArray = [];
    let arBtnTitleArray = [];
    let arDescArray = [];
    let newHeight;

    //Подключение к DOM
    const arInterBlock = document.querySelector(doc);
    const arImg = arInterBlock.querySelector('.ar-img');   
    arImg.className = arrClassName[0] + ' ar-img';

    if (arImg.querySelectorAll('span')) {
        arBtnImgArray = arImg.querySelectorAll('span');
        addClassBtnImg(arBtnImgArray);
    }

    if (arInterBlock.querySelector('.ar-btn-title')) {
        arBtnTitle = arInterBlock.querySelector('.ar-btn-title');
        arBtnTitleArray = arBtnTitle.querySelectorAll('button');
        addClassBtnImg(arBtnTitleArray);

    }

    if (arInterBlock.querySelector('.ar-desc')) {
        arDesc = arInterBlock.querySelector('.ar-desc');
        arDescArray = arDesc.querySelectorAll('div');
        addClassBtnImg(arDescArray);
    }
    
    //Устанавливаем классы и обработчик событий меткам на изображении 
    function addClassBtnImg(btns) {
        let n = 0;
        if (btns == arBtnImgArray) {
            n = 1;
        }
        for (i = 0; i < btns.length; i++) {
            btns[i].classList.add(arrClassName[n]);
            if (btns != arDescArray) {
                btns[i].addEventListener('click', (e) =>{
                    btnActive(e.target, e.target.classList.value);
                }, true);
            }
            n++;
        }
    }

    //Вычисляем соотношение пропорций изображения
    function calcProportion(width, height) {
        newHeight = (height * 100) / width;
    }
    calcProportion(widthImage, heightImage);

    //Устанавливаем высоту изображения при изменении размера экрана
    function setHeightImg(img, difHeight) {
        let getStyle = window.getComputedStyle(arImg);
        let height = (parseInt(getStyle.width.slice(0, -2)) * difHeight) / 100;
        img.style.height = `${height}px`;
    }

    window.addEventListener('resize',() => {
        setHeightImg(arImg, newHeight);  
    });
    setHeightImg(arImg, newHeight);

    //Функция сбрасывает состояния
    function clearState(elem) {
        for (i = 0; i < elem.length; i++) {
            if (elem[i].classList.contains("ar-disable")) {
                elem[i].classList.remove('ar-disable');
            } else if(elem[i].classList.contains("ar-active")) {
                elem[i].classList.remove('ar-active');
            }
        }
    }

    function clearAll() {
        clearState(arBtnImgArray);
        clearState(arBtnTitleArray);
        clearState(arDescArray);
    }

    //Функция добавяет состояния
    function addState(elem, target) {
        for (i = 0; i < elem.length; i++) {
            if(elem[i].classList.contains(target)){
                elem[i].classList.add('ar-active');
                return;
            }
        }
    }

    //Обрабатываем нажатия на кнопки
    function btnActive(target, targetClass){
        if (target.classList.contains('ar-btn0')) {
            clearAll();
            arInterBlock.classList.remove('ar-active');
            arImg.className = arrClassName[0] + ' ar-img';
        } else if (target.classList.contains('ar-active') && target.parentNode.classList.contains('ar-img')) {
            clearAll();
            arInterBlock.classList.remove('ar-active');
            arImg.className = arrClassName[0] + ' ar-img';
        } else if (!target.classList.contains('ar-active')) {
            arInterBlock.classList.add('ar-active');
            arImg.className = targetClass + ' ar-img';

            clearAll()
            addState(arBtnImgArray, targetClass);
            addState(arBtnTitleArray, targetClass);
            addState(arDescArray, targetClass);
        } 
    }
}