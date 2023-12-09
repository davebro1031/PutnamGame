// Left and Right are two board positions with the same number of chips (same length arrays)
const canLeftBecomeRight = (Left, Right) => {
    let i = Left.length - 1
    let j = Right.length - 1
    let dropL = 0
    let dropR = 0
    while (i >= 0 && j >= 0) {
        console.log(Left[i], Right[j])
        if (Left[i] === Right[j]) {
            i--
            j--
        } else if (Left[i] > Right[j]) {
            if (dropL) return false
            dropL = Left[i--]
        } else {
            if (dropR) return false
            dropR = Right[j--]
        }
    }
    return dropL > dropR
}

const Left = [3, 4, 8, 9]
const Right = [2, 4, 8, 9]
const result = canLeftBecomeRight(Left, Right)
console.log(result)