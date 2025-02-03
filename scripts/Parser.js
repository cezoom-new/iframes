import csv from "csv-parser";
import fs from "fs";

const convertToJson = () => {
  const results = {};
  const adjs = [];

  fs.createReadStream("/home/gopi/gopi-carestack-iframe/cs-account-info.csv")
    .pipe(csv())
    .on("data", (data) => {
      for (const adj of data.Subscriptions.trim().split(",")) {
        if (!adjs.includes(adj)) {
          adjs.push(adj);
        }
      }

      if (data.DomainName !== "NULL") {
        results[data.DomainName] = {
          subscriptions: [
            {
              adjacencyName: "us-pms",
              subscriptionStatus: data.Subscriptions.trim()
                .split(",")
                .includes("US_PMS"),
            },
            {
              adjacencyName: "cs-conversation",
              subscriptionStatus: data.Subscriptions.trim()
                .split(",")
                .includes("CS_CONVERSATION"),
            },
            {
              adjacencyName: "rcm",
              subscriptionStatus: data.Subscriptions.trim()
                .split(",")
                .includes("RCM"),
            },
            {
              adjacencyName: "virtual-assistant",
              subscriptionStatus: data.Subscriptions.trim()
                .split(",")
                .includes("Virtual_Assistant"),
            },
          ],
          locations: parseInt(data.locationCount),
          region: data.Region,
        };
      }
    })
    .on("end", () => {
      console.log(JSON.stringify(results))
    });
};

convertToJson();
