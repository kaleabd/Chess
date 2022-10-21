const board_container = document.querySelector(".board-container");

let playerType = 11;

let black = true;
var boardArr = [
    [5, 3, 4, 9, 10, 4, 3, 5],
    [11, 1, 1, 1, 1, 1, 1, 1],
    [44, 0, 0, 0, 4, 0, 0, 1],
    [5, 0, 0, 0, 100, 0, 0, 0],
    [0, 0, 11, 44, 0, 0, 0, 0],
    [55, 0, 1, 1, 1, 1, 0, 55],
    [11, 11, 11, 11, 0, 0, 1, 11],
    [1, 33, 44, 99, 100, 44, 33, 55]
];
let board_containerAll;
let firstClick, secondClick;
function draw() {
    while (board_container.firstChild) {
        board_container.removeChild(board_container.firstChild);
    }
    for (let g = 0; g < 8; g++) {
        for (let i = 0; i < 8; i++) {
            let board_piece = document.createElement("div");
            let val = boardArr[g][i];
            let img = document.createElement("img");
            if (val != 0) {
                let loc = "img/" + val + ".png";
                img.src = loc;
                img.classList.add("piece");
                board_piece.appendChild(img);
            }
            if (black) {
                board_piece.classList.add("black", "piece-div");
                black = false;
            } else {
                board_piece.classList.add("white", "piece-div");
                black = true;
            }

            board_container.appendChild(board_piece);
        }
        if (black) black = false;
        else black = true;
    }
    board_containerAll = document.querySelectorAll(".piece-div");
    firstClick = undefined;
    secondClick = undefined;
    for (let i = 0; i < 64; i++) {
        let pieces = board_containerAll[i];
        pieces.addEventListener('click', (event) => {
            if (pieces.firstChild != null) {
                removeClicked(board_containerAll);
                board_containerAll[i].classList.toggle("box-clicked")
            }
            else {
                removeClicked(board_containerAll)
            }

            secondClick = i;
            if (secondClick != undefined && firstClick != undefined) {
                let firstIndexY = Math.floor(firstClick / 8);
                let firstIndexX = Math.floor(firstClick % 8);

                let secondIndexY = Math.floor(secondClick / 8);
                let secondIndexX = Math.floor(secondClick % 8);

                calculateMove(firstIndexY, firstIndexX, secondIndexY, secondIndexX);

                draw();

            }
        })

    }
}
draw();

function removeClicked(el) {
    let i = 0;
    el.forEach(box => {
        if (box.classList.contains("box-clicked")) {
            firstClick = i;
            box.classList.remove('box-clicked');
        }
        i += 1;
    });

}


function calculateMove(firstIndexY, firstIndexX, secondIndexY, secondIndexX) {

    // console.log(firstIndexY, firstIndexX);
    // console.log(secondIndexY, secondIndexX);

    let toBeMoved = boardArr[firstIndexY][firstIndexX];

    if (toBeMoved == 1 || toBeMoved == 11) {
        calculatePawn(firstIndexY, firstIndexX, secondIndexY, secondIndexX, playerType, toBeMoved);
    }
    else if (((toBeMoved == 5 && playerType == 1) || (toBeMoved == 55 && playerType == 11)) && ((firstIndexY == secondIndexY) || (firstIndexX == secondIndexX)) && !((firstIndexY == secondIndexY) && (firstIndexX == secondIndexX))) {
        calculateRook(firstIndexY, firstIndexX, secondIndexY, secondIndexX, playerType);
    }
    else if ((toBeMoved == 3 && playerType == 1) || (toBeMoved == 33 && playerType == 11)){
        
        if (((Math.abs(firstIndexX - secondIndexX) == 1 && Math.abs(firstIndexY - secondIndexY) == 2) || (Math.abs(firstIndexX - secondIndexX) == 2 && Math.abs(firstIndexY - secondIndexY) == 1)))
        calculateKnight(firstIndexY, firstIndexX, secondIndexY, secondIndexX,playerType);
    }
    else if ((toBeMoved == 4 && playerType == 1) || (toBeMoved == 44 && playerType == 11)){
       let diff = (Math.abs(firstIndexX - secondIndexX) == Math.abs(firstIndexY - secondIndexY));
       let diffA = Math.abs(firstIndexX - secondIndexX);
       if (diff && diffA != 0)
       if (calculateBishop(firstIndexY, firstIndexX, secondIndexY, secondIndexX, playerType)){
        if(notKing(secondIndexX,secondIndexY))
        take(firstIndexY, firstIndexX, secondIndexY, secondIndexX);
       };
    }
    else if ((toBeMoved == 9 && playerType == 1) || (toBeMoved == 99 && playerType == 11)){
        let diff = (Math.abs(firstIndexX - secondIndexX) == Math.abs(firstIndexY - secondIndexY));
        let diffA = Math.abs(firstIndexX - secondIndexX);
        if (diff && diffA != 0)
        if (calculateBishop(firstIndexY, firstIndexX, secondIndexY, secondIndexX, playerType)){
         if(notKing(secondIndexX,secondIndexY))
         take(firstIndexY, firstIndexX, secondIndexY, secondIndexX);
        }
         if(((firstIndexY == secondIndexY) || (firstIndexX == secondIndexX)) && !((firstIndexY == secondIndexY) && (firstIndexX == secondIndexX))) {
        calculateRook(firstIndexY, firstIndexX, secondIndexY, secondIndexX, playerType);
        }
    }
    else if (((toBeMoved == 10 && playerType == 1) || (toBeMoved == 100 && playerType == 11))){
        // console.log(firstIndexY, firstIndexX)
        // console.log(secondIndexY, secondIndexX)
        calculateKing(firstIndexY, firstIndexX, secondIndexY, secondIndexX, playerType);
    }

}

function calculatePawn(firstIndexY, firstIndexX, secondIndexY, secondIndexX, playerType, toBeMoved) {
   // if (playerType == toBeMoved) 
    {
        if (playerType == 11) {
            if (firstIndexY - 1 == secondIndexY) {
                if (firstIndexX - 1 == secondIndexX || firstIndexX + 1 == secondIndexX) {
                    calculatePawnTake(firstIndexY, firstIndexX, secondIndexY, secondIndexX, playerType, toBeMoved);
                }
                if (firstIndexX == secondIndexX) {
                    calculatePawnOneMove(firstIndexY, firstIndexX, secondIndexY, secondIndexX);
                }
            }
            if (firstIndexY - 2 == secondIndexY) {
                if (firstIndexY == 6) {
                    calculatePawnTwoMove(firstIndexY, firstIndexX, secondIndexY, secondIndexX, playerType, toBeMoved);
                }
            }
        }
        if (playerType == 1) {
            if (firstIndexY + 1 == secondIndexY) {
                if (firstIndexX + 1 == secondIndexX || firstIndexX - 1 == secondIndexX) {
                    calculatePawnTake(firstIndexY, firstIndexX, secondIndexY, secondIndexX, playerType, toBeMoved);
                }
                if (firstIndexX == secondIndexX) {
                    calculatePawnOneMove(firstIndexY, firstIndexX, secondIndexY, secondIndexX);
                }
            }
            if (firstIndexY + 2 == secondIndexY) {
                if (firstIndexY == 1) {
                    calculatePawnTwoMove(firstIndexY, firstIndexX, secondIndexY, secondIndexX, playerType, toBeMoved);
                }
            }
        }
    }
}
function calculatePawnTwoMove(firstIndexY, firstIndexX, secondIndexY, secondIndexX) {
    if (boardArr[secondIndexY][secondIndexX] == 0) {
        swap(firstIndexY, firstIndexX, secondIndexY, secondIndexX);
    }
}
function calculatePawnOneMove(firstIndexY, firstIndexX, secondIndexY, secondIndexX) {
    if (boardArr[secondIndexY][secondIndexX] == 0) {
        swap(firstIndexY, firstIndexX, secondIndexY, secondIndexX);
    }
}
function calculatePawnTake(firstIndexY, firstIndexX, secondIndexY, secondIndexX, playerType,toBeMoved) {
    if (playerType == 11 && checkIfBlack(toBeMoved)) {
        if (checkIfWhite(boardArr[secondIndexY][secondIndexX])) {
            take(firstIndexY, firstIndexX, secondIndexY, secondIndexX)
        }
    }
    if (playerType == 1 && checkIfWhite(toBeMoved)) {
        if (checkIfBlack(boardArr[secondIndexY][secondIndexX])) {
            take(firstIndexY, firstIndexX, secondIndexY, secondIndexX)
        }
    }
}

function swap(firstIndexY, firstIndexX, secondIndexY, secondIndexX) {
    let temp = boardArr[secondIndexY][secondIndexX];
    boardArr[secondIndexY][secondIndexX] = boardArr[firstIndexY][firstIndexX];
    boardArr[firstIndexY][firstIndexX] = temp;
}

function take(firstIndexY, firstIndexX, secondIndexY, secondIndexX) {
    boardArr[secondIndexY][secondIndexX] = boardArr[firstIndexY][firstIndexX];
    boardArr[firstIndexY][firstIndexX] = 0;
}

function checkIfWhite(toBeChecked) {
    if (toBeChecked == 1 || toBeChecked == 3 || toBeChecked == 4 || toBeChecked == 5 || toBeChecked == 9) {
        return true;
    }
    else return false;
}
function checkIfBlack(toBeChecked) {
    if (toBeChecked == 11 || toBeChecked == 33 || toBeChecked == 44 || toBeChecked == 55 || toBeChecked == 99) {
        return true;
    }
    else return false;
}
function notKing(secondIndexX,secondIndexY){
    if (boardArr[secondIndexY][secondIndexX] != 10 &&  boardArr[secondIndexY][secondIndexX] != 100){
        return true;
    }
    else return false;
}
function calculateRook(firstIndexY, firstIndexX, secondIndexY, secondIndexX, playerType) {
    // {

    //  if (toBeMoved == 55 && playerType == 11){
    //     if (checkRookMoveCorrectBlack(firstIndexY, firstIndexX, secondIndexY, secondIndexX)){
    //         if (boardArr[secondIndexY][secondIndexX] != 10)
    //         take(firstIndexY, firstIndexX, secondIndexY, secondIndexX);
    //     }
    //  }
    //  if (toBeMoved == 5 && playerType == 1){
    //     if (checkRookMoveCorrectWhite(firstIndexY, firstIndexX, secondIndexY, secondIndexX)){
    //         if (boardArr[secondIndexY][secondIndexX] != 100)
    //         take(firstIndexY, firstIndexX, secondIndexY, secondIndexX);
    //     }
    //  }
    // }


        if (checkRookMoveCorrect(firstIndexY, firstIndexX, secondIndexY, secondIndexX, playerType)){
            if (notKing (secondIndexX, secondIndexY))
            take(firstIndexY, firstIndexX, secondIndexY, secondIndexX);
        }
     }

// function checkRookMoveCorrectBlack(firstIndexY, firstIndexX, secondIndexY, secondIndexX){
//     // console.log(firstIndexX, firstIndexY)
//     // console.log(secondIndexX, secondIndexY);
//     if (firstIndexX == secondIndexX){
//         if (firstIndexY < secondIndexY){
//             for (let i = firstIndexY+1; i <= secondIndexY; i ++){
//                 let piece = boardArr[i][firstIndexX];
//                 if (piece != 0){
//                     if(i == secondIndexY && checkIfBlack(piece)){
//                         return false;
//                     }
//                     else if (i != secondIndexY) {
//                     return false;
//                     }
//                 }
//             }
//             return true;
//         }
//         else {
//             for (let i = firstIndexY - 1; i >= secondIndexY; i --){
//                 let piece = boardArr[i][firstIndexX];
//                 if (piece != 0){
//                     if(i == secondIndexY && checkIfBlack(piece)){
//                         return false;
//                     }
//                     else if (i != secondIndexY) {
//                     return false;
//                     }
//                 }
//             }
//             return true;
//         }
//         }
//     else {
        
//         if (firstIndexX < secondIndexX){
//             for (let i = firstIndexX+1; i <= secondIndexX; i ++){
//                 let piece = boardArr[firstIndexY][i];
//                 if (piece != 0){
//                     if(i == secondIndexX && checkIfBlack(piece)){
//                         return false;
//                     }
//                     else if (i != secondIndexX) {
//                     return false;
//                     }
//                 }
//             }
//             return true;
//         }
//         else {
            
//             for (let i = firstIndexX - 1; i >= secondIndexX; i --){
//                 let piece = boardArr[firstIndexY][i];
//                 if (piece != 0){
//                     if(i == secondIndexX && checkIfBlack(piece)){
//                         return false;
//                     }
//                     else if (i != secondIndexX) {
//                     return false;
//                     }
//                 }
//             }
//             return true;
//         }
//     }
// }
// let b = false;
// function checkRookMoveCorrectWhite(firstIndexY, firstIndexX, secondIndexY, secondIndexX, b){
//     if (firstIndexX == secondIndexX){
//         if (firstIndexY < secondIndexY){
//             for (let i = firstIndexY+1; i <= secondIndexY; i ++){
//                 let piece = boardArr[i][firstIndexX];
//                 if (piece != 0){
//                     if(i == secondIndexY && (b && checkIfWhite(piece) || !x && checkIfBlack(piece)) ){
//                         // console.log("exit in last")
//                         return false;
//                     }
//                     else if (i != secondIndexY) {
//                     // console.log("exit")
//                     return false;
//                     }
//                 }
//             }
//             return true;
//         }
//         else {
//             for (let i = firstIndexY - 1; i >= secondIndexY; i --){
//                 let piece = boardArr[i][firstIndexX];
//                 if (piece != 0){
//                     if(i == secondIndexY && checkIfWhite(piece)){
//                         console.log("exit in last")
//                         return false;
//                     }
//                     else if (i != secondIndexY) {
//                     console.log("exit")
//                     return false;
//                     }
//                 }
//             }
//             return true;
//         }
//         }
//     else {
//         if (firstIndexX < secondIndexX){
//             for (let i = firstIndexX+1; i <= secondIndexX; i ++){
//                 let piece = boardArr[firstIndexY][i];
//                 if (piece != 0){
//                     if(i == secondIndexX && checkIfWhite(piece)){
//                         console.log("exit in last")
//                         return false;
//                     }
//                     else if (i != secondIndexX) {
//                     console.log("exit")
//                     return false;
//                     }
//                 }
//             }
//             return true;
//         }
//         else {
//             for (let i = firstIndexX - 1; i >= secondIndexX; i --){
//                 let piece = boardArr[firstIndexY][i];
//                 if (piece != 0){
//                     if(i != secondIndexX && checkIfWhite(piece)){
//                         console.log("exit in last")
//                         return false;
//                     }
//                     else if (i != secondIndexX) {
//                     console.log("exit")
//                     return false;
//                     }
//                 }
//             }
//             return true;
//         }
//     }
// }

function checkRookMoveCorrect(firstIndexY, firstIndexX, secondIndexY, secondIndexX, playerType){
    let playerT;
    if (playerType == 1) playerT = true;
    else playerT = false;

    if (firstIndexX == secondIndexX){
        if (firstIndexY < secondIndexY){
            for (let i = firstIndexY+1; i <= secondIndexY; i ++){
                let piece = boardArr[i][firstIndexX];
                if (piece != 0){
                    if(i == secondIndexY && (playerT && checkIfWhite(piece) || !playerT && checkIfBlack(piece)) ){
                        // console.log("exit in last")
                        return false;
                    }
                    else if (i != secondIndexY) {
                    // console.log("exit")
                    return false;
                    }
                }
            }
            return true;
        }
        else {
            for (let i = firstIndexY - 1; i >= secondIndexY; i --){
                let piece = boardArr[i][firstIndexX];
                if (piece != 0){
                    if(i == secondIndexY && (playerT && checkIfWhite(piece) || !playerT && checkIfBlack(piece)) ){
                        // console.log("exit in last")
                        return false;
                    }
                    else if (i != secondIndexY) {
                    // console.log("exit")
                    return false;
                    }
                }
            }
            return true;
        }
        }
    else {
        if (firstIndexX < secondIndexX){
            for (let i = firstIndexX+1; i <= secondIndexX; i ++){
                let piece = boardArr[firstIndexY][i];
                if (piece != 0){
                    if(i == secondIndexX && (playerT && checkIfWhite(piece) || !playerT && checkIfBlack(piece)) ){
                        // console.log("exit in last")
                        return false;
                    }
                    else if (i != secondIndexX) {
                    // console.log("exit")
                    return false;
                    }
                }
            }
            return true;
        }
        else {
            for (let i = firstIndexX - 1; i >= secondIndexX; i --){
                let piece = boardArr[firstIndexY][i];
                if (piece != 0){
                    if(i == secondIndexX && (playerT && checkIfWhite(piece) || !playerT && checkIfBlack(piece)) ){
                        console.log("exit in last")
                        return false;
                    }
                    else if (i != secondIndexX) {
                    console.log("exit")
                    return false;
                    }
                }
            }
            return true;
        }
    }
}

function calculateKnight(firstIndexY, firstIndexX, secondIndexY, secondIndexX,playerType){
    let playerT;
    if (playerType == 11) playerT = true;
    else playerT = false;
    let piece = boardArr[secondIndexY][secondIndexX];
    if ((playerT && checkIfWhite(piece) || !playerT && checkIfBlack(piece)) || piece == 0){
        take(firstIndexY, firstIndexX, secondIndexY, secondIndexX)
    }
}

function calculateBishop(firstIndexY, firstIndexX, secondIndexY, secondIndexX, playerType){

    // console.log(firstIndexY, firstIndexX);
    // console.log(secondIndexY, secondIndexX);
    let playerT;
    if (playerType == 1) playerT = true;
    else playerT = false;
    
    if (firstIndexY < secondIndexY && firstIndexX < secondIndexX){
       let y = firstIndexY + 1;
       for (let x = firstIndexX + 1; x <= secondIndexX; x++){
        let piece = boardArr[y][x];
        if (piece != 0){
            console.log("defenatly here")
            if(x == secondIndexX && (playerT && checkIfWhite(piece) || !playerT && checkIfBlack(piece)) ){
                return false;
            }
            else if (x != secondIndexX){
                return false;
            }
        }
        y+=1;
       }
       return true;
    }
    else if (firstIndexY < secondIndexY && firstIndexX > secondIndexX){
        let y = firstIndexY + 1;
       for (let x = firstIndexX - 1; x >= secondIndexX; x--){
        let piece = boardArr[y][x];
        if (piece != 0){
            console.log("defenatly here")
            if(x == secondIndexX && (playerT && checkIfWhite(piece) || !playerT && checkIfBlack(piece)) ){
                return false;
            }
            else if (x != secondIndexX){
                return false;
            }
        }
        y+=1;
       }
       return true;
    }
    else if (firstIndexY > secondIndexY && firstIndexX > secondIndexX){
        let y = firstIndexY - 1;
        for (let x = firstIndexX - 1; x >= secondIndexX; x--){
         let piece = boardArr[y][x];
         if (piece != 0){
             if(x == secondIndexX && (playerT && checkIfWhite(piece) || !playerT && checkIfBlack(piece)) ){
                 return false;
             }
             else if (x != secondIndexX){
                 return false;
             }
         }
         y-=1;
        }
        return true;
    }
    else {
        let y = firstIndexY - 1;
       for (let x = firstIndexX + 1; x <= secondIndexX; x++){
         let piece = boardArr[y][x];
         if (piece != 0){
             if(x == secondIndexX && (playerT && checkIfWhite(piece) || !playerT && checkIfBlack(piece)) ){
                 return false;
             }
             else if (x != secondIndexX){
                 return false;
             }
         }
         y-=1;
        }
        return true;
    }

}

function calculateKing(firstIndexY, firstIndexX, secondIndexY, secondIndexX, playerType){
    let playerT;
    if (playerType == 11) playerT = true;
    else playerT = false;
    let piece = boardArr[secondIndexY][secondIndexX];
    if (Math.abs(firstIndexY - secondIndexY) == 1){
        if (piece != 0){
            if(!(playerT && checkIfWhite(piece) || !playerT && checkIfBlack(piece))) return;
        }
            take(firstIndexY, firstIndexX, secondIndexY, secondIndexX)
        
        
    }
    else if (Math.abs(firstIndexX - secondIndexX) == 1){
        if (piece != 0){
            if(!(playerT && checkIfWhite(piece) || !playerT && checkIfBlack(piece))) return;
        }
        take(firstIndexY, firstIndexX, secondIndexY, secondIndexX)
        
    }
}