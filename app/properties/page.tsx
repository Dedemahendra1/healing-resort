import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListing";
import ClientOnly from "../component/ClientOnly";
import EmptyState from "../component/EmptyState";
import PropertiesClient from "./PropertiesClient";



const propertiesPage = async () => {

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

    const listings= await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
      </ClientOnly>
    );
  }
    return (
        <ClientOnly>
        <PropertiesClient 
        currentUser={currentUser}
        listings={listings}
        />
      </ClientOnly>
    )

}

export default propertiesPage;