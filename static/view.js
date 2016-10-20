function displayBoards(boards, storage){
    //reset content
    document.getElementById("boards_div").innerHTML = "";

    if (boards){
        for(var i in boards){
            if(document.getElementById(boards[i].id) === null){
                //load board
                var currentBoard = boards[i].id;

                //board tile
                var colDiv = document.createElement('div');
                colDiv.id = currentBoard;
                colDiv.className = 'col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2';

                //board panel
                var panelDiv = document.createElement('div');
                panelDiv.className =  'panel panel-default ';

                //delete button
                var remove = document.createElement('span');
                remove.className = 'right-icon glyphicon glyphicon-remove';
                remove.setAttribute('onclick', 'storage.deleteBoard("' + currentBoard + '")');

                //edit button
                var edit = document.createElement('span');
                edit.className = 'right-icon glyphicon glyphicon-pencil';
                edit.setAttribute('onclick', 'displayCards(storage.getCardsByBoard(' + currentBoard + '), storage, "' + currentBoard + '", "no-edit")');

                //board content
                var panelHead = document.createElement('div');
                panelHead.className = colourPicker(i % 6) + ' panel-heading';
                panelHead.innerHTML = boards[i].title;

                //update html
                panelHead.appendChild(remove);
                panelHead.appendChild(edit);
                panelDiv.appendChild(panelHead);
                colDiv.appendChild(panelDiv);
                document.getElementById("boards_div").insertBefore(colDiv, document.getElementById("boards_div").firstChild);
            };
        };
    };
    newButton("boards", storage);
};

function displayCards(cards, storage, boardID, editID){
    //reset content
    document.getElementById("boards_div").innerHTML = "";

    //board tile
    var colDiv = document.createElement('div');
    colDiv.className = 'col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2';

    //board panel
    var panelDiv = document.createElement('div');
    panelDiv.className = 'panel panel-default';

    //board content
    var panelHead = document.createElement('div');
    panelHead.className = colourPicker(storage.getBoard(boardID).colour) + ' panel-heading';

    //back button
    var backBtn = document.createElement('span');
    backBtn.className = 'glyphicon glyphicon-chevron-left';
    backBtn.id = 'back-button';
    backBtn.setAttribute('onclick', 'displayBoards(storage.getBoards(), storage)');

    //cards container
    var panelBody = document.createElement('div');
    panelBody.className ='panel-body';
    panelBody.id = 'card-list'

    //cards list
    var listFrame = document.createElement('ul');
    listFrame.className = 'list-group';
    if (cards) {
        for(var i in cards) {
            if (cards[i].id === parseInt(editID)){
                listFrame.insertBefore(editTitle(boardID, cards[i]), listFrame.firstChild);
            } else {
                //cards content
                var listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.innerHTML = cards[i].title;

                //delete button
                var remove = document.createElement('span');
                remove.className = 'right-icon glyphicon glyphicon-remove';
                remove.setAttribute('onclick', 'storage.deleteCard("' + boardID + '", "' + cards[i].id + '")');

                //edit button
                var edit = document.createElement('span');
                edit.className = 'right-icon glyphicon glyphicon-pencil';
                edit.setAttribute('onclick', 'displayCards(storage.getCardsByBoard(' + boardID + '), storage,  "' + boardID + '", "' + cards[i].id + '")');

                //insert card to list
                listItem.appendChild(remove);
                listItem.appendChild(edit);
                listFrame.insertBefore(listItem, listFrame.firstChild);
            };
        };
    };

    //update html
    panelHead.appendChild(backBtn);
    panelHead.innerHTML += storage.getBoard(boardID).title;
    panelBody.appendChild(listFrame);
    panelDiv.appendChild(panelHead);
    panelDiv.appendChild(panelBody);
    colDiv.appendChild(panelDiv);
    document.getElementById("boards_div").appendChild(colDiv);
    document.body.setAttribute('onkeydown', "if (event.keyCode == 8 &&\
                               document.getElementById('plus'))\
                               document.getElementById('back-button').click()");
    if (editID === 'no-edit'){
        newButton(boardID, storage);
    } else {
        document.getElementById("edit-title").focus();
    };
};

function getRemoveButton(type, boardID){
    var removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'btn btn-secondary';
    if(type === 'save'){
        removeButton.id = 'remove-button';
        removeButton.setAttribute('onclick', 'newButton("' + boardID + '", "storage")');
    } else {
        removeButton.id = 'remove-edit';
        removeButton.setAttribute('onclick', 'displayCards(storage.getCardsByBoard(' + boardID + '), storage, "' + boardID + '", "no-edit")');
    }
    return removeButton;
}

function getSaveButton(type, boardID, cardID){
    var saveButton = document.createElement('button');
    saveButton.type = 'button';
    saveButton.className = 'btn btn-primary';
    saveButton.innerHTML = 'Save';
    if (type === 'save'){
        saveButton.id = 'save-button';
        if (boardID === 'boards'){
            saveButton.setAttribute('onclick', 'storage.saveBoard()');
        } else {
            saveButton.setAttribute('onclick', 'storage.saveCard("' + boardID + '")');
        };
        saveButton.disabled = true;
    } else {
        saveButton.id = 'save-edit';
        saveButton.setAttribute('onclick', 'storage.editCard("' + boardID + '", "' + cardID + '")');
    };
    return saveButton;
};

function getInputField(type, card){
    var inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.className = 'form-control';
    if (type === 'save'){
        inputField.id = 'title';
        inputField.setAttribute('onkeydown', "if (event.keyCode == 13) {document.getElementById('save-button').click();}\
                                else if (event.keyCode == 27) {document.getElementById('remove-button').click();}");
        inputField.setAttribute('onkeyup', 'checkAvailable("title")');
    } else {
        inputField.id = 'edit-title';
        inputField.value = card.title;
        inputField.setAttribute('onkeydown', "if (event.keyCode == 13) {document.getElementById('save-edit').click();}\
                                else if (event.keyCode == 27) {document.getElementById('remove-edit').click();}");
        inputField.setAttribute('onkeyup', 'checkAvailable("edit-title")');
    };
    return inputField;
};

function createTitle(storage, buttonType){
    //replace new button
    var removeable = document.getElementById(buttonType);
    if (removeable !== null){
        removeable.outerHTML = '';
    }

    //remove icon
    var remove = document.createElement('span');
    remove.className = 'glyphicon glyphicon-remove';

    //remove button
    var removeButton = getRemoveButton('save', buttonType);

    //create button
    var saveButton = getSaveButton('save', buttonType);

    //button placing
    var buttonSpan = document.createElement('span');
    buttonSpan.className = 'input-group-btn';

    //input for create
    var inputField = getInputField('save');

    //form placing
    var inputDiv = document.createElement('div');
    inputDiv.className = 'input-group';

    //form panel
    var inputPanel = document.createElement('div');
    inputPanel.className = 'panel panel-default';

    //update html
    removeButton.appendChild(remove);
    buttonSpan.appendChild(saveButton);
    buttonSpan.appendChild(removeButton);
    inputDiv.appendChild(inputField);
    inputDiv.appendChild(buttonSpan);
    inputPanel.appendChild(inputDiv);
    if (buttonType !== 'boards'){
        var inputFrame = inputPanel;
        inputFrame.id = buttonType;
        var appendTo = document.getElementById('card-list');
    } else {
        var inputFrame = document.createElement('div');
        inputFrame.className = 'col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2';
        inputFrame.id = buttonType;
        inputFrame.appendChild(inputPanel);
        var appendTo = document.getElementById('boards_div');
    };
    appendTo.appendChild(inputFrame);
    document.getElementById("title").focus();

};

function checkAvailable(input) {
    //input validator
    if (input === "title") {
        var button = document.getElementById('save-button');
    } else {
        var button = document.getElementById('save-edit');
    };
    if (document.getElementById(input).value !== ''){
        button.disabled = false;
    } else {
        button.disabled = true;
    };
};

function newButton(buttonType, storage){
    //replace create form
    removeable = document.getElementById(buttonType);
    if (removeable !== null){
        removeable.outerHTML = '';
    }

    //new button icon
    var plus = document.createElement('span');
    plus.className = 'glyphicon glyphicon-plus';

    //new button
    var plusButton = document.createElement('button');
    plusButton.type = 'button';
    plusButton.className = 'btn btn-info btn-primary btn-block';
    plusButton.id = 'plus';

    //new button placing
    var plusPanel = document.createElement('div');
    plusPanel.className = 'panel panel-default';

    //update html
    plusButton.appendChild(plus);
    plusPanel.appendChild(plusButton);
    if (buttonType !== 'boards'){
        var plusFrame = plusPanel;
        plusFrame.id = buttonType;
        var appendTo = document.getElementById('card-list');

    } else {
        var plusFrame = document.createElement('div');
        plusFrame.id = buttonType;
        plusFrame.className = 'col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2';
        plusFrame.appendChild(plusPanel);
        var appendTo = document.getElementById('boards_div');
    };
    plusFrame.setAttribute('onclick', 'createTitle("storage", "' + buttonType + '")');
    appendTo.appendChild(plusFrame);
    document.body.setAttribute('onkeyup', "if (event.keyCode == 73 && document.getElementById('" + buttonType + "')) document.getElementById('" + buttonType + "').click()");

};

function editTitle(boardID, card){
    //remove icon
    var remove = document.createElement('span');
    remove.className = 'glyphicon glyphicon-remove';

    //remove button
    var removeButton = getRemoveButton('edit', boardID);

    //create button
    var saveButton = getSaveButton('edit', boardID, card.id);

    //button placing
    var buttonSpan = document.createElement('span');
    buttonSpan.className = 'input-group-btn';

    //input for create
    var inputField = getInputField('edit', card);

    //form placing
    var inputDiv = document.createElement('div');
    inputDiv.className = 'input-group';

    //form panel
    var inputPanel = document.createElement('div');
    inputPanel.className = 'panel panel-default edit-title';

    //update html
    removeButton.appendChild(remove);
    buttonSpan.appendChild(saveButton);
    buttonSpan.appendChild(removeButton);
    inputDiv.appendChild(inputField);
    inputDiv.appendChild(buttonSpan);
    inputPanel.appendChild(inputDiv);
    return inputPanel;
};
