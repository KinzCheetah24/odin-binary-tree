export {mergeSortRec};

function mergeSortRec(array = []) {
    if (array.length <= 1) {
        return array;
    }

    let k = Math.floor(array.length / 2);
    let left = mergeSortRec(array.slice(0, k));
    let right = mergeSortRec(array.slice(k));

    return merge(left, right);

}

function merge(array1, array2) {
    let result = [];

    let i = 0, j = 0, n = array1.length, m = array2.length;
    while(i < n & j < m) {
        if(array1[i] < array2[j]) {
            result.push(array1[i]);
            i++;
        } else {
            result.push(array2[j]);
            j++;
        }
    }

    for ( ; i < n ; i++) {
        result.push(array1[i]);
    }

    for ( ; j < m ; j++) {
        result.push(array2[j]);
    }

    return result;
}

const array1 = [3, 2, 1, 13, 8, 5, 0, 1], array2 = [105, 79, 100, 110];

console.log(mergeSortRec(array1));
console.log(mergeSortRec(array2));