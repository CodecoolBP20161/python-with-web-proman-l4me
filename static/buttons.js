function createTitle(buttonType){
    //replace new button
    var removeable = document.getElementById(buttonType);
    if (removeable !== null){
        removeable.outerHTML = '';
    }

    //remove icon
    var remove = document.createElement('span');
    remove.className = 'glyphicon glyphicon-remove';

    //remove button
    var removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'btn btn-secondary';
    removeButton.id = 'remove-button';
    removeButton.setAttribute('onclick', 'newButton("' + buttonType + '")');

    //create button
    var saveButton = document.createElement('button');
    saveButton.type = 'button';
    saveButton.className = 'btn btn-primary';
    saveButton.id = 'save-button';
    if (buttonType === 'boards'){
        saveButton.setAttribute('onclick', 'saveBoard()');
    } else {
        saveButton.setAttribute('onclick', 'saveCard("' + buttonType + '")');
    }
    saveButton.disabled = true;
    saveButton.innerHTML = 'Save';

    //button placing
    var buttonSpan = document.createElement('span');
    buttonSpan.className = 'input-group-btn';

    //input for create
    var inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.className = 'form-control';
    inputField.id = 'title';
    inputField.setAttribute('onkeydown', "if (event.keyCode == 13) {document.getElementById('save-button').click();}\
                            else if (event.keyCode == 27) {document.getElementById('remove-button').click();}");

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
    inputField.setAttribute('onkeyup', 'checkAvailable()');
    document.getElementById("title").focus();

};

function checkAvailable() {
    //input validator
    var button = document.getElementById('save-button');
    if (document.getElementById('title').value !== ''){
        button.disabled = false;
    } else {
        button.disabled = true;
    };
};

function newButton(buttonType){
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
    plusFrame.setAttribute('onclick', 'createTitle("' + buttonType + '")');
    appendTo.appendChild(plusFrame);
    document.body.setAttribute('onkeyup', "if (event.keyCode == 73) document.getElementById('" + buttonType + "').click()");

};
