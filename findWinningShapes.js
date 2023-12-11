// Left and Right are two board positions with the same number of chips (same length arrays)
const leftCanBecomeRight = (Left, Right) => {
    let i = Left.length - 1
    let j = Right.length - 1
    let dropL = 0
    let dropR = 0
    while (i >= 0 && j >= 0) {
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
    for (let i = 0; i < shapes.length; i++) {
        if (leftCanBecomeRight(board, shapes[i])) return true
    }
    return false
}
const findWinningShapes = (n, end) => {
    let currBoard = []
    for (let i = 0; i < n; i++) currBoard[i] = i + 1
    let shapes = [currBoard.slice()]
    let boardSize = n + 1
    currBoard[n - 1] = boardSize
    while (boardSize <= end) {
        // for each of the members in shapes, check if currboard can reach it.
        // if it fails ALL of them, add currBoard to shapes

        while (currBoard[0] < boardSize - n + 1) {
            if (!canReachWinningShape(currBoard, shapes)) shapes.push(currBoard.slice())
            // try to increment to next board
            // if we're at the last board, increment boardsize and restart the loop
            for (let i = n - 2; i >= 0; i--) {
                if (currBoard[i] < boardSize - n + i + 1) {
                    currBoard[i] += 1
                    for (let j = i + 1; j <= n - 2; j++) currBoard[j] = currBoard[j - 1] + 1
                    break
                }
            }
        }
        if (!canReachWinningShape(currBoard, shapes)) shapes.push(currBoard.slice())

        boardSize++
        for (let i = 0; i < n - 1; i++) currBoard[i] = i + 1
        currBoard[n - 1] = boardSize
    }
    return shapes //.filter(shape => shape[0] > 1)
}
const shapeConverter = (shape) => {
    let result = []
    for (let i = shape.length - 1; i > 0; i--) {
        result[shape.length - 1 - i] = shape[i] - shape[i - 1] - 1
    }
    result[shape.length - 1] = shape[0] - 1
    return result
}
const findSum = (arr) => {
    return arr.reduce((acc, curr) => acc + curr, 0)
}

const foldShape = (shape) => {
    let n = shape[shape.length - 1]
    let result = []
    for (let i = 0; i < shape.length; i++) {
        result[i] = (shape[i] > n / 2 ? n - shape[i] + 1 : shape[i])
    }
    return result.sort((a, b) => a - b)
}

const shapeHistogram = (shapes, position) => {
    let result = {}
    let max = 0
    for(let i = 0; i < shapes.length ; i++ ){
        max = Math.max(max, shapes[i][position])
        result[shapes[i][position]] = (result[shapes[i][position]] ? result[shapes[i][position]] + 1 : 1)
    }
    for(let i = 3; i<max; i++){
        if(!result[i]) result[i] = 0
    }
    return result
}

const n = 3, end = 15, filter = end
const result = findWinningShapes(n, end)
console.log(result)
// console.log(result.map(shapeConverter))
// console.log(result.filter(a => a[2] === filter))
// console.log(result.filter(a => a[2] === filter).map(shapeConverter))
// console.log(shapeHistogram(result, 2))

// console.log(result.filter(a => a[2] === filter).map(shapeConverter).map(findSum))
// console.log(result.filter(a => a[2] === filter).map(shapeConverter))
// console.log(result.filter(a => a[2] === filter).map(shapeConverter).map( arr => arr.reduce((acc, curr) => acc + curr, 0)))
// console.log(result.map( arr => arr.reduce((acc, curr) => acc + curr, 0)) )