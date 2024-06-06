type Namespaces = "techRushTestProducts";

const kv = await Deno.openKv();

const msToDaysFactor = 1000 * 60 * 60 * 24;
const keyExpirationMs = msToDaysFactor * 2;

const previousKey = "previous";

const getDateTimeStorageString = (date: Date) => date.toISOString();

export const saveResult = async <T extends Record<string, unknown>>(
  namespace: Namespaces,
  data: T,
) => {
  await Promise.all([
    kv.set([namespace, "history", getDateTimeStorageString(new Date())], data, {
      expireIn: keyExpirationMs,
    }),
    kv.set([namespace, previousKey], data),
  ]);
};

export const getPreviousResult = async <T extends Record<string, unknown>>(
  namespace: Namespaces,
): Promise<T | null> => {
  const result = await kv.get<T>([namespace, previousKey]);
  return result.value;
};
