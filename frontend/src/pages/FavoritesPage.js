function FavoritesPage() {

    useEffect(() => {
            const fetchFavorites = async () => {
                if (!token) return;
                try {
                    const response = await request('get', '/favorites', null, true);
                    const response = await request('get', '/favorites', null, true);
                    const favorites = response.data;
                    setFavorites(favorites);

                } catch (error) {
                    console.error('Error fetching profile:', error);
                }
            };

            fetchProfile();
        }, [token, location.state]);




    return(
        <div id="favs-container-id">
                <p>Favs will be shown here</p>
                <p>lalala</p>
        </div>
    );
}

export default FavoritesPage;