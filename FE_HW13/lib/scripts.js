const ingridients = ["milk", "water", "coffee", "viski", "choklad", "slivki", "sugar"];
const sugarType = ["0.5", "1.0", "1.5", "2.0", "2.5", "3.0"];
const cofeeType = [
    { descr: "Espresso", price: 25, ingridients: [2] },
    { descr: "Americano", price: 30, ingridients: [2, 1, 1] },
    { descr: "Capuchino", price: 50, ingridients: [2, 0, 5, 5] },
    { descr: "Latte", price: 50, ingridients: [2, 0, 5, 5] },
    { descr: "Mokko", price: 60, ingridients: [4, 2, 0, 5] },
    { descr: "FlatWhite", price: 60, ingridients: [2, 0] },
    { descr: "Irish", price: 60, ingridients: [2, 2, 3, 5] },
    { descr: "Doppio", price: 50, ingridients: [2, 2] }
];

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
            <td class="tdimg"><img class="smallimg" src="./img/${first + 1}.jpg" alt="${cofeeType[first].descr}"></td>
            <td class="tdprice">${cofeeType[first].price}<br>${cofeeType[first].descr}</td>
            <td class="tdbutton">
                <input type="checkbox" name="button${first}" id="button${first}" class="runcoffe" value="${first}">
                <label class="runlabel" for="button${first}">RUN</label>
            </td>
            <td class="tdbutton">
                <input type="checkbox" name="button${second}" id="button${second}" class="runcoffe" value="${second}">
                <label class="runlabel" for="button${second}">RUN</label>
            </td>
            <td class="tdprice">${cofeeType[second].price}<br>${cofeeType[second].descr}</td>
            <td class="tdimg"><img class="smallimg" src="./img/${second + 1}.jpg" alt="${cofeeType[second].descr}"></td>
            </tr>`;
}
coffeeButtons += `<tr>
            <td class="machinebottom" colspan="7">Bottom of machine</td>
        </tr>`;

document.querySelector('.machinemenu').innerHTML = coffeeButtons;


let sugarStr = '<legend>Sugar:</legend>';
for (let i = 0; i < sugarType.length; i++) {
    sugarStr += `<input type="radio" name="sugar" id="sugar-${i}" value="${sugarType[i]}">
                    <label for="sugar-${i}">${sugarType[i]}</label>`;
}

document.querySelector('.sugar-field').innerHTML = sugarStr;

let doorsStr = `        
        <div class="ingridients"></div>
        <img class="sugarimg" src="./img/sugar.jpg" alt="sugar">
        <div class="door1"></div>
                <div class="door3"></div>
                `;

for (let imgs = 0; imgs < cofeeType.length; imgs++) {
    doorsStr += `<img class="readyimg img-${imgs}" src="./img/${imgs + 1}.jpg" alt="${cofeeType[imgs].descr}">`;
}

document.querySelector('.tdvisual').innerHTML = doorsStr;

document.querySelectorAll('.runcoffe').forEach((elem) =>
    elem.addEventListener('change', function (elem) {
        if (elem.target.checked) {
            let ingrStr = '';
            const currentItem = parseInt(elem.target.value);
            const currentCount = cofeeType[currentItem].ingridients.length;
            const ingrStyle = currentCount > 2 ? `height: ${100 / currentCount}%` : `width: 100%`;
            for (let i = currentCount - 1; i >= 0; i--) {
                ingrStr += `<img class="ingrs" src="./img/${ingridients[cofeeType[currentItem].ingridients[i]]}.jpg" alt="${ingridients[cofeeType[currentItem].ingridients[i]]}" style="${ingrStyle}">`;
            }
            document.querySelector(`.ingridients`).innerHTML = ingrStr;
            document.querySelector(`.img-${elem.target.value}`).classList.add("imgtomove");
            let isSugar = false;
            const sugarElem = document.getElementsByName('sugar');
            for (let i = 0; i < sugarElem.length; i++) {
                if (sugarElem[i].checked) {
                    isSugar = true;
                    break;
                }
            };
            if (isSugar) {
                document.querySelector(`.sugarimg`).classList.add("sugarmove");
            }
            setTimeout(function () {
                elem.target.checked = false;
                document.querySelector(`.img-${elem.target.value}`).classList.remove("imgtomove");
                //document.querySelector(`.sugarimg`).classList.remove("sugarmove");
            }, 18000);
        }
    })
);