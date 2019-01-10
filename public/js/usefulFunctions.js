function copyText(id) {
    var copyText = document.getElementById(id);
    console.log(copyText);
    copyText.select();
    document.execCommand("copy");
}