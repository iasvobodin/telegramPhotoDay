exports.getUser = info => {
    console.log(info, 'FROM HELPERS');
    const { id, is_bot: isBot, first_name: firstName, last_name: lastName } = info
    const name = (firstName ? firstName : '' + ' ' + lastName ? lastName : '').trim()
    return { id, isBot, name }
}