import Card from "./_components/Card";

export default async function Home() {
  return (
    <main className="">
      <div>
        <Card>
          <div>
            <h1 className="text-[32px] font-bold">
              Please mark your interests!
            </h1>
          </div>
          <div className="my-[40px]">
            <p>We will keep you notified.</p>
          </div>
          <div className="text-left">
            <p>My saved interests!</p>
          </div>
        </Card>
      </div>
    </main>
  );
}

// async function CrudShowcase() {
//   const latestPost = await api.post.getLatest();

//   return (
//     <div className="w-full max-w-xs">
//       {latestPost ? (
//         <p className="truncate">Your most recent post: {latestPost.name}</p>
//       ) : (
//         <p>You have no posts yet.</p>
//       )}

//       <CreatePost />
//     </div>
//   );
// }
