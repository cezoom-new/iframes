"use client";

export default async function triggerISR(props: any) {
  if (!props.draft) return;

  if (props.type == "viewport") {
    console.log(
      `Revalidating ... ${props.draft.dimensionValue.current}/[customer]`
    );

    await fetch(`${process.env.PROJECT_URL}/api/revalidate`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${process.env.TOKEN}`,
      },
      method: "POST",
      body: JSON.stringify({ tag: props.draft.dimensionValue.current }),
    });

    console.log(
      `Revalidated ... ${props.draft.dimensionValue.current}/[customer]`
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
