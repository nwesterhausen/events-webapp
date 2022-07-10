export const SaveBlob = (blob: Blob, fileName: string) => {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
};

export const SaveJson = (json: any, fileName: string) => {
  const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
  return SaveBlob(blob, fileName);
};
