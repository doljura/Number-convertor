
const SIMPLE_NUMBERS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
const SPECIAL_NUMBERS = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const DEC_NUMBERS = ['ten', 'twenty', 'thirty', 'fourty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

const DATA_MAP = [
    'hundred',
    'thousand',
    'million',
    'billion',
    'trillion'
];

const SPLIT_INDEX = 3;

const getSimpleNumber = (index) => {
    if(!Number(index)) {
        return '';
    }
    return SIMPLE_NUMBERS[Number(index)]
};

const getDecNumber =(num) => {
    return DEC_NUMBERS[Number(num) / 10 - 1]
}

const getDoubleNumber = (str) => {
    const num = Number(str);

    if(num) {
        if(num <= 20 && num >= 10) {
            return SPECIAL_NUMBERS[num - 10];
        } else {
            if(str[0] === '0') {
                return getSimpleNumber(str[1]);
            } else if(str[1] === '0') {
                return getDecNumber(num);
            } else {
                return `${getDecNumber(Number(str[0]) * 10)} ${getSimpleNumber(str[1])}`
            }
        }
    } else {
        return '';
    }
}

const getPartNumInLetters = (str, index) => {
    let result;

    if(!Number(str)) {
        return '';
    }

    switch(str.length) {
        case 1:
            result = getSimpleNumber(str);
            break;

        case 2:
            result = getDoubleNumber(str);
            break;

        case 3:
            result = `${getSimpleNumber(str[0])} ${Number(str[0]) ? DATA_MAP[0] : ''} ${getDoubleNumber(str.substring(1, 3))}`
            break;

        default:
            break;

    }

    return `${result} ${index && DATA_MAP[index] ? DATA_MAP[index] : ''} `
};

const convert = (input) => {
    const num = Number(input);

    if(!num) {
        return SIMPLE_NUMBERS[0];
    }

    let arr = [];
    const str = num.toString();
    const numLen = str.length;

    for(let i = numLen; i >= 0; i--) {
        if(numLen - i === SPLIT_INDEX * arr.length) {
            let substring = str.substring(i - SPLIT_INDEX, i);
            if(substring) {
                arr.unshift(substring);
            }
        }
    }

    const arrLen = arr.length;

    return arr.reduce((acc, item, index) => {
        acc += getPartNumInLetters(item, arrLen > 1 ? arrLen - index - 1 : 0);
        return acc;
    }, '');
}