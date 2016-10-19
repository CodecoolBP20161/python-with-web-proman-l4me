var storage = new StorageState();

function nextId(){
    //implement auto-increment
    num = localStorage.getItem('nextId');
    if (num === null){
        num = 0;
    } else {
        num = parseInt(num) + 1;
    };
    localStorage.setItem('nextId', JSON.stringify(num));
    return num;
}

function colourPicker(num){
    //rotate tile colours
    switch(num){
        case 0: return 'tile-blue'; break;
        case 1: return 'tile-green'; break;
        case 2: return 'tile-red'; break;
        case 3: return 'tile-lime'; break;
        case 4: return 'tile-purple'; break;
        case 5: return 'tile-pink'; break;
    };
};

function ajaxRequest(requestURL){
    return $.ajax({
        async: false,
        url: requestURL,
        dataType: 'json'
    });
}

displayBoards(storage.getBoards(), storage);
