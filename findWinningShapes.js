// Left and Right are two board positions with the same number of chips (same length arrays)
const leftCanBecomeRight = (Left, Right) => {
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

const canReachWinningShape = (board, shapes) => {
    for(let i = 0; i < shapes.length; i++){
        if(leftCanBecomeRight(board, shapes[i])) return true
    }
    return false
}




const findWinningShapes = (n, end) => {
    let currBoard = []
    for (let i = 0; i < n; i++) currBoard[i] = i + 1
    let shapes = [currBoard]
    let boardSize = n + 1
    currBoard[n-1] = boardSize
    while(boardSize <= end){
        // for each of the members in shapes, check if currboard can reach it.
        // if it fails ALL of them, add currBoard to shapes

        // try to increment to next board
        // if we're at the last board, increment boardsize and restart the loop



        boardSize++
        for(let i = 0; i < n - 1; i++) currBoard[i] = i + 1
        currBoard[n-1] = boardSize
    }
    return shapes
}

// const n = 3, end = 9
// const result = findWinningShapes(n, end)
// console.log(result)