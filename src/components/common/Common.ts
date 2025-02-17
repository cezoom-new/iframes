export function debounce(callback: any, delay: number) {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
  
    return function () {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, delay);
    };
  }
  