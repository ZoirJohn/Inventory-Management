import { useEffect, useState } from "react";

import { client } from "../client";

export default function useUser() {
  const [user, setUser] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    client
      .GET_ME()
      .then(setUser)
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, error };
}
