"use client"

import { useState } from "react";
import Card from "./_components/Card";
import CheckboxList from "./_components/CheckboxList";

interface Interest {
  id: number;
  label: string;
  checked: boolean;
}


export default function Home() {

  const [interests, setInterests] = useState<Interest[]>([
    { id: 1, label: 'Shoes', checked: false },
    { id: 2, label: 'Hats', checked: false },
    { id: 3, label: 'Watches', checked: false },
    // Add more interests as needed
  ]);

  const handleCheckboxChange = (index: number) => (isChecked: boolean) => {
    const newInterests = interests.map((interest, i) => {
      if (i === index) {
        return { ...interest, checked: isChecked };
      }
      return interest;
    });
    setInterests(newInterests);
    console.log(`Toggled ${interests[index]?.label}, checked: ${isChecked}`);
  };

  return (
    <main>
      <Card>
        <div>
          <h1 className="text-[32px] font-bold">Please mark your interests!</h1>
        </div>
        <div className="my-[40px]">
          <p>We will keep you notified.</p>
        </div>
        <div className="text-left">
          <p>My saved interests!</p>
          <div className="my-[20px]">
            {interests.map((interest, index) => (
              <CheckboxList
                key={interest.id}
                label={interest.label}
                checked={interest.checked}
                onChange={handleCheckboxChange(index)}
              />
            ))}
          </div>
        </div>
      </Card>
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
