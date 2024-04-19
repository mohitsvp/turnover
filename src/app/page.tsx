"use client";

import React, { useContext, useEffect, useState } from "react";
import Card from "./_components/Card";
import CheckboxList from "./_components/CheckboxList";
import { api } from "@/trpc/react";
import Pagination from "./_components/Pagination";
import { AuthContext } from "./_context/AuthContext";
import { useRouter } from "next/navigation";
import Spinner from "./_ui/Spinner";

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
  const { data: categories } = api.category.getAll.useQuery();
  const [interests, setInterests] = useState<Interest[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userInterests, setUserInterests] = useState<userInterest[]>([]);
  const itemsPerPage = 6;
  const authContext = useContext(AuthContext);
  const { user, isLoading } = authContext ?? { user: undefined, isLoading: undefined };
  const userId : number | undefined = user?.id;
  const router = useRouter();

  const {
    data: userInterestsData,
    error: userInterestsError,
    isLoading: userInterestsLoading,
  } = api.user.getAllUserInterests.useQuery({ userId: user?.id ?? 1 });

  useEffect(() => {
    if (userInterestsData) {
      setUserInterests(userInterestsData.map(item => ({ id: item.userId, categoryId: item.categoryId, userId: item.userId })) ?? []);
    }
    if (userInterestsError) {
      console.error('Failed to fetch user interests', userInterestsError);
    }
  }, [userInterestsData, userInterestsError, user]);

  useEffect(() => {
    if (categories && userInterestsData) {
      const initialInterests = categories.map((category) => ({
        id: category.id,
        label: category.name,
        checked: userInterestsData.some(ui => ui.categoryId === category.id),
      }));
      setInterests(initialInterests);
    }

  }, [categories, user]);


  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  const modifyInterestMutation = api.user.modifyInterest.useMutation();

  const handleCheckboxChange = (index: number) => (isChecked: boolean) => {
    const userId =  user?.id ?? 1 ;
    const newInterests = interests.map((interest, i) => {
      if (i === index) {
        return { ...interest, checked: isChecked };
      }
      return interest;
    });
    setInterests(newInterests);

    modifyInterestMutation.mutate({
      userId,
      categoryId: interests[index]?.id ?? 0,
      add: isChecked,
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = interests.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading || userInterestsLoading) {
    return <div><Spinner/></div>;
  }

  if (userInterestsError) {
    return <div>Error: {userInterestsError.message}</div>;
  }

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