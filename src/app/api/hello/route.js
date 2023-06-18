console.log(1);
export async function GET(request) {
  // console.log(request);
  console.log(2);
  return new Response("Hello, Next.js!");
}
