export class GetUserDevice {
    public referrerUrl: { referrer: string } = { referrer: "" };
    public entryPath: { entryPath: string } = { entryPath: "" };
  
    constructor() {
      if (typeof window !== "undefined" && document) {
        this.referrerUrl = { referrer: document.referrer };
        this.entryPath = {
          entryPath: document.location.pathname, // Use pathname directly
        };
      }
    }
  
    private getBrowserDetails() {
      if (typeof navigator === "undefined") return { browser: "", os: "", platform: "" };
  
      const userAgent = navigator.userAgent;
      const platform = navigator.platform;
  
      let browserName = "";
      let osName = "";
      let platformType = "";
  
      // Detecting browser
      if (userAgent.includes("Chrome") && !userAgent.includes("Edg/")) {
        browserName = "Chrome";
      } else if (userAgent.includes("Firefox")) {
        browserName = "Firefox";
      } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
        browserName = "Safari";
      } else if (userAgent.includes("Edg/")) {
        browserName = "Edge";
      } else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
        browserName = "Internet Explorer";
      }
  
      // Detecting OS
      if (platform.includes("Win")) {
        osName = "Windows";
      } else if (platform.includes("Mac")) {
        osName = "MacOS";
      } else if (platform.includes("Linux")) {
        osName = "Linux";
      } else if (/iPhone|iPad|iPod/.test(platform)) {
        osName = "iOS";
      } else if (platform.includes("Android")) {
        osName = "Android";
      }
  
      // Detecting platform (Mobile, Tablet, Desktop, or Bot)
      if (/mobile/i.test(userAgent)) {
        platformType = "Mobile";
      } else if (/tablet/i.test(userAgent) || (/iPad/i.test(userAgent) && !/Mobile/i.test(userAgent))) {
        platformType = "Tablet";
      } else if (/bot|crawl|spider/i.test(userAgent)) {
        platformType = "Bot";
      } else {
        platformType = "Desktop"; // Default to Desktop if it's neither Mobile, Tablet, nor Bot
      }
  
      return { browser: browserName, os: osName, platform: platformType };
    }
  
    public getTrackData() {
      const { browser, os, platform } = this.getBrowserDetails(); // Get all details
      return [
        { browser, os, platform },  // Browser, OS, and platform (Mobile/Desktop/Tablet/Bot)
        this.entryPath,
        this.referrerUrl,
      ];
    }
  }
  