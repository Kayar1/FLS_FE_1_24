const ingridients = [
    { id: 100, descr: "milk" },
    { id: 101, descr: "water" },
    { id: 102, descr: "coffee" },
    { id: 103, descr: "viski" },
    { id: 104, descr: "choklad" },
    { id: 105, descr: "slivki" },
    { id: 106, descr: "sugar" }
];

const sugarType = [
    { id: 201, descr: "0.5" },
    { id: 202, descr: "1.0" },
    { id: 203, descr: "1.5" },
    { id: 204, descr: "2.0" },
    { id: 205, descr: "2.5" },
    { id: 206, descr: "3.0" }
];

const cofeeType = [
    { id: 301, descr: "Espresso" },
    { id: 302, descr: "Americano" },
    { id: 303, descr: "Capuchino" },
    { id: 304, descr: "Latte" },
    { id: 305, descr: "Mokko" },
    { id: 306, descr: "FlatWhite" },
    { id: 307, descr: "Irish" },
    { id: 308, descr: "Doppio" }
];

const coffeePrice = [
    { id: 301, price: 25 },
    { id: 302, price: 30 },
    { id: 303, price: 50 },
    { id: 304, price: 50 },
    { id: 305, price: 60 },
    { id: 306, price: 60 },
    { id: 307, price: 60 },
    { id: 308, price: 50 }
];

const coffeeIngridients = [
    { id: 301, ingridients: [102] },
    { id: 302, ingridients: [102, 101, 101] },
    { id: 303, ingridients: [102, 100, 105, 105] },
    { id: 304, ingridients: [102, 100, 105, 105] },
    { id: 305, ingridients: [104, 102, 100, 105] },
    { id: 306, ingridients: [102, 100] },
    { id: 307, ingridients: [102, 102, 103, 105] },
    { id: 308, ingridients: [102, 102] }
];

const getDescr = function (id, dataArray) {
    let descr = '';
    for (let i=0; i<=dataArray.length; i++){
        if (dataArray[i].id === id){
            descr = dataArray[i].descr;
        }
    }
    return descr;
}

const getIngigient = function (id = 0) {
    let ingr = '';
    for (let i=0; i<=ingridients.length; i++){
        if (ingridients[i].id === id){
            ingr = ingridients[i].descr;
            break;
        }
    }
    return ingr;
}

const getCoffeePrice = function (id = 0) {
    let price = 0;
    for (let i=0; i<=coffeePrice.length; i++){
        if (coffeePrice[i].id === id){
            price = coffeePrice[i].price;
            break;
        }
    }
    return price;
}

const getCoffeeIngridients = function (id = 0) {
    let ingr = [102];
    for (let i=0; i<=coffeeIngridients.length; i++){
        if (coffeeIngridients[i].id === id){
            ingr = coffeeIngridients[i].ingridients;
            break;
        }
    }
    return ingr;
}

var currentButton = '';

let coffeeButtons = `<tr>
            <td class="machinehead" colspan="7">
                <fieldset class="sugar-field">
                </fieldset>
            </td>
        </tr>
        <tr>
            <td colspan="3">
            </td>
            <td class="tdvisual" rowspan="5">
                
            </td>
            <td colspan="3">
            </td>
        </tr>
        `;
for (let rows = 0; rows < cofeeType.length / 2; rows++) {
    const first = rows;
    const second = rows + (cofeeType.length / 2);
    coffeeButtons += `
            <tr>
            <td class="tdimg"><img class="smallimg" src="./img/${cofeeType[first].id}.jpg" alt="${cofeeType[first].descr}"></td>
            <td class="tdprice">${getCoffeePrice(cofeeType[first].id)}<br>${cofeeType[first].descr}</td>
            <td class="tdbutton">
                <input type="checkbox" name="button${first}" id="button${first}" class="runcoffe" value="${cofeeType[first].id}">
                <label class="runlabel" for="button${first}">RUN</label>
            </td>`;
    if (second < cofeeType.length) {
        coffeeButtons += `
            <td class="tdbutton">
                <input type="checkbox" name="button${second}" id="button${second}" class="runcoffe" value="${cofeeType[second].id}">
                <label class="runlabel" for="button${second}">RUN</label>
            </td>
            <td class="tdprice">${getCoffeePrice(cofeeType[second].id)}<br>${cofeeType[second].descr}</td>
            <td class="tdimg"><img class="smallimg" src="./img/${cofeeType[second].id}.jpg" alt="${cofeeType[second].descr}">
            </td>`;
    }
    coffeeButtons += `
            </tr>`;
}
coffeeButtons += `<tr>
            <td class="machinebottom" colspan="7">Bottom of machine</td>
        </tr>`;

document.querySelector('.machinemenu').innerHTML = coffeeButtons;


let sugarStr = '<legend>Sugar:</legend>';
for (let i = 0; i < sugarType.length; i++) {
    sugarStr += `<input type="radio" name="sugar" id="sugar-${i}" value="${sugarType[i].descr}">
                    <label for="sugar-${i}">${sugarType[i].descr}</label>`;
}

document.querySelector('.sugar-field').innerHTML = sugarStr;

let doorsStr = `        
        <div class="ingridients"></div>
        <img class="sugarimg" src="./img/sugar.jpg" alt="sugar">
        <div class="door1"></div>
                <div class="door3"></div>
                `;

for (let imgs = 0; imgs < cofeeType.length; imgs++) {
    doorsStr += `<img class="readyimg img-${cofeeType[imgs].id}" src="./img/${cofeeType[imgs].id}.jpg" alt="${cofeeType[imgs].descr}">`;
}

document.querySelector('.tdvisual').innerHTML = doorsStr;

document.querySelectorAll('.runcoffe').forEach((elem) =>
    elem.addEventListener('change', function (elem) {
        if (currentButton === '') {
            currentButton = elem.target.value
        };
        if (currentButton != elem.target.value) {
            elem.target.checked = false;
            return;
        };
        if (elem.target.checked) {
            elem.target.disabled = true;
            currentButton += '_';
            //elem.target.checked = false;
            let ingrStr = '';
            const currentItem = parseInt(elem.target.value);
            const ingr = getCoffeeIngridients(currentItem);
            const currentCount = ingr.length;
            const ingrStyle = currentCount > 2 ? `height: ${100 / currentCount}%` : `width: 100%`;
            for (let i = currentCount - 1; i >= 0; i--) {
                ingrStr += `<img class="ingrs" src="./img/${getIngigient(ingr[i])}.jpg" alt="${getIngigient(ingr[i])}" style="${ingrStyle}">`;
            }
            document.querySelector(`.ingridients`).innerHTML = ingrStr;
            document.querySelector(`.img-${elem.target.value}`).classList.add("imgtomove");
            let isSugar = false;
            document.getElementsByName('sugar').forEach((sugarElem) => {
                sugarElem.disabled = true;
                if (sugarElem.checked) {
                    isSugar = true;
                }
            });
            if (isSugar) {
                document.querySelector(`.sugarimg`).classList.add("sugarmove");
            }
            setTimeout(function () {
                elem.target.checked = false;
                elem.target.disabled = false;
                currentButton = '';
                document.getElementsByName('sugar').forEach((sugarElem) => {
                    sugarElem.disabled = false;
                    sugarElem.checked = false;
                });
                document.querySelector(`.img-${elem.target.value}`).classList.remove("imgtomove");
            }, 18000);
        }
    })
);

