import getCurrentUser from "./actions/getCurrentUser"
import getListings, { IListingsParams } from "./actions/getListing"
import ClientOnly from "./component/ClientOnly"
import Container from "./component/Container"
import EmptyState from "./component/EmptyState"
import ListingCard from "./component/listing/ListingCard"



interface HomeProps {
 searchParams: IListingsParams
}

const Home = async ( {searchParams} : HomeProps) => {
    const listings = await getListings(searchParams)
    const currentUser = await getCurrentUser();

    if(listings.length === 0) {
      return (
        <ClientOnly>
          <EmptyState showReset />
        </ClientOnly>
      )
    }

  return (
    <ClientOnly>
      <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grids-cols-3 lg:grid-cols-4 xl:grid-cols5 2xl:grid-cols-6 gap-8">
          {listings.map((listing : any) => (
            <ListingCard 
            currentUser={currentUser}
            key={listing.id}
            data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default Home