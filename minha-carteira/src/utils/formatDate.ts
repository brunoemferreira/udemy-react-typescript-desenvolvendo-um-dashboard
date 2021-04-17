const formatDate = (date: string): string => {
  const dateFormatted = new Date(date);
  
  const day = dateFormatted.getDate() > 9 ? dateFormatted.getDate() : `0${dateFormatted.getDate()}`;
  

  const month = (dateFormatted.getMonth()) > 9 ? dateFormatted.getMonth() : `0${dateFormatted.getMonth()}`;
  
  
  const year = dateFormatted.getFullYear();

  // Retorna a data formatada
  return `${day}/${month}/${year}`;

}

export default formatDate;