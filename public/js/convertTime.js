function convert(input) {
    const time =  moment(input, 'HH:mm:ss').format('h:mm:ss A');
    return time;
}

console.log(convert('20:00:00'));
console.log(convert('08:00:00'));
console.log(convert('16:30:00'));