const getRandomInt = (min, max) => {
    if(min < 0 || max < 0){
        throw `Аргументы функции не могут быть меньше нуля.`;
    }
    if(min >= max){
        throw `Аргумент функции 'min' не может быть больше или равен аргументу функции 'max'.`;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomFloat = (min, max, signQuantity) => {
    if(min < 0 || max < 0 || signQuantity < 0){
        throw `Аргументы функции не могут быть меньше нуля.`;
    }
    if(min >= max){
        throw `Аргумент функции 'min' не может быть больше или равен аргументу функции 'max'.`;
    }

    let randomResult = Math.random() * (max - min + 1) + min;

    return randomResult.toFixed(signQuantity);
}

console.log(getRandomInt(15, 42));
console.log(getRandomFloat(1.5, 4.2, 3));
