import { animateScroll } from 'react-scroll';


const scrollToFirstError = (errors: any) => {

    const errorFields = getErrorFieldNames(errors);
    // Using breakable for loop
    for (let i = 0; i < errorFields.length; i++) {
        const fieldName = errorFields[i];
        // Checking if the marker exists in DOM
        const element = document.querySelector(`input[name="${fieldName}"]`) as HTMLElement;
        if (element) {
            animateScroll.scrollTo(element.offsetTop - 50); // animate directly to the right position
            break;
        }
    }
}

const getErrorFieldNames = (obj: any, name = '') => {
    const errorArr: any = [];
    errorArr.push(Object.keys(obj).map((key) => {
        const next = obj[key];
        if (next) {
            if (typeof next === 'string') {
                return name + key;
            }
            // Keep looking
            if (next.map) {
                errorArr.push(next.map((item: any, index: number) => getErrorFieldNames(item, `${name}${key}[${index}].`)).filter((o: any) => o));
            }
        }
        return null;
    }).filter(o => o));
    return flatten(errorArr);
}

const flatten = (arr: any) => {
    return arr.reduce((flat: any, toFlatten: any) => flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten), []);
}

export default scrollToFirstError;