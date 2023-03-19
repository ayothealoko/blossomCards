import { useRouter } from "next/router";

function useGetDeckName() {
  const router = useRouter();
  let { deck } = router.query;
  if (Array.isArray(deck)) {
    deck = deck[0];
  }
  return deck;
}

export default useGetDeckName;
