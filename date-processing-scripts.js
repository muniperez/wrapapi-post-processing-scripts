let type1 = "3 de Janeiro de 2018"

const parseMonth = (monthPT) => {

  switch(monthPT) {
    case 'janeiro':
      return 1;
    case 'fevereiro':
        return 2;
    case 'março':
        return 3;
    case 'abril':
        return 4;
    case 'maio':
        return 5;
    case 'junho':
      return 6;
    case 'julho':
        return 7;
    case 'agosto':
        return 8;
    case 'setembro':
        return 9;
    case 'outubro':
        return 10;
    case 'novembro':
      return 11;
    case 'dezembro':
      return 12;
    default:
      return 1 + new Date().getMonth();
  }
}

const parseDate = (date) => {

  if(date)  {
    let splitDate = date.split(" ");
    let day = splitDate[0]
    let month = parseMonth(splitDate[2].toLowerCase());
    let year = splitDate[4]
    let currentDate = new Date();
    let hoursAndMinutes = currentDate.getHours() + ':' + currentDate.getMinutes();
    let correctedDate = `${month}/${day}/${year}`;
    let dateTime = `${correctedDate} ${hoursAndMinutes}`;
    return new Date(dateTime).toString();
  }

  return new Date().toString();
}
