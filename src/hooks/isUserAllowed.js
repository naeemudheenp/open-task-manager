import { apiList, signInTypes } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";

const fetchUser = async (email, company) => {
  try {
    const response = await axios.get(
      `${apiList.checkUserIsAlreadyRegistered.api}?email=${email}`
    );

    if (response.data.signType === signInTypes.none && company) {
      signOut({ callbackUrl: "/" });
    }

    return response || "";
  } catch (error) {
    console.log("query error", error);
  }
};

export const useUser = () => {
  //We can also use push notification method if we dont want to poll server every time.
  //as there is not enough time i am  going with this method.
  //To check whther user is present or if not there then force logout
  const { data: session, status } = useSession();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", session?.user?.email],
    queryFn: () => fetchUser(session?.user?.email, session?.user?.company),
    onError: () => { },
    refetchInterval: 5000, // Poll the server every 5 seconds for user status
  });

  return { user, isLoading, error };
};
