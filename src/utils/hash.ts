import bcrypt from 'bcrypt';

export const createStringHash = async (string: string): Promise<string> => {
  const salt = await bcrypt.genSalt(12);
  const stringHash = await bcrypt.hash(string, salt);
  return stringHash;
};

export const compareStringHash = async (
  string: string,
  stringToCompare: string
): Promise<boolean> => {
  const compareResult = await bcrypt.compare(string, stringToCompare);
  return compareResult;
};
