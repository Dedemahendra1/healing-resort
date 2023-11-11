import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ClientOnly from "../component/ClientOnly";
import EmptyState from "../component/EmptyState";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return(
            <ClientOnly>
                <EmptyState 
                title= "Unauthorized"
                subtitle = "Please Login"
                />
            </ClientOnly>
        )
    }

    const reservations =  await getReservations({
        userId: currentUser.id
    });

    if(reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState 
                title="No Trips Found"
                subtitle="Looks like you haven't reserved any trips "
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <TripsClient 
            currentUser={currentUser}
            reservations={reservations}
            />
        </ClientOnly>
    )
}

export default TripsPage;