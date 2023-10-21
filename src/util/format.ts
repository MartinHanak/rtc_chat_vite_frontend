export function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return bytes + " B";
  } else if (bytes < 1024 * 1024) {
    return (bytes / 1024).toFixed(2).replace(/\.?0+$/, "") + " KB";
  } else if (bytes < 1024 * 1024 * 1024) {
    return (bytes / (1024 * 1024)).toFixed(2).replace(/\.?0+$/, "") + " MB";
  } else {
    return (
      (bytes / (1024 * 1024 * 1024)).toFixed(2).replace(/\.?0+$/, "") + " GB"
    );
  }
}
