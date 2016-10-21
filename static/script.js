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
};

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
    });;
};

function bSpaceHotkey(){
    if (event.keyCode == 8){
        if (document.getElementById('confModal').className === 'modal fade' && document.getElementById('plus')){
            document.getElementById('back-button').click();
        } else if (document.getElementById('confModal').className === 'modal fade in'){
            document.getElementById('close-modal').click();
        };
    };
};

function iHotkey(boardID){
    if (event.keyCode == 73 && document.getElementById(boardID) && document.getElementById('confModal').className === 'modal fade'){
        document.getElementById(boardID).click();
    };
};

displayBoards(storage.getBoards(), storage);
