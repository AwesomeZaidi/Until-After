var $status = $('#status'),
    $journalEntryBox = $('#journalEntryBox'),
    timeoutId;

$journalEntryBox.keypress(function () {
    $status.attr('class', 'pending').text('Auto Saving...');
    
    // If a timer was already started, clear it.
    if (timeoutId) clearTimeout(timeoutId);
    
    // Set timer that will save comment when it fires.
    timeoutId = setTimeout(function () {
        // Make ajax call to save data.

        let formData = $('form').serializeArray(),
        len = formData.length,
        dataObj = {};
        
        for (i=0; i<len; i++) {
            dataObj[formData[i].name] = formData[i].value;
        }
        console.log("dataObj:", dataObj);
        
        
        // console.log(dataObj['entry']);
        // console.log(dataObj['entry']);
        // const data = new FormData($journalEntryBox);
        // console.log("data", data.get('entry'));
        
        axios({
            method: 'put',
            url: '/saveJournalEntry',
            data: {entry : dataObj['entry'], journalId : dataObj['journalId'], entryIndex : dataObj['entryIndex'] },
        })
        .then(() => {
            $status.attr('class', 'saved').text('Saved!');
        }).catch((err) => {
            console.log(err);
        })
    }, 750);
});