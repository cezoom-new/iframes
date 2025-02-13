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
    const res = await fetch("/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: uID,
      }),
    });

    if (!res.ok) {
      console.log("something went wrong");
    } else {
      const data = await res.json();
      console.log(data, "session data is heree..");
    }
  } catch (error) {
    console.log(error, "error while fetching...");
  }
}
