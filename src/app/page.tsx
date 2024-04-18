"use client";

import React, { useContext, useEffect, useState } from "react";
import Card from "./_components/Card";
import CheckboxList from "./_components/CheckboxList";
import { api } from "@/trpc/react";
import Pagination from "./_components/Pagination";
import { AuthContext } from "./_context/AuthContext";

interface Interest {
  id: number;
  label: string;
  checked: boolean;
}

interface userInterest {
  id : number;
  categoryId : number;
  userId : number;
}

export default function Home() {
  const { data: categories, isLoading } = api.category.getAll.useQuery();
  const [interests, setInterests] = useState<Interest[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userInterests, setUserInterests] = useState<userInterest[]>([]);
  const itemsPerPage = 6;
  const auth = useContext(AuthContext)

  const {
    data: userInterestsData,
    error: userInterestsError,
    isLoading: userInterestsLoading,
  } = api.user.getAllUserInterests.useQuery({ userId: auth?.user?.id ?? 1 });

  useEffect(() => {
    if (userInterestsData) {
      setUserInterests(userInterestsData.map(item => ({ id: item.userId, categoryId: item.categoryId, userId: item.userId })) ?? []);
    }
    if (userInterestsError) {
      console.error('Failed to fetch user interests', userInterestsError);
    }
  }, [userInterestsData, userInterestsError]);

  useEffect(() => {
    if (categories && userInterestsData) {
      const initialInterests = categories.map((category) => ({
        id: category.id,
        label: category.name,
        checked: userInterestsData.some(ui => ui.categoryId === category.id),
      }));
      setInterests(initialInterests);
    }

  }, [categories]);

  const modifyInterestMutation = api.user.modifyInterest.useMutation();

  const handleCheckboxChange = (index: number) => (isChecked: boolean) => {
    const userId =  auth?.user?.id ?? 1 ;
    const newInterests = interests.map((interest, i) => {
      if (i === index) {
        return { ...interest, checked: isChecked };
      }
      return interest;
    });
    setInterests(newInterests);

    setUserInterests((prev : any) => {
      if (isChecked) {
        return [...prev, interests[index]?.id];
      } else {
        return prev.filter((id : number) => id !== interests[index]?.id);
      }
    });

    modifyInterestMutation.mutate({
      userId,
      categoryId: interests[index]?.id ?? 0,
      add: isChecked,
    }, {
      onSuccess: (response : any) => {
        console.log('Interest modification successful', response);
      },
      onError: (error : any) => {
        console.error('Failed to modify interest', error);
      }
    });
  };

  console.log("USER INTERESTS : ", userInterests);

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
               onChange={handleCheckboxChange(index + indexOfFirstItem)}
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
