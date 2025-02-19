"use client";

export default async function triggerISR(props: any) {
  if (!props.draft) return;

  if (props.type == "viewport") {
    console.log(
      `Revalidating ... ${props?.published?.selectedLayout}/[customer]`
    );

    await fetch(`${process.env.PROJECT_URL}/api/revalidate`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${process.env.TOKEN}`,
      },
      method: "POST",
      body: JSON.stringify({ tag: props?.published?.selectedLayout }),
    });

    console.log(
      `Revalidated ... ${props?.published?.selectedLayout}/[customer]`
    );
  }
  if (props.type == "campaign") {
    console.log(`Revalidating ... ${props.draft._id.split(".")[1]}`);

    await fetch(`${process.env.PROJECT_URL}/api/revalidate`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${process.env.TOKEN}`,
      },
      method: "POST",
      body: JSON.stringify({ tag: props.draft._id.split(".")[1] }),
    });

    console.log(`Revalidated ... ${props.draft._id.split(".")[1]}`);
  }
}
