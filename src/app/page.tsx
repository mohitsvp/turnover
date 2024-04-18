"use client";

import { useEffect, useState } from "react";
import Card from "./_components/Card";
import CheckboxList from "./_components/CheckboxList";
import { api } from "@/trpc/react";
import Pagination from "./_components/Pagination";

interface Interest {
  id: number;
  label: string;
  checked: boolean;
}

export default function Home() {
  const { data: categories, isLoading } = api.category.getAll.useQuery();
  const [interests, setInterests] = useState<Interest[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    if (categories) {
      setInterests(
        categories.map((category) => ({
          id: category.id,
          label: category.name,
          checked: false,
        })),
      );
    }
  }, [categories]);

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

  // Calculate current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = interests.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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
            {currentItems.map((interest, index) => (
               <CheckboxList
               key={interest.id}
               label={interest.label}
               checked={interest.checked}
               onChange={handleCheckboxChange(interest.id - 1)}
             />
            ))}
          </div>
          <div>
            <Pagination
              totalItems={interests.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
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
