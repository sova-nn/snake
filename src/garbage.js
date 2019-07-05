//функция для расчета следующей координаты при движении
moveCoords = (coords, direction) => {
    let x = coords[0];
    let y = coords[1];

    //проверку координаты нужно перенести в отдельную логику
    switch (x) {
        case (9):
            switch(y) {
                case (9):
                    alert('игра окончена');
                    break;
                default:
                    y += 1;
                    break;
            }
            break;
        default:
            x += 1;
            break;
    }
    const newCoords = [x,y];
    console.log(newCoords);
    return newCoords;
}