import React, { useState } from "react";
import HeroSection from "../Auth/HeroSection";
import { useQuery } from "@tanstack/react-query";
import axiospublic from "../Hooks/Axiospublic";

const Herolayout = () => {
  const [search, setsearch] = useState("");

  const { data: contestsearch = [], isLoading } = useQuery({
    queryKey: ["search-contest", search],
    enabled: !!search,
    queryFn: async () => {
      const res = await axiospublic.get(
        `/allsearch-contests?search=${search}`
      );
      return res.data;
    },
  });

  return (
    <div>
      <HeroSection
        search={search}
        setsearch={setsearch}
        results={contestsearch}
        isLoading={isLoading}
      />

      
      
    </div>
  );
};

export default Herolayout;
