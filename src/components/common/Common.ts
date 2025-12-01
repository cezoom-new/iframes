export function debounce(callback: any, delay: number) {
    let timeoutId: string | number | NodeJS.Timeout | undefined;
  
    return function () {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, delay);
    };
  }

    export function detectColorType(
      input: string
    ): "hex" | "gradient" | "string" | "unknown" {
      const trimmed = input?.trim() || "";

      const hexRegex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
      const gradientRegex = /^linear-gradient\((.+)\)$/i;

      if (hexRegex.test(trimmed)) return "hex";
      if (gradientRegex.test(trimmed)) return "gradient";

      return "unknown";
    }
  