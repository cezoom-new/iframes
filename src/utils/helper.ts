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

export async function createSession(uID: string | null,locationData:any) {
  try {
    await fetch("/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${process.env.TOKEN}`,
      },
      body: JSON.stringify({
        userId: uID,
        locationData
      }),
    });
  } catch (error) {
    console.log(error, "error while fetching...");
  }
}


export async function getLocationDetails() {
  try {
    const res = await fetch(`/api/location`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${process.env.TOKEN}`,
      },
    });
    if (!res.ok) {
      return {};
    } else {
      const data = await res.json();
      return data;
    }
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


export const getMethod = async (url:string) => {
    try {
      const res = await fetch(`${process.env.PROJECT_URL}${url}`, {
        method: "GET",
        headers: {
          'Authorization': `${process.env.TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      if (!res?.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      } else {
        const data = await res.json();
        return data?.data ?? null;
      }
    } catch (error: any) {
      console.error({ error });
      throw new Error(error);
    }
}