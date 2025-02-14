export function debounce(callback: any, delay: number) {
  let timeoutId: string | number | NodeJS.Timeout | undefined;

  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
}

export function checkCookiePermission() {
  let cookieEnabled = navigator.cookieEnabled;
  if (!cookieEnabled) {
    document.cookie = "testcookie";
    cookieEnabled = document.cookie.indexOf("testcookie") != -1;
  }
  return cookieEnabled;
}

export async function createSession(uID: string | null) {
  try {
    await fetch("/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: uID,
      }),
    });
  } catch (error) {
    console.log(error, "error while fetching...");
  }
}

export async function getLocationDetails() {
    try {
      const res = await fetch("/api/location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!res.ok) {
        return {};
      }
  
      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      console.error("Something went wrong:", err);
      return {};
    }
  }
  
export const getCookie = (name: string) => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }
  return null;
};
