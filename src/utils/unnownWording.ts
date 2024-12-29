export const unknownWording = (string: string | undefined) => {
  return !string || string === 'unknown' ? 'No definida' : string;
};
