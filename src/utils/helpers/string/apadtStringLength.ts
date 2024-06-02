export function apadtStringLength(inputStr : string | null) : string{
  let result = ""
  const maxLength = 20;

  if(!inputStr)
    return "";

  if(inputStr.length <= maxLength)
    result = inputStr;
  else {
    result = inputStr.slice(0, (maxLength - 1) - 3);
    result += "...";
  }


  return result;
}