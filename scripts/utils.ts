function isEntryPoint(fileName: string) {
  return process.argv[1] === fileName;
}

export { isEntryPoint };
