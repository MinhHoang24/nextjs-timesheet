import { useEffect, useState } from "react";
import { getUserInfo } from "services/userServices/userService";
import { UserInfo } from "types/user";

export const useUser = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const data = await getUserInfo();
        if (isMounted) {
          setUser(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return { user, loading, error };
};