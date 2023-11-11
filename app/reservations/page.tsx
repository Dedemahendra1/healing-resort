import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ClientOnly from "../component/ClientOnly";
import EmptyState from "../component/EmptyState";
import ReservationsClient from "./ReservationsClient";


const reservationPage = async () => {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState 
                 title="Unauthorized"
                 subtitle="Please login"
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you have no reservations on your properties."
        />
      </ClientOnly>
    );
  }
    return (
        <ClientOnly>
        <ReservationsClient
          currentUser={currentUser}
          reservations={reservations}
        />
      </ClientOnly>
    )

}

export default reservationPage;