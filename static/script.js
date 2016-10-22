var storage = new StorageState();

function nextId(){
    //implement auto-increment
    num = localStorage.getItem('nextId');
    num = num === null ? 0 : parseInt(num) + 1;
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
    });
};

function checkAvailable(input) {
    //input validator
    var button = input === "title" ? document.getElementById('save-button') : document.getElementById('save-edit');
    button.disabled = document.getElementById(input).value.replace( /\s/g, "") !== '' ? false : true;
};

function hotkeyFunction(boardID){
    if (event.keyCode == 8){
        if (document.getElementById('confModal').className === 'modal fade in'){
            document.getElementById('close-modal').click();
        } else if (document.getElementById('plus')){
            document.getElementById('back-button').click();
        };
    } else if (event.keyCode == 73 && document.getElementById(boardID) && document.getElementById('confModal').className === 'modal fade'){
        document.getElementById(boardID).click();
    } else if (event.keyCode == 13 && document.getElementById('confModal').className === 'modal fade in'){
        document.getElementById('confDelButton').click();
    };
};

displayBoards(storage.getBoards(), storage);
