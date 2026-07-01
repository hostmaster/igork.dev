export async function onRequest(context) {
  const response = await context.next();

  const contentType = response.headers.get("content-type") || "";
  const email = context.env.CONTACT_EMAIL;
  if (!email || !contentType.includes("text/html")) return response;

  return new HTMLRewriter()
    .on("#contact-email", {
      element(el) {
        el.setAttribute("href", `mailto:${email}`);
        el.setInnerContent(email);
      },
    })
    .transform(response);
}
