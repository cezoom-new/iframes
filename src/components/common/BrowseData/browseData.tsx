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
      if (typeof navigator === "undefined") return { browser: "", os: "" };
  
      const userAgent = navigator.userAgent;
      const platform = navigator.platform;
  
      let browserName = "";
      let osName = "";
  
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
  
      return { browser: browserName, os: osName };
    }
  
    public getTrackData() {
        const { os } = this.getBrowserDetails(); // Get the platform (os) directly from getBrowserDetails
        return [
          this.getBrowserDetails(), 
          this.entryPath, 
          this.referrerUrl, 
          { platform: os } // Include platform in the data
        ];
      }
    }