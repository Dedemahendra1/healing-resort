import getListingById from "@/app/actions/getListingById";

import ListingClient from "./ListingClient";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import ClientOnly from "@/app/component/ClientOnly";
import EmptyState from "@/app/component/EmptyState";


interface IParams {
    listingId?: string;
}

const ListingPage = async ({params}: {params: IParams}) => {

    const listing = await getListingById(params);
    const reservations = await getReservations(params);
    const currentUser = await getCurrentUser();

    if (!listing) {
        return(
            <ClientOnly>
                <EmptyState />
            </ClientOnly>
        )
    }

    return (
       <div>
        <ListingClient 
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
        />
       </div> 
    )
}

export default ListingPage;