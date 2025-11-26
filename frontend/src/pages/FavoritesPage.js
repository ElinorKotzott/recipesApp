import {useEffect, useState} from "react";
import {request} from "../axiosHelper";
import Favorites from "../components/Favorites";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const token = sessionStorage.getItem("token");

  const fetchFavorites = async (page = 0) => {
    if (!token) return;
    try {
      const response = await request(
        "get",
        `/favorites?page=${page}&size=8`,
        null,
        true
      );
        setFavorites(response.data.recipeList);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching favs:", error);
    }
  };

  useEffect(() => {
    fetchFavorites(0);
  }, [token]);

  return (
    <>
      <Favorites
        favorites={favorites}
        setFavorites={setFavorites}
        fetchFavorites={fetchFavorites}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
}

export default FavoritesPage;
