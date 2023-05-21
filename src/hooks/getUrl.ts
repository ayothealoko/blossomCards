import { useRouter } from "next/router";

function useUrl() {
  const router = useRouter();
  let url = router.asPath;
  return url;
}

export default useUrl;
