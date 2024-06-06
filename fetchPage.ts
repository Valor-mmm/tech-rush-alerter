export const fetchPage = async (url: string): Promise<string> => {
  const fetchResult = await fetch(url);
  return await fetchResult.text();
};
