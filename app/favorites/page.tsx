import getCurrentUser from "@/app/actions/getCurrentUser";
import getFavoriteListings from "@/app/actions/getFavoriteListings";
import ClientOnly from "../component/ClientOnly";
import EmptyState from "../component/EmptyState";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {

    const currentUser = await getCurrentUser();
    const listngs = await getFavoriteListings();

    if(listngs.length === 0) {
        return (
            <ClientOnly>
                <EmptyState 
                 title="No favorites found"
                 subtitle="Looks like you have no favorite listings."
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <FavoritesClient 
            listings={listngs}
            currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default ListingPage;