export const convertFamilyToParam = (family: string) => {
  // replace space with +
  return family.replace(/ /g, '+');
}

export const convertParamToFamily = (family: string) => {
  // replace + with space
  return family.replace(/\+/g, ' ');
}